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
    const {
      amount = '',
      category = '',
      description = '',
      partner = '',
      type = '',
      date = '',
      partnerName = '',
      categoryName = '',
      typeName = ''
    } = req.body
    const user = (req.session as IPlainObject).user._id

    await createRecordRepository({
      amount,
      category,
      description,
      partner,
      type,
      date,
      user,
      partnerName,
      categoryName,
      typeName
    })

    return res.status(201).send({ message: 'Create Record Successfully.' })
  })(req, res)
}

export const updateRecordService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const {
      id = '',
      amount = '',
      category = '',
      description = '',
      partner = '',
      type = '',
      date = '',
      partnerName = '',
      categoryName = '',
      typeName = ''
    } = req.body
    await updateRecordRepository({
      id,
      amount,
      category,
      description,
      partner,
      type,
      date,
      partnerName,
      categoryName,
      typeName
    })
    return res.send({ message: 'Update Record Successfully.' })
  })(req, res)
}

export const getRecordByIdService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { id = '' } = req.params
    const record = await getRecordByIdRepository({
      id,
      user: (req.session as IPlainObject).user._id
    })
    return res.send({ message: 'Get Record Successfully.', content: { record } })
  })(req, res)
}

export const getRecordsByUserService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const user = (req.session as IPlainObject).user._id
    const query = req.query
    const records = await getRecordByUserRepository({
      userId: user,
      ...query
    })

    const formattedRecord = records.records?.map((item: TRecord) => ({
      id: item._id,
      amount: item.amount,
      type: item.typeName || '',
      date: item.date.toISOString().split('T')[0].split('-').reverse().join('-'),
      partner: item.partnerName || '',
      category: item.categoryName || '',
      description: item.description
    }))

    return res.send({
      message: 'Get Records Successfully.',
      content: {
        records: formattedRecord
      },
      pagination: {
        total: Math.ceil(records.pagination.total / records.pagination.pageSize),
        page: Number(records.pagination.page),
        pageSize: Number(records.pagination.pageSize)
      }
    })
  }, 'getRecordsByUserService')(req, res)
}
