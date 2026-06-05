import multer from "multer";
import path from "path";
import fs from "fs";

// Agar public/pdfs folder nahi hai toh bana dega
const dir = "./public/pdfs";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // Strict unique name with .pdf extension
        cb(null, `pdf-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
export default upload;