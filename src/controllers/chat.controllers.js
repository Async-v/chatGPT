import chatModel from '../models/chat.model.js';


async function createChat(req, res) {
    
    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title
    })

    return res.status(201).json({
        message: "chat created successfully",
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }
    })
}

export default {
    createChat
}