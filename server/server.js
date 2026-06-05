import express from "express";
import dotenv from "dotenv";
dotenv.config()

import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./controllers/db.js";
import authRouter from "./router/userRouter.js";
const port = process.env.PORT || 5000;
const app = express()

// server.js mein jahan static folder define kiya hai, wahan ye karo:
app.use('/public', (req, res, next) => {
    res.set('Content-Type', 'application/pdf');
    next();
}, express.static('public'));

app.use(cors({
    origin: ["http://192.168.43.163:5173","https://rcit-1.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())


app.use(express.json())

app.use('/public', express.static('public'));


        
app.use(authRouter)






app.listen(port, () => {
    connectDB()
    console.log(`server is lister ${port}`)
})