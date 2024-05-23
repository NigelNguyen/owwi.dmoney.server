import { Request, Response } from 'express'
import { getTypesService } from '../services/type'

export const getTypesController = async (req: Request, res: Response) => {
  return await getTypesService(req, res)
}