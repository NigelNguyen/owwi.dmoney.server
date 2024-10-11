import express from 'express'
import { getTypesController } from '../controllers/type'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.get('/types', isAuthenticated, getTypesController)

export default router
