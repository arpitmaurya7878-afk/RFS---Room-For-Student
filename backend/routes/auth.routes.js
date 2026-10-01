import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
import { forgotPassword, resetPassword } from "../controllers/password.controller.js";

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter