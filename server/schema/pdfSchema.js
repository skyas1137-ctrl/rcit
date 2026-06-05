import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        enum: ["CCC", "DCA", "ADCA", "TALLY", "O_LEVEL", "MS_OFFICE", "E_BOOK"]
    },
    pdfUrl: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
}, { timestamps: true })

const pdfModel = mongoose.model("pdfModel",pdfSchema)

export default pdfModel