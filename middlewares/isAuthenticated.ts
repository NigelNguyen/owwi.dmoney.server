
import { NextFunction, Request, Response } from 'express'
import { IPlainObject } from '../types/common'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const role = (req.session as IPlainObject)?.user?.role
  if ( role === 'user' || role === 'member'){
    return next()
  }
  return res.status(401).send({message: "Access Denied!"})
}

export default isAuthenticated;
