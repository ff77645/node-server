import {Router} from 'express'
import * as ctl from '../../controller/room.js'

const router = new Router()


router.post('/create',ctl.createRoom)
router.post('/join',ctl.joinRoom)
// router.post('/leave-room',ctl.leaveRoom)

export default router