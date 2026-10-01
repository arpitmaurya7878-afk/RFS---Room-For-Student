import { v2 as cloudinary } from "cloudinary"
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

try {

    const result = await cloudinary.uploader.upload("./test-image.jpg.png")

    console.log("IMAGE UPLOAD SUCCESS")
    console.log(result.secure_url)

} catch (error) {

    console.log("IMAGE UPLOAD FAILED")
    console.log(error)

}