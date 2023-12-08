import nodemailer from 'nodemailer'
import {EMAIL_USER,EMAIL_PASSWORD} from '../config/config.js'

export function sendMail(receiver){
    const transporter = nodemailer.createTransport({
        service:'163',
        auth:{
            user:EMAIL_USER,
            pass:EMAIL_PASSWORD
        }
    })
    return new Promise((resolve,reject)=>{
        transporter.sendMail(receiver,(error,info)=>{
            if(error) return reject(error)
            resolve(info)
        })
    })
}