import User from '../models/User'
import { IPlainObject } from '../types/common'

export const updateUserRepository = async ({
  metaMaskAddress,
  data
}: {
  metaMaskAddress: string
  data: IPlainObject
}) => {
  return await User.findOneAndUpdate({ metaMaskAddress }, data, {
    new: true
  })
}

export const updateUserByIdRepository = async ({ id, data }: { id: string; data: IPlainObject }) => {
  return await User.findOneAndUpdate({ _id: id }, data, {
    new: true
  })
}
