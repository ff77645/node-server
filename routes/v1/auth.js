import { Router } from 'express'
import * as ctl from '../../controller/auth.js'

const router = new Router()


// router.post('/register',ctl.register)
// router.post('/reset-password',ctl.resetPassword)
// router.post('/send-verification-email',ctl.sendVerificationEmail)
// router.post('/logout',ctl.logout)
// router.post('/refresh-token',ctl.refreshToken)
router.post('/login',ctl.login)
router.post('/update-user',ctl.updateUserData)
router.get('/user/token',ctl.getUserDataForToken)
router.get('/user/id',ctl.getUserDataForId)



export default router