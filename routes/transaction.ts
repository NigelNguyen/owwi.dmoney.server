import express from 'express'
import { createTransactionController } from '../controllers/transaction'

const router = express.Router()

router.post('/transaction', createTransactionController)

export default router
