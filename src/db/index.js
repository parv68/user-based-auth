import mongoose from "mongoose";
import dotenv from "dotenv";    
dotenv.config()
const connectDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting", error)
    }
}

export default connectDB;