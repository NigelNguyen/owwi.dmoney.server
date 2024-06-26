import { Request, Response } from 'express'
import { createTransactionService } from '../services/transaction'

export const createTransactionController = async (req: Request, res: Response) => {
  return await createTransactionService(req, res)
}
