import express from 'express'
import { createRecordController, getRecordsByIdController, getRecordsByUserController, updateRecordController } from '../controllers/record'

const router = express.Router()

router.post('/record', createRecordController)

router.get('/records', getRecordsByUserController)

router.get('/record/:id', getRecordsByIdController)

router.put('/record', updateRecordController)

export default router
