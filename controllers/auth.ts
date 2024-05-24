import { Request, Response } from 'express'
import { registerService, loginService, logoutService } from '../services/auth'
import { tryCatch } from '../utils/try'

export const loginController = async (req: Request, res: Response) => {
  return await tryCatch(loginService)(req, res)
}

export const logoutController = async (req: Request, res: Response) => {
  return await tryCatch(logoutService)(req, res)
}

export const registerController = async (req: Request, res: Response) => {
  return await tryCatch(registerService)(req, res)
}
