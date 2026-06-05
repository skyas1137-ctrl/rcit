import React, { useContext, useState } from "react";
import student from "../../assets/student.png"
import { PiCertificateFill } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "../Footer";
import { useNavigate } from "react-router";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { dataContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../redux/userSlice";
gsap.registerPlugin(useGSAP)
function AdminIntro() {

    useGSAP(() => {
        gsap.fromTo(".lll", {
            opacity: 0,
            x: 250,
        }, {
            opacity: 1,
            x: 0,
            // repeat:"-1",
            duration: 1
        })
    }, [])

    let nav = useNavigate()
    let [updateUser, setUpdateUser] = useState(false)

    

    let [update,setUpdate] = useState("")

    let {serverUrl} = useContext(dataContext)
    let dispatch = useDispatch()

    const handleMessage = async()=>{
        try {
            let res = await axios.post(`${serverUrl}/update-user`,{update},{withCredentials:true})
            dispatch(setUpdateData(res.data))
            console.log(res.data)
            setUpdateUser(false)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }



    return (
        <div className="" style={{ marginTop: "49px" }}>
            <div className="scrollTextDiv">
                <h1 id="latest" className="lll">ADMIN PANEL</h1>
                <marquee behavior="" direction="">Admin Command Center</marquee>
            </div>

            <div className="centerSectionDiv" style={{ backgroundColor: "rgb(54, 54, 54)" }} >
                <h1 id="master" style={{ marginInline: "9px", fontSize: "30px" }}>Ecosystem Management Hub & Live Analytics</h1>
                <h1 id="masterP">Ecosystem Hub • Live Training Analytics & Content Management</h1>

                <div className="studentImage">
                    <img src={student} id="sImage" />
                </div>

                <div className="fBtnDiv">
                    <h1 className="FBtn" onClick={(prev) => { setUpdateUser(prev => !prev) }}>User update</h1>
                    <h1 className="FBtnF" onClick={() => { nav("/upload") }}>Upload PDF</h1>
                </div>

                {
                    updateUser && 
                    <div className="sendMessage">
                        <input type="text" id="search" placeholder="Type notice here..."  onChange={(e)=>{setUpdate(e.target.value)}} />
                        <button id="sendBtn" onClick={handleMessage}><IoIosSend/></button>
                    </div>
                }





            </div>

            <Footer />



        </div>
    )
}

export default AdminIntro