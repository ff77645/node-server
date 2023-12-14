const SEND_TEXT = 'send_text'
const JOIN_ROOM = 'join_room'
const COMMON_ROOM = '001'


export default io =>{
    const nsp = io.of('/chat')
    const adapter = nsp.adapter

    // adapter.on('create-room',room=>{
    //     console.log('创建房间',room);
    // })

    // adapter.on('join-room',async room=>{
    //     console.log('加入房间',room);
    //     const amount = (await nsp.in(room).allSockets()).size
    //     console.log({room,amount});
    //     nsp.in(room).emit('join-room',{amount,room})
    // })

    adapter.on('leave-room',async room=>{
        console.log('离开房间',room);
        const amount = (await nsp.in(room).allSockets()).size
        nsp.in(room).emit('leave-room',{amount,room:room})
    })

    // adapter.on('delete-room',room=>{
    //     console.log('删除房间',room);
    // })

    nsp.on('connection',async socket=>{
        socket.on('message',data=>{
            socket.to(data.roomid).emit('message',data.value)
        })
        socket.on('join-room',async room=>{
            socket.join(room)
            const amount = (await nsp.in(room).allSockets()).size
            console.log({room,amount});
            nsp.in(room).emit('join-room',{amount,room})
        })
        socket.on('leave-room',roomid=>{
            socket.leave(roomid)
        })

        socket.join(COMMON_ROOM)
        const amount = (await nsp.in(COMMON_ROOM).allSockets()).size
        nsp.in(COMMON_ROOM).emit('join-room',{amount,room:COMMON_ROOM})
    })
}
// 创建房间


// 加入房间


// 离开房间


// 发送消息