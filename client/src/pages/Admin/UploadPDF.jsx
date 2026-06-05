import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { dataContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { setPdfData } from "../redux/userSlice";
import Header from "../Header";
import { useNavigate } from "react-router";

function UploadPDF() {
    let courseOption = ["CCC", "DCA", "ADCA", "TALLY", "O_LEVEL", "MS_OFFICE", "E_BOOK"]

    const [courseName, setCourseName] = useState("");
    const [title, setTitle] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch()
    let nav = useNavigate()

    let file = useRef()
    let { serverUrl } = useContext(dataContext)
    console.log(pdfFile)
    console.log(courseName)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            let formData = new FormData()
            formData.append("courseName", courseName)
            formData.append("title", title)
            formData.append("pdf", pdfFile)

            let res = await axios.post(`${serverUrl}/upload-pdf`, formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }

                })

            console.log(res)

            dispatch(setPdfData(res.data))
            nav('/admin')

            setLoading(false)



        } catch (error) {
            setLoading(false)

            console.log("Error: " + error.response?.data?.message);
        }
    }
    return (
        <div className="">
            <Header />
            <div className="signupDiv">
                <form className="signup" onSubmit={handleSubmit}>
                    <select name="" id="" value={courseName} onChange={(e) => { setCourseName(e.target.value) }}>
                        <option value="">-- Choose a Course --</option>
                        {
                            courseOption.map((value, index) => (
                                <option key={index}>{value}</option>
                            ))
                        }
                    </select>

                    <input type="text" placeholder="Enter Title" className="SignupInput" onChange={(e) => { setTitle(e.target.value) }} />
                    {/* <h1 className="SignupInput" onClick={()=>{file.current.click()}} style={{fontSize:"15px",color:"rgb(53, 53, 53)",display:"flex",alignItems:"center",justifyContent:"center"}}  onChange={(e)=>{setPdfFile(e.target.value)}}>Select PDF</h1> */}
                    <input type="file" ref={file} accept="application/pdf" className="SignupInput" onChange={(e) => { setPdfFile(e.target.files[0]) }} />

                    <button type="submit" id="signBtn" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
                </form>
            </div>
        </div>
    )
}

export default UploadPDF