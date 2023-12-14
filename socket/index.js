import {Server} from 'socket.io'
import chatServer from './chat.js'

const io = new Server({
    cors:{
        origin:'*',
        credentials:true
    }
})

// io.on('connection',socket =>{
//     console.log('connection',socket.id);
//     socket.on('disconnect',i=>{
//         console.log('disconnect',i.id);
//     })
// })
chatServer(io)

export default httpServer =>{
    io.attach(httpServer)
}