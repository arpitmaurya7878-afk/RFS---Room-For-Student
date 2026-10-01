import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
  cb(null, "./public"); },
  filename: (req, file, cb) => { 
  // Get original file extension
   let extension = path.extname(file.originalname); 
  // Create unique file name
   let uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + extension;
    cb(null, uniqueName); } }); 
    const upload = multer({ storage });
    
    export default upload;