import express from 'express'
import { PORT } from './config/config.js'



const app = express()



app.get('/',(req,res)=>{
  res.end('node server.')
})


app.listen(PORT,()=>{
  console.log('node server is running.')
})