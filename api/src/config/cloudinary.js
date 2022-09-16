require('dotenv').config();
const cloudinary = require("cloudinary").v2

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const cloudKey = process.env.CLOUDINARY_API_KEY
const cloudSecret = process.env.CLOUDINARY_API_SECRET


cloudinary.config({ 
    cloud_name: cloudName, 
    api_key: cloudKey, 
    api_secret: cloudSecret,
    secure:true
  });


  
module.exports = cloudinary
