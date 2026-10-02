import mongoose from "mongoose"
import User from "../model/user.model.js"
import genToken from "../config/token.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    try {
        let {name,email,password} = req.body
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already existed"} )
        }
        const hashPassword = await bcrypt.hash(password,10)
        let user = await User.create({name,email,password:hashPassword})
        let token = await genToken(user._id)
        console.log("TOKEN GENERATED:", token)
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        return res
        .status(201)
        .json({message: "user logged in successfully",user})
    } catch (error) {
        return res
        .status(500)
        .json({message: `signup error ${error}`})
    }
}



export const login = async (req,res) => {
    try {
        let {name,email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not  exist"} )
            
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message: "incorrect password"})
        }
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        return res
        .status(201)
        .json({message: "user registered successfully"},user)
    } catch (error) {
        return res
        .status(500)
        .json({message: `login error error ${error}`})
    }
}


export const logout = async(req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "logout successfullly"})
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`})
    }
}



