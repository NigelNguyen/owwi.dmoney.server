import { Request, Response } from 'express'
import { registerService, loginService } from '../services/auth'
import { tryCatch } from '../utils/try'

export const loginController = async (req: Request, res: Response) => {
  return await tryCatch(loginService)(req, res)
}

export const logoutController = async (req: Request, res: Response) => {
  return res.send('login')
}

export const registerController = async (req: Request, res: Response) => {
  return await tryCatch(registerService)(req, res)
}
