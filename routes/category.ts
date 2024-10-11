import express from 'express'
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesByUserController,
  getCategoryByIdController,
  updateCategoryController
} from '../controllers/category'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.post('/category', isAuthenticated, createCategoryController)

router.get('/category/:id', isAuthenticated, getCategoryByIdController)

router.get('/categories', isAuthenticated, getCategoriesByUserController)

router.post('/category/:id/update', isAuthenticated, updateCategoryController)

router.post('/category/:id/delete', isAuthenticated, deleteCategoryController)

export default router
