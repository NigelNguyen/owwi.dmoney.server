import express from 'express'
import {
  createPartnerController,
  getPartnerByIdController,
  getPartnersByUserController,
  updatePartnerController
} from '../controllers/partner'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.use(isAuthenticated)

router.post('/partner', createPartnerController)

router.get('/partner/:id', getPartnerByIdController)

router.get('/partners', getPartnersByUserController)

router.put('/partner', updatePartnerController)

export default router
