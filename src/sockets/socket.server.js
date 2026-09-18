import { Server } from 'socket.io';
import { parseCookie } from 'cookie';
import jwt from 'jsonwebtoken';
import configEnv from '../config/config.js';
import userModel from '../models/user.model.js';
import aiService from '../services/ai.service.js';
import messageModel from '../models/message.model.js';

function initSocketServer(httpServer) {

    const io = new Server(httpServer, {});

    /* socket.io middleware */
    io.use(async (socket, next) => {
        const cookies = parseCookie(socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            next(new Error("Authentication error: No token provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token, configEnv.JWT_SECRET)
            const user = await userModel.findById(decoded._id);
            socket.user = user;
            next();
        }
        catch (error) {
            next(new Error("Authentication error: Invaild token"))
        }
    })

    io.on("connection", (socket) => {

        socket.on("ai-message", async (messagePayload) => {

            /*
                messagePayload = {
                    chat: chatId,
                    content: message text content
                } 
            */
            await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: messagePayload.content,
                role: "user"
            })

            const chatHistory = await messageModel.find({
                chat: messagePayload.chat
            }).sort({ createdAt: 1 }).limit(20).lean()


            const response = await aiService.generateResponse(chatHistory.map((item)=>{
                return {
                    role: item.role,
                    parts: [{
                        text: item.content
                    }]
                }
            }));

            await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: response,
                role: "model"
            })

            socket.emit("ai-response", {
                content: response,
                chat: messagePayload.chat
            })

        })
    })

}

export default initSocketServer;