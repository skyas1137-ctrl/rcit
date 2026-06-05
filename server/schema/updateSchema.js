import mongoose from "mongoose";

const updateScheam = new mongoose.Schema({
    update:{
        type:String,
        required:true
    }
}, { timestamps: true })

const UpdateUser = mongoose.model("UpdateUser",updateScheam)
export default UpdateUser