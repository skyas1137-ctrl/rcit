import React, { useContext, useEffect, useState } from "react";
import student from "../assets/student.png"
import { PiCertificateFill } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { dataContext } from "./UserContext";
import rcit3 from "../assets/rcit3.png"
import rcit4 from "../assets/rcit4.png"
import rcit5 from "../assets/rcit5.png"
import rcit6 from "../assets/rcit6.png"

gsap.registerPlugin(useGSAP)
function Intro() {

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
    // let {updateData} = useSelector(state=>state.user)

    let { serverUrl } = useContext(dataContext)
    let [data, setData] = useState("")
    console.log(serverUrl)


    useEffect(() => {
        const handleMessage = async () => {
            try {
                let res = await axios.get(`${serverUrl}/get-message`, { withCredentials: true })
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleMessage()
    }, [])
    return (
        <div className="" style={{ marginTop: "49px" }}>
            <div className="scrollTextDiv">
                <h1 id="latest" className="lll">Latest Update</h1>
                <marquee behavior="" direction="">{data ? data.update : "Loading RCIT Information..."}</marquee>
            </div>

            <div className="centerSectionDiv">
                <h1 id="master">Master Tomorrow' s Skill, Today.</h1>
                <h1 id="masterP">Practical, Project-Based Training of a Successful Tech Career Choose Your Path</h1>

                <div className="studentImage">
                    <img src={student} id="sImage" />
                </div>

                <div className="fBtnDiv">
                    <h1 className="FBtn" onClick={() => { nav("/view") }}>View Course</h1>
                    <h1 className="FBtnF" onClick={() => { nav("/view") }}>Free Demo</h1>
                </div>

                <div className="absoluteDiv">
                    <div className="flexkeliye">
                        <div className="topDiv">
                            <div className="topChildDiv">
                                <PiCertificateFill className="tcdI" />
                                <div className="topChild">
                                    <h1 className="tcd">20+</h1>
                                    <h1 className="tcd">Year of Excellence</h1>
                                </div>
                            </div>

                            <div className="topChildDiv">

                                <MdPeopleAlt className="tcdI" />
                                <div className="topChild">
                                    <h1 className="tcd">500+</h1>
                                    <h1 className="tcd">Total Students</h1>
                                </div>

                            </div>

                        </div>



                        <div className="topDiv">
                            <div className="topChildDiv">
                                <RiVerifiedBadgeFill className="tcdI" />
                                <div className="topChild">
                                    <h1 className="tcd">20+</h1>
                                    <h1 className="tcd">Year of Excellence</h1>
                                </div>
                            </div>

                            <div className="topChildDiv">

                                <FaChalkboardTeacher className="tcdI" />
                                <div className="topChild">
                                    <h1 className="tcd">500+</h1>
                                    <h1 className="tcd">Total Students</h1>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>



            </div>

            <h1 id="feature">Featured Courses</h1>

            <div className="allCourses">
                <div className="courses">
                    <img src={rcit4} id="coursesImg" />
                    <h1 className="viewBtn" onClick={()=>{nav("/view")}}>View Courses</h1>
                </div>

                <div className="courses">
                    <img src={rcit5} id="coursesImg" />
                    <h1 className="viewBtn" onClick={()=>{nav("/view")}}>View Courses</h1>
                </div>

                <div className="courses">
                    <img src={rcit6} id="coursesImg" />
                    <h1 className="viewBtn" onClick={()=>{nav("/view")}}>View Courses</h1>
                </div>


                <div className="courses">
                    <img src={rcit3} id="coursesImg" />
                    <h1 className="viewBtn" onClick={()=>{nav("/view")}}>View Courses</h1>
                </div>
            </div>


        </div>
    )
}

export default Intro