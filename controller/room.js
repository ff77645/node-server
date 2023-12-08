import catchAsync from '../utils/catchAsync.js'
import redis from '../redis.js'
import {v4 as uuid} from 'uuid'
// import pool from '../mysql/index.js'
import {Ok,Err} from '../helper/result.js'


// 创建房间
export const createRoom = catchAsync(async (req,res)=>{
    const {
        roomName,
    } = req.body
    const roomId = uuid()
    const roomNum = `${(await redis.hLen('rooms')) + 1}`.padStart(3,0)
    const room = {
        roomName,
        roomId,
        roomNum,
    }

    redis.hSet('rooms',roomNum,JSON.stringify(room))
    res.json(new Ok({room}))
})

// 加入房间
export const joinRoom = catchAsync(async (req,res)=>{
    const {
        roomNum,
    } = req.body
    const room = await redis.hGet('rooms',roomNum)
    if(!room) return res.json(Err.msg('房间不存在'))
    res.json(new Ok({room:JSON.parse(room)}))
})

// 离开房间
export const leaveRoom = catchAsync(async (req,res)=>{
    
})