import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import configEnv from "../config/config.js";

async function authUser(req, res, next) {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, configEnv.JWT_SECRET);

        const user = await userModel.findById(decoded._id);

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}


export default {
    authUser
}