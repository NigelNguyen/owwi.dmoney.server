import express from 'express'
import { loginController, logoutController,registerController } from '../controllers/auth'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.post('/login', loginController)

router.post('/logout',isAuthenticated, logoutController)

router.post('/register', registerController)

export default router
