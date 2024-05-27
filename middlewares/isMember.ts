import { NextFunction, Request, Response } from 'express'
import { IPlainObject } from '../types/common'

const isMember = (req: Request, res: Response, next: NextFunction) => {
  if ((req.session as IPlainObject)?.user?.role === 'member'){
    return next()
  }
  return res.status(401).send({message: "Access Denied!"})
}

export default isMember;
