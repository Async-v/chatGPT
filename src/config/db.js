import mongoose from "mongoose";
import configEnv from "./config.js";

const connectDB = async() => {
    try {
        await mongoose.connect(configEnv.MONGO_URI)
        console.log("Connected to Database")
    } catch (error) {
        console.warn("Error connecting to database", error)
    }
}

export default connectDB;