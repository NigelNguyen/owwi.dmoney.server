import { TType } from './../models/Type'
import { getTypesRepository } from './../repositories/type'
import { Request, Response } from 'express'
import { tryCatch } from './../utils/try'
import { createTypeRepository } from '../repositories/type'

export const initTypes = async (req: Request, res: Response) => {
  tryCatch(async () => {
    const typeList = [
      { name: 'Income', description: 'Your money you have earned' },
      { name: 'Outcome', description: 'Your money you have spent' },
      { name: 'Borrow', description: 'Your money you have borrowed' },
      { name: 'Loan', description: 'Your money you have lent' },
      { name: 'Saving', description: 'Your money you have saved' }
    ]
    await Promise.all(
      typeList.map(async ({ description, name }) => {
        await createTypeRepository({ name, description })
      })
    )

    return res.send({ message: 'Initialized Basic Types Successfully.' })
  })(req, res)
}

export const getTypesService = async (req: Request, res: Response) => {
  tryCatch(async () => {
    const types = await getTypesRepository()

    return res.send({
      message: 'Get Types Successfully.',
      content: { types: types.map((item: TType) => ({ id: item._id, name: item.name, description: item.description })) }
    })
  })(req, res)
}
