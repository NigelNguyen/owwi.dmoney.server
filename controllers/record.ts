import { Request, Response } from 'express'
import { createRecordService, getRecordsByUserService } from '../services/record'
import { tryCatch } from '../utils/try'
import { initTypes } from '../services/type'

export const createRecordController = async (req: Request, res: Response) => {
  return await tryCatch(createRecordService)(req, res)
}

export const getRecordsByUserController = async (req: Request, res: Response) => {
  return await tryCatch(getRecordsByUserService)(req, res)
}
