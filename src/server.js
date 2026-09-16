import app from "./app/app.js";
import connectDB from "./config/db.js";
import initSocketServer from "./sockets/socket.server.js";
import { createServer } from "http";

const httpServer = createServer(app);

connectDB();

initSocketServer(httpServer);

httpServer.listen(3000, ()=>{
    console.log('server is running on port 3000')
})