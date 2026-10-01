import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
        
    })
    try {
        if(!filepath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filepath)
        fs.unlinkSync(filepath)
        return uploadResult.secure_url
        
    } catch (error) {
       console.log("error while file upload on cloudinary")
console.log("message:", error.message)
console.log("http_code:", error.http_code)
console.log("name:", error.name)
console.log("full error:", error)
       
    }
}

export default uploadOnCloudinary