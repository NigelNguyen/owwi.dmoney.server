import express from 'express'
import {
  createPartnerController,
  getPartnerByIdController,
  getPartnersByUserController,
  updatePartnerController,
  deletePartnerController
} from '../controllers/partner'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.post('/partner', isAuthenticated, createPartnerController)

router.get('/partner/:id', isAuthenticated, getPartnerByIdController)

router.get('/partners', isAuthenticated, getPartnersByUserController)

router.post('/partner/:id/update', isAuthenticated, updatePartnerController)

router.post('/partner/:id/delete', isAuthenticated, deletePartnerController)

export default router
