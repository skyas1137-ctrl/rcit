import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const data = await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB