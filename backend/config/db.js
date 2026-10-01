import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
       
        console.log("connected to DB")
    } catch (error) {
        console.log("error while connecting DB",error)
    }
}

export default connectDB