import { Request, Response } from 'express'
import { tryCatch } from '../utils/try'
import {
  createRecordRepository,
  getRecordByIdRepository,
  getRecordByUserRepository,
  updateRecordRepository
} from '../repositories/record'
import { IPlainObject } from '../types/common'
import { TRecord } from '../models/Record'

export const createRecordService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { amount, category, description, partner, type } = req.body
    await createRecordRepository({
      amount,
      category,
      description,
      partner,
      type,
      user: (req.session as IPlainObject).user._id
    })
    return res.status(201).send({ message: 'Create Record Successfully.' })
  })(req, res)
}

export const updateRecordService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { id, amount, category, description, partner, type } = req.body
    const record = await getRecordByIdRepository({ id, user: (req.session as IPlainObject).user._id })
    if (record) {
      await updateRecordRepository({
        id,
        amount,
        category,
        description,
        partner,
        type
      })
      return res.send({ message: 'Update Record Successfully.' })
    } else {
      return res.status(401).send({ message: 'Access Denied!' })
    }
  })(req, res)
}

export const getRecordByIdService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { id } = req.params
    const record = await getRecordByIdRepository({
      id,
      user: (req.session as IPlainObject).user._id
    })
    return res.send({ message: 'Get Record Successfully.', content: { record } })
  })(req, res)
}

export const getRecordsByUserService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const records = await getRecordByUserRepository({
      userId: (req.session as IPlainObject).user._id
    })

    return res.send({
      message: 'Get Records Successfully.',
      content: {
        records: records?.map((item: TRecord) => ({
          id: item._id,
          amount: item.amount,
          type: item.type.name,
          partner: item.partner.name,
          category: item.category.name,
          description: item.description
        }))
      }
    })
  })(req, res)
}
