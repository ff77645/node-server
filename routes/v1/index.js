import { Router } from 'express'
import authRoutes from './auth.js'
import roomRoutes from './room.js'
import translateRoutes from './translate.js'

const router = new Router()

router.use('/auth',authRoutes)
router.use('/room',roomRoutes)
router.use('/translate',translateRoutes)

export default router