import {
  createCategoryRepository,
  deleteCategoryByIdRepository,
  getCategoryByIdRepository,
  getCategoryByUserRepository,
  updateCategoryRepository
} from './../repositories/category'
import { Request, Response } from 'express'
import { tryCatch } from '../utils/try'

import { IPlainObject } from '../types/common'
import { TCategory } from '../models/Category'
import { updateRecordByCategory } from '../repositories/record'

export const createCategoryService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { name = '', description = '' } = req.body
    await createCategoryRepository({ description, name, user: (req.session as IPlainObject).user._id })
    return res.status(201).send({ message: 'Create Category Successfully.' })
  },"createCategoryService")(req, res)
}

export const updateCategoryService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { id = '' } = req.params
    const { name = '', description = '' } = req.body
    const user = (req.session as IPlainObject).user._id
    const category = await getCategoryByIdRepository({ id, user })
    const oldName = category.name
    if (category) {
      res.send({ message: 'Update Category Successfully.' })
    } else {
      return res.status(401).send({ message: 'Access Denied!' })
    }
    await updateCategoryRepository({ id, description, name })
    await updateRecordByCategory({ newCategoryName: name, oldCategoryName: oldName, user })
    return
  },"updateCategoryService")(req, res)
}

export const getCategoryByIdService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { id = '' } = req.params
    const category = await getCategoryByIdRepository({
      id,
      user: (req.session as IPlainObject).user._id
    })
    return res.send({ message: 'Get Category Successfully.', content: { category } })
  },"getCategoryByIdService")(req, res)
}

export const deleteCategoryService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const { id = '' } = req.params
    await deleteCategoryByIdRepository({
      id,
      user: (req.session as IPlainObject).user._id
    })
    return res.send({ message: 'Delete Category Successfully.' })
  },"deleteCategoryService")(req, res)
}

export const getCategoryByUserService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const categories = await getCategoryByUserRepository({
      user: (req.session as IPlainObject).user._id
    })
    return res.send({
      message: 'Get Categories Successfully.',
      content: {
        categories:
          categories?.map((item: TCategory) => ({ id: item._id, name: item.name, description: item.description })) || []
      }
    })
  },"getCategoryByUserService")(req, res)
}
