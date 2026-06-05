import User from "../schema/userSchema.js";
import bcrypt from "bcrypt"
import gentoken from "./token.js";
import pdfModel from "../schema/pdfSchema.js";
import uploadOnCloudinary from "./cloudinary.js";
import fs from "fs";
import UpdateUser from "../schema/updateSchema.js";
export const signup = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        if (!name || !email || !number || !password) {
            return res.status(400).json({ message: "Please fill all details" })
        }

        const existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({ message: "Email already exist" })
        }

        const existNumber = await User.findOne({ number })

        if (existNumber) {
            return res.status(400).json({ message: "Phone number already exist" })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            name,
            email,
            number,
            password: hashPass
        })

        let token = await gentoken(createUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        })

        return res.status(201).json(createUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}









export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all details" })
        }

        const existEmail = await User.findOne({ email })

        if (!existEmail) {
            return res.status(400).json({ message: "Email does not exist" })
        }

        const compare = await bcrypt.compare(password, existEmail.password)

        if (!compare) {
            return res.status(400).json({ message: "Incorrect password" })
        }


        let token = await gentoken(existEmail._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        })

        return res.status(200).json(existEmail)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successfull" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "userId not found" })
        }

        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const uploadPDFController = async (req, res) => {
    try {
        let { courseName, title } = req.body;

        if (!courseName) {
            return res.status(400).json({ message: "Please select course" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Please upload a PDF file" });
        }

        // 100% Safe Local URL (Cloudinary ka jhanjhat khatam)
        // Jab deploy karoge toh localhost:8000 ki jagah live domain aa jayega
        const pdfUrl = `https://rcit.onrender.com/public/pdfs/${req.file.filename}`;
        console.log("FINAL CHALNE WALA PDF URL: ", pdfUrl);

        const newPDF = new pdfModel({
            courseName: courseName,
            pdfUrl: pdfUrl,
            title: title
        });

        await newPDF.save();
        return res.status(201).json(newPDF);

    } catch (error) {
        console.log("Upload Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const viewPDF = async (req, res) => {
    try {
        let allPdf = await pdfModel.find({})
        return res.status(200).json(allPdf);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const searchPdf = async (req, res) => {
    try {
        let selectCourse = req.query.courseName;

        if (!selectCourse) {
            return res.status(200).json([]); // Agar query khali hai toh empty array bhej do safely
        }

        const pdfs = await pdfModel.find({
            courseName: { $regex: new RegExp(selectCourse.trim(), 'i') }
        });

        if (!pdfs) {
            return res.status(400).json({ message: "PDF not found" })
        }
        res.status(200).json(pdfs);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateUser = async (req, res) => {
    try {
        let { update } = req.body

        if (!update) {
            return res.status(400).json({ message: "Please fill update box" })
        }

        const newUpdate = UpdateUser({
            update
        })

        await newUpdate.save()

        return res.status(201).json(newUpdate);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessage = async (req, res) => {
    try {
        let message = await UpdateUser.findOne().sort({ createdAt: -1 });
        return res.status(200).json(message);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}