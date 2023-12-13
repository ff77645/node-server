import express from 'express'
import { createServer } from 'https'
import { createServer as createServers } from 'http'
import morgan from 'morgan'
import cors from 'cors'
import socket from './socket/index.js'
import router_v1 from './routes/v1/index.js'
import path from 'path'
import fs from 'fs'


const isDev = process.env.NODE_ENV !== 'production'

const app = express()
const httpServer = createServer({
  key:fs.readFileSync(path.resolve('ssl/summer9.cn.key')),
  cert:fs.readFileSync(path.resolve('ssl/summer9.cn.pem')),
},app)
const httpServers = createServers(app)
socket(httpServer)
socket(httpServers)

if(isDev){
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/chat',express.static('dist'))

app.get('/',(req,res)=>{
  res.send('node server.')
})
app.use('/v1',router_v1)


app.use((err,req,res,next)=>{
  console.log({err});
  res.status(500).send(err.message)
})

const App = {
  listen(port,fn){
    httpServer.listen(port,fn)
    httpServers.listen(80,()=>{
      console.log(`App listening 80.`);
    })
  }
}

export default App