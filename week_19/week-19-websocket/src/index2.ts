import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

interface User {
    socket:WebSocket,
    room: string
}
let allSockets: User[] =[];

wss.on('connection', function connection(socket) {
    socket.on('error', console.error);

    socket.on('message', (message) => {
        //@ts-ignore
        const parsedMessage =JSON.parse(message);
        if(parsedMessage.type =="join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type == "chat"){
            const curretUserRoom = allSockets.find((x)=>x.socket == socket)
            for (let i=0; i<allSockets.length;i++){
                if (allSockets[i]?.room === curretUserRoom?.room) {
                    allSockets[i]?.socket.send(parsedMessage.payload.message)
                }
            }
        }
    });

    socket.on("disconnect",()=>{
        allSockets =allSockets.filter(x => x.socket != socket);
    })
    // socket.send('Hello! Message From Server!!');
});