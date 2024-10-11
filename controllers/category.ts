import { Request, Response } from 'express'
import { tryCatch } from '../utils/try'
import {
  createCategoryService,
  getCategoryByIdService,
  getCategoryByUserService,
  updateCategoryService,
  deleteCategoryService
} from '../services/category'

export const createCategoryController = async (req: Request, res: Response) => {
  return await tryCatch(createCategoryService)(req, res)
}

export const updateCategoryController = async (req: Request, res: Response) => {
  return await tryCatch(updateCategoryService)(req, res)
}

export const getCategoryByIdController = async (req: Request, res: Response) => {
  return await tryCatch(getCategoryByIdService)(req, res)
}

export const getCategoriesByUserController = async (req: Request, res: Response) => {
  return await tryCatch(getCategoryByUserService)(req, res)
}

export const deleteCategoryController = async (req: Request, res: Response) => {
  return await tryCatch(deleteCategoryService)(req, res)
}
