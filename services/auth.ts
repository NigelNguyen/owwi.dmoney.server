import { tryCatch } from './../utils/try'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { registerMetaMaskAccount, registerNormalAccount, findAccount } from '../repositories/auth'
import { IPlainObject } from '../types/common'
import { checkValidSignature } from '../utils/checkValidSignature'

const SALT = Number(process.env.SALT) || 12

export const registerService = async (req: Request, res: Response) => {
  return tryCatch(async () => {
    const { email = '', password = '', metaMaskAddress = '', signature = '', signatureMessage = '' } = req.body
    console.log({ email, password, metaMaskAddress, signature, signatureMessage })
    if (!metaMaskAddress) {
      const isExistAccount = await findAccount({ email })
      if (isExistAccount) {
        return res.status(400).send({ message: 'Email is already register' })
      }

      const hashedPassword = await bcrypt.hash(password, SALT)
      await registerNormalAccount({ email, password: hashedPassword })
    } else {
      const existAccount = await findAccount({ metaMaskAddress })
      console.log({ existAccount })
      if (existAccount) {
        return res.status(409).send({ message: 'MetaMask Address is already register' })
      } else {
        const isValid = checkValidSignature(signatureMessage, signature, metaMaskAddress)
        if (!isValid) return res.status(422).send({ message: 'Invalid Signature' })

        const hashedSignature = await bcrypt.hash(signature, SALT)
        await registerMetaMaskAccount({ metaMaskAddress, signature: hashedSignature })
      }
    }
    return res.status(201).send({ message: 'Register Successfully' })
  }, 'registerService')()
}

export const loginService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { email = '', password = '', metaMaskAddress = '', signature = '' } = req.body
    const session = req.session as IPlainObject

    if (!metaMaskAddress) {
      const existAccount = await findAccount({ email })
      if (!existAccount) {
        return res.status(400).send({ message: 'Email is not registered.' })
      }

      const isMatched = await bcrypt.compare(password, existAccount.password)
      if (!isMatched) {
        return res.status(401).send({ message: 'Password is incorrect.' })
      }
      session.sessionID = req.sessionID
      session.user = existAccount

      return res.status(200).send({
        message: 'Login Successfully',
        content: {
          email: existAccount.email,
          metaMaskAddress: existAccount.metaMaskAddress,
          isConfirmedEmail: existAccount.isConfirmedEmail,
          role: existAccount.role,
          sessionToken: req.sessionID
        }
      })
    } else {
      const existAccount = await findAccount({ metaMaskAddress })
      if (existAccount) {
        const isMatchedSignature = await bcrypt.compare(signature, existAccount.signature)

        if (isMatchedSignature) {
          session.sessionID = req.sessionID
          session.user = existAccount
          return res.status(200).send({
            message: 'Login Successfully!',
            content: {
              email: existAccount.email,
              metaMaskAddress: existAccount.metaMaskAddress,
              isConfirmedEmail: existAccount.isConfirmedEmail,
              role: existAccount.role,
              sessionToken: req.sessionID
            }
          })
        } else {
          return res.status(401).send({
            message: 'Login Failed! Signature did not match!'
          })
        }
      } else {
        const hashedSignature = await bcrypt.hash(signature, SALT)
        const newUser = await registerMetaMaskAccount({ metaMaskAddress, signature: hashedSignature })
        session.sessionID = req.sessionID
        session.user = newUser
        return res.status(200).send({
          message: 'Login Successfully',
          content: {
            email: newUser.email,
            metaMaskAddress: newUser.metaMaskAddress,
            isConfirmedEmail: newUser.isConfirmedEmail,
            role: newUser.role,
            sessionToken: req.sessionID
          }
        })
      }
    }
  })()
}

export const logoutService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(403).send({ message: 'Failed to logout!' })
        } else {
          return res.send({ message: 'Logout Successfully!' })
        }
      })
    }
  })()
}
