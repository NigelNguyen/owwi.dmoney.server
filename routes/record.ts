import express from 'express'
import {
  createRecordController,
  deleteRecordController,
  getRecordsByIdController,
  getRecordsByUserController,
  updateRecordController
} from '../controllers/record'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.post('/record', isAuthenticated, createRecordController)

router.get('/records', isAuthenticated, getRecordsByUserController)

router.get('/record/:id', isAuthenticated, getRecordsByIdController)

router.post('/record/:id/update', isAuthenticated, updateRecordController)

router.post('/record/:id/delete', isAuthenticated, deleteRecordController)

export default router
