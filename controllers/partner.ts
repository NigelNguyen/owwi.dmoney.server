import { Request, Response } from 'express'
import { tryCatch } from '../utils/try'
import { createPartnerService, getPartnerByIdService, getPartnerByUserService, updatePartnerService } from '../services/partner'

export const createPartnerController = async (req: Request, res: Response) => {
  return await tryCatch(createPartnerService)(req, res)
}

export const updatePartnerController = async (req: Request, res: Response) => {
  return await tryCatch(updatePartnerService)(req, res)
}

export const getPartnerByIdController = async (req: Request, res: Response) => {
  return await tryCatch(getPartnerByIdService)(req, res)
}

export const getPartnersByUserController = async (req: Request, res: Response) => {
  return await tryCatch(getPartnerByUserService)(req, res)
}
