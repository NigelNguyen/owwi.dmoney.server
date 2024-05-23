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
