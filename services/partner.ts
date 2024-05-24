import { Request, Response } from 'express'
import { tryCatch } from '../utils/try'
import {
  createPartnerRepository,
  getPartnerByIdRepository,
  getPartnerByUserRepository,
  updatePartnerRepository
} from '../repositories/Partner'
import { IPlainObject } from '../types/common'
import { TPartner } from '../models/Partner'

export const createPartnerService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { name, description } = req.body
    await createPartnerRepository({ description, name, user: (req.session as IPlainObject).user._id })
    return res.status(201).send({ message: 'Create Partner Successfully.' })
  })(req, res)
}

export const updatePartnerService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { id, name, description } = req.body
    const partner = await getPartnerByIdRepository({ id, user: (req.session as IPlainObject).user._id })
    if (partner) {
      await updatePartnerRepository({ id, description, name })
      return res.send({ message: 'Update Partner Successfully.' })
    } else {
      return res.status(401).send({ message: 'Access Denied!' })
    }
  })(req, res)
}

export const getPartnerByIdService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { id } = req.params
    const partner = await getPartnerByIdRepository({
      id,
      user: (req.session as IPlainObject).user._id
    })
    return res.send({ message: 'Get Partner Successfully.', content: { partner } })
  })(req, res)
}

export const getPartnerByUserService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const partners = await getPartnerByUserRepository({
      user: (req.session as IPlainObject).user._id
    })
    return res.send({
      message: 'Get Partners Successfully.',
      content: {
        partners: partners?.map((item: TPartner) => ({ id: item._id, name: item.name, description: item.description })) || []
      }
    })
  })(req, res)
}
