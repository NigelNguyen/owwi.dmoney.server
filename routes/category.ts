import express from 'express'
import {
  createCategoryController,
  getCategoriesByUserController,
  getCategoryByIdController,
  updateCategoryController
} from '../controllers/category'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.use(isAuthenticated)

router.post('/category', createCategoryController)

router.get('/category/:id', getCategoryByIdController)

router.get('/categories', getCategoriesByUserController)

router.put('/category', updateCategoryController)

export default router
