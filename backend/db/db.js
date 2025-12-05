import mongoose from "mongoose";

export const dbConnection = async (req, res) => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log('db connect successfully')
    } catch (error) {
        console.log(error)
    }
}