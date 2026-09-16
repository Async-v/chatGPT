import { Server } from 'socket.io';

function initSocketServer(httpServer) {

    const io = new Server(httpServer, {});

    io.on("connection", (socket)=>{
        console.log("New Socket Connection:", socket.id)
    })

}

export default initSocketServer;