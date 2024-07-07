import { Request, Response } from 'express'
import {
  createRecordService,
  deleteRecordByIdService,
  getRecordByIdService,
  getRecordsByUserService,
  updateRecordService
} from '../services/record'
import { tryCatch } from '../utils/try'

export const createRecordController = async (req: Request, res: Response) => {
  return await tryCatch(createRecordService)(req, res)
}

export const deleteRecordController = async (req: Request, res: Response) => {
  return await tryCatch(deleteRecordByIdService)(req, res)
}

export const getRecordsByUserController = async (req: Request, res: Response) => {
  return await tryCatch(getRecordsByUserService)(req, res)
}

export const getRecordsByIdController = async (req: Request, res: Response) => {
  return await tryCatch(getRecordByIdService)(req, res)
}

export const updateRecordController = async (req: Request, res: Response) => {
  return await tryCatch(updateRecordService)(req, res)
}
