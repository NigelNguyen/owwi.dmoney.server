import express from 'express'
import {
  createCategoryController,
  getCategoriesByUserController,
  getCategoryByIdController,
  updateCategoryController
} from '../controllers/category'

const router = express.Router()

router.post('/category', createCategoryController)

router.get('/category/:id', getCategoryByIdController)

router.get('/categories', getCategoriesByUserController)

router.put('/category', updateCategoryController)

export default router
