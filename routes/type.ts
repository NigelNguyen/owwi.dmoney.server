import express from 'express'
import { getTypesController } from '../controllers/type'

const router = express.Router()

router.get('/types', getTypesController)

export default router
