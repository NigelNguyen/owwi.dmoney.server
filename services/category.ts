import { Request, Response } from 'express'
import { tryCatch } from '../utils/try'
import {
  createCategoryRepository,
  getCategoryByIdRepository,
  getCategoryByUserRepository,
  updateCategoryRepository
} from '../repositories/Category'
import { IPlainObject } from '../types/common'
import { TCategory } from '../models/Category'

export const createCategoryService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { name, description } = req.body
    await createCategoryRepository({ description, name, user: (req.session as IPlainObject).user._id })
    return res.status(201).send({ message: 'Create Category Successfully.' })
  })(req, res)
}

export const updateCategoryService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { id, name, description } = req.body
    const category = await getCategoryByIdRepository({ id, user: (req.session as IPlainObject).user._id })
    if (category) {
      await updateCategoryRepository({ id, description, name })
      return res.send({ message: 'Update Category Successfully.' })
    } else {
      return res.status(401).send({ message: 'Access Denied!' })
    }
  })(req, res)
}

export const getCategoryByIdService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const { id } = req.params
    const category = await getCategoryByIdRepository({
      id,
      user: (req.session as IPlainObject).user._id
    })
    return res.send({ message: 'Get Category Successfully.', content: { category } })
  })(req, res)
}

export const getCategoryByUserService = (req: Request, res: Response) => {
  tryCatch(async () => {
    const categories = await getCategoryByUserRepository({
      user: (req.session as IPlainObject).user._id
    })
    return res.send({
      message: 'Get Categories Successfully.',
      content: {
        categories: categories?.map((item: TCategory) => ({ id: item._id, name: item.name, description: item.description })) || []
      }
    })
  })(req, res)
}
