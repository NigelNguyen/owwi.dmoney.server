import { createTransactionRepository } from '../repositories/transaction'
import { updateUserByIdRepository, updateUserRepository } from '../repositories/user'
import { IPlainObject } from '../types/common'
import { Request, Response } from 'express'

export const createTransactionService = async (req: Request, res: Response) => {
  const { transaction, metaMaskAddress } = req.body
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

    await updateUserByIdRepository({
      id: session.user._id,
      data: {
        role: 'member',
        metaMaskAddress
      }
    })
    return
  } else {
    return res.status(400).send({ message: 'Create transaction failed.' })
  }
}
