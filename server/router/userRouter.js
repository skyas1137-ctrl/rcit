import express from "express"
import { getCurrentUser, getMessage, login, logOut, searchPdf, signup, updateUser, uploadPDFController, viewPDF } from "../controllers/auth.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)

authRouter.get("/get-current",isAuth,getCurrentUser)

authRouter.post("/upload-pdf",upload.single("pdf"),uploadPDFController)

authRouter.get("/all-pdf",viewPDF)

authRouter.get("/searchPdf",searchPdf)

authRouter.post("/update-user",updateUser)

authRouter.get('/get-message',getMessage)



export default authRouter