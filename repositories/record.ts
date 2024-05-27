import Record from '../models/Record'

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

export const getRecordByUserRepository = async ({ userId }: { userId: string }) => {
  return await Record.find({ user: userId }).sort({ date: -1 }) //.skip(0).limit(15)
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

export const deleteRecordByIdRepository = async ({ id }: { id: string }) => {
  const record = await Record.findOneAndDelete({ _id: id })
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
