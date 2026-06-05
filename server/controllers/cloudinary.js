import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) return resolve(null);

        // Memory buffer ko safe tarike se Cloudinary par stream karne ka tarika
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto", // Cloudinary khud pehchanega ki yeh sahi PDF hai
                folder: "pdfs",
                format: "pdf"
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Stream Error:", error);
                    return resolve(null);
                }
                // Yeh aapko 100% working URL dega jisme /image/ ya /raw/ ka koi panga nahi hoga
                resolve(result.secure_url);
            }
        );

        // Buffer ko stream me write kar rahe hain
        uploadStream.end(fileBuffer);
    });
};

export default uploadOnCloudinary;