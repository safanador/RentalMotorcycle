import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URI! as string

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Successfully conected to MongoDB rentbike database")

    } catch (error) {
        console.log(error)
    }
};