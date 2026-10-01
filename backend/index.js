import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.routes.js"
import chatRouter from "./routes/chat.routes.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"https://rfs-room-for-student.onrender.com",
    credentials:true
}))

connectDB()



app.use('/api/auth/',authRouter)
app.use('/api/user/',userRouter)
app.use('/api/listing/',listingRouter)
app.use('/api/booking/',bookingRouter)
app.use('/api/chat/', chatRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on port 8000")
})
