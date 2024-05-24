import { Request, Response } from 'express'

export const tryCatch = (callback: Function, signature?: string) => async (req?: Request, res?: Response) => {
  try {
    await callback(req, res)
  } catch (error) {
    console.error({ signature, error })
    // return res?.status(500).send({ message: 'Internet Server Error' })
  }
}
