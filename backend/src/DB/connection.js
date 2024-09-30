import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log(">> Conectado a MongoDB con éxito!")
    }catch(error) {
        console.log(">> Error: " + error)
    }
}