import express from 'express'
import { createRecordController, getRecordsByUserController } from '../controllers/record'

const router = express.Router()

router.post('/record', createRecordController)

router.get('/records', getRecordsByUserController)

export default router
