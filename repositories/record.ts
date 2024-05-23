import Record from '../models/Record'

export const createRecordRepository = async (data: {
  amount: number
  category: string
  partner: string
  type: string
  description: string
  user: string
}) => {
  const record = await new Record(data)
  return await record.save()
}

export const getRecordByUserRepository = async ({ userId }: { userId: string }) => {
  const record = await Record.find({ user: userId }).populate(['partner', 'category', 'type'])
  return record
}

export const getRecordByIdRepository = async ({ id, user }: { id: string; user: string }) => {
  const record = await Record.findOne({ _id: id, user })
  return record
}

export const updateRecordRepository = async (data: {
  id: string
  amount: number
  category: string
  partner: string
  type: string
  description: string
}) => {
  const { id, ...left } = data
  const record = await Record.findOneAndUpdate({ _id: id }, left)
  return record
}

export const deleteRecordByIdRepository = async ({ id }: { id: string }) => {
  const record = await Record.findOneAndDelete({ _id: id })
  return record
}
