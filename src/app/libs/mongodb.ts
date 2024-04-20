import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! as string

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Successfully conected to MongoDB rentbike database")

    } catch (error) {
        console.log(error)
    }
};