import express from 'express'
import { getTypesController } from '../controllers/type'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.use(isAuthenticated)

router.get('/types', getTypesController)

export default router
