import User from '../models/User'
import { findAccount } from '../repositories/auth'
import { createTransactionRepository } from '../repositories/transaction'
import { updateUserRepository } from '../repositories/user'
import { IPlainObject } from '../types/common'
import { tryCatch } from './../utils/try'
import { Request, Response } from 'express'

export const createTransactionService = async (req: Request, res: Response) => {
  const { transaction } = req.body
  const session = req.session as IPlainObject
  const newTransaction = await createTransactionRepository({
    transaction: transaction,
    user: session.user._id
  })
  if (newTransaction) {
    res.send({
      message: 'Create transaction successfully.',
      content: {
        role: 'member'
      }
    })

     await updateUserRepository({
      metaMaskAddress: session.user.metaMaskAddress,
      data: {
        role: 'member'
      }
    })
    return
  } else {
    return res.status(400).send({ message: 'Create transaction failed.' })
  }
}
