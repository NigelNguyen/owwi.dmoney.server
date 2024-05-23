import Partner from '../models/Partner'

export const createPartnerRepository = async (data: { user: string; name: string; description: string }) => {
  const partner = await new Partner(data)
  return await partner.save()
}

export const getPartnerByIdRepository = async ({ id, user }: { id: string; user: string }) => {
  const partner = await Partner.findOne({ _id: id, user })
  return partner
}

export const getPartnerByUserRepository = async ({ user }: { user: string }) => {
  const partners = await Partner.find({ user })
  return partners
}

export const updatePartnerRepository = async (data: { id: string; name: string; description: string }) => {
  const { id, ...left } = data
  const partner = await Partner.findOneAndUpdate({ _id: id }, left)
  return partner
}

export const deletePartnerByIdRepository = async ({ id }: { id: string }) => {
  const partner = await Partner.findOneAndDelete({ _id: id })
  return partner
}
