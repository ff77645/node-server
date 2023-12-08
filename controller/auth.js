import catchAsync from '../utils/catchAsync.js'
import pool from '../mysql.js'
import dayjs from 'dayjs'
import {sign,verify} from '../utils/jwt.js'
import {JWT_SECRET,TOKEN_EXPIRE} from '../config/config.js'
import {Ok,Err} from '../helper/result.js'


// 登录 注册
export const login = catchAsync(async (req,res)=>{
    const {email,password} = req.body
    let [[resp]] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(!resp){
        const register_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const register_ip = req.ip
        // TODO 生成随机用户名
        const username = '无名狗蛋'
        // TODO 生成用户头像
        const avatar = ''
        await pool.query(
            'INSERT INTO users(nickname,email,password,avatar,register_date,register_ip,last_login_date,last_login_ip) VALUES (?,?,?,?,?,?,?,?)',
            [
                username,
                email,
                password,
                avatar,
                register_date,
                register_ip,
                register_date,
                register_ip
            ]
        )
        const [[user]] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        resp = user
    }else{
        if(resp.password !== password)  return res.json(Err.msg('密码错误'))
        const date = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const ip = req.ip
        await pool.query(
            'UPDATE users SET last_login_date = ?,last_login_ip = ? WHERE id = ?',
            [date,ip,resp.id]
        )
    }
    const token = await sign({id:resp.id},JWT_SECRET,{
        expiresIn:TOKEN_EXPIRE
    })
    res.json(new Ok({
        user:resp,
        token,
    }))
})


// 更新用户数据
export const updateUserData = catchAsync(async (req,res)=>{
    let {
        id
    } = req.body
    const [[user]] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    )
    if(!user) return res.json(Err.msg('用户不存在',404))
    let {
        username=user.username,
        nickname=user.nickname,
        gender=user.gender,
        mobile=user.mobile,
        mobile_confirmed=user.mobile_confirmed,
        avatar,
    } = req.body
    if(avatar){
        const create_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const img_type = 'user_head'
        await pool.query(
            'INSERT INTO user_image(uid,img_src,img_type,create_date) VALUES (?,?,?,?)',
            [id,avatar,img_type,create_date]
        )
    }else{
        avatar=user.avatar
    }
    await pool.query(
        'UPDATE users SET username = ?,nickname = ?,gender = ?,mobile = ?,mobile_confirmed = ?,avatar = ? WHERE id = ?',
        [username,nickname,gender,mobile,mobile_confirmed,avatar,id]
    )
    res.json(Ok.msg('修改成功'))
})


// 获取用户数据
export const getUserInfo = catchAsync(async (req,res)=>{
    let {
        token
    } = req.query
    console.log({token});
    try{
        const data = await verify(token,JWT_SECRET)
        const [[user]] = await pool.query(
            'SELECT * FROM users WHERE id =?',
            [data.id]
        )
        const _token = await sign({id:data.id},JWT_SECRET,{
            expiresIn:TOKEN_EXPIRE
        })
        return res.json(new Ok({
            data:user,
            token:_token
        }))
    }catch(e){
        return res.json(Err.msg('token失效',401))
    }
})