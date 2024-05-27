import express from 'express'
import { createTransactionController } from '../controllers/transaction'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.use(isAuthenticated)

router.post('/transaction', createTransactionController)

export default router
