import User from '../models/User'

export const findAccount = async ({ email, metaMaskAddress }: { email?: string; metaMaskAddress?: string }) => {
  const user = await User.findOne({
    ...(email ? { email } : {}),
    ...(metaMaskAddress ? { metaMaskAddress } : {})
  })
  return user
}

export const registerNormalAccount = async ({ email, password }: { email: string; password: string }) => {
  const user = await new User({
    email,
    password,
    role: 'user',
    isConfirmedEmail: false
  })
  return await user.save()
}

export const registerMetaMaskAccount = async ({ metaMaskAddress }: { metaMaskAddress: string }) => {
  const user = await new User({
    metaMaskAddress,
    role: 'user',
    isConfirmedEmail: false
  })
  return await user.save()
}
