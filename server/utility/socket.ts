const socket = require('socket.io')
let io: any

export const attach = (server: any) => {
    if (io) {
        throw new Error('Socket server already attached')
    }
    io = socket(server, {
        cors: {
            origin: 'http://localhost:3000'
        }
    })
    io.sockets.on('connection', async (socket: any) => {
        // console.log('listening')
        io.id = Math.random().toString(36).substr(2, 9)
        console.log(`Socket server started with id: ${io.id}`)
        // START: Below code is for testing you can remove it
        // socket.on('Testing_Socket', (data) => {
        //     console.log(`Received message from client: ${data}`)
        // })
        // socket.emit('Testing_Socket_Verified', 'Verified its working')
        // END
    })
}

export const getIO = () => {
    if (!io) {
        throw new Error('Socket not initialized')
    }

    return io
}

