import Record from '../models/Record'
import { IPlainObject } from '../types/common'

export const createRecordRepository = async (data: {
  amount: number
  category: string
  partner: string
  type: string
  date: string
  description: string
  user: string
  partnerName: string
  categoryName: string
  typeName: string
}) => {
  const record = await new Record(data)
  return await record.save()
}

export const getRecordByUserRepository = async ({
  userId,
  min = 0,
  max,
  page = 1,
  from,
  to = new Date(),
  pageSize = 10,
  description = '',
  ...query
}: {
  userId: string
  partner?: string
  category?: string
  description?: string
  type?: string
  min?: number
  max?: number
  from?: Date
  to?: Date
  page?: number
  pageSize?: number
}) => {
  const queryCondition: IPlainObject = {
    user: userId,
    ...query
  }
  if (from) {
    queryCondition.date = {
      $gte: from,
      $lte: to
    }
  }

  queryCondition.amount = {
    $gte: min || 0
  }
  if (max) {
    queryCondition.amount.$lte = max
  }

  queryCondition.description = {
    $regex: description,
    $options: 'i' // Case-insensitive search
  }

  const records = await Record.find(queryCondition)
    .sort({ date: -1 })
    .skip((page - 1) * Number(pageSize))
    .limit(Number(pageSize))

  const total = await Record.countDocuments(queryCondition)

  return {
    records,
    pagination: {
      total,
      page,
      pageSize
    }
  }
}

export const getRecordByIdRepository = async ({ id, user }: { id: string; user: string }) => {
  const record = await Record.findOne({ _id: id, user })
  return record
}

export const updateRecordRepository = async (data: {
  id: string
  amount?: number
  category?: string
  partner?: string
  type?: string
  date: string
  description?: string
  partnerName?: string
  categoryName?: string
  typeName?: string
}) => {
  const { id, ...left } = data
  const record = await Record.findOneAndUpdate({ _id: id }, left)
  return record
}

export const deleteRecordByIdRepository = async ({ id, user }: { id: string; user: string }) => {
  const record = await Record.findOneAndDelete({ _id: id, user })
  return record
}

export const updateRecordByPartner = async (data: { user: string; oldPartnerName: string; newPartnerName: string }) => {
  const { oldPartnerName, newPartnerName, user } = data
  const records = await Record.updateMany({ user, partnerName: oldPartnerName }, { partnerName: newPartnerName })
  return records
}

export const updateRecordByCategory = async (data: {
  user: string
  oldCategoryName: string
  newCategoryName: string
}) => {
  const { oldCategoryName, newCategoryName, user } = data
  const records = await Record.updateMany({ user, categoryName: oldCategoryName }, { categoryName: newCategoryName })
  return records
}
