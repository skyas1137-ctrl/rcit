import React, { useContext } from "react";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useNavigate } from "react-router";
import axios from "axios";
import { dataContext } from "./UserContext";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";

gsap.registerPlugin({ useGSAP })
function Sidebar() {

    useGSAP(() => {
        gsap.fromTo(".sidebar", {
            opacity: 0,
            x: 90
        }, {
            opacity: 1,
            x: 0,
            yoyo: true
        })
    }, [])
    let { serverUrl } = useContext(dataContext)
    let dispatch = useDispatch()
    let { userData } = useSelector(state => state.user)
    let nav = useNavigate()

    const handleLogout = async () => {
        try {
            let res = await axios.get(`${serverUrl}/logout`, { withCredentials: true })
            console.log(res)
            dispatch(setUserData(null))
            nav("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="">
            <div className="sidebar">
                <div className="sideOption">
                    <h1 className="sideTitle" >{userData?.role === "admin" ? "Admin Dashboard" : `Welcome, ${userData.name}`}</h1>
                    <h1 className="Soption" onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>{userData?.role === "admin" ? "Upload CCC PDF" : "View CCC"}</h1>
                    <h1 className="Soption"  onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>{userData?.role === "admin" ? "Upload DCA PDF" : "View DCA"}</h1>
                    <h1 className="Soption"  onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>{userData?.role === "admin" ? "Upload ADCA PDF" : "View ADCA"}</h1>
                    <h1 className="Soption"  onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>{userData?.role === "admin" ? "Upload TALLY PDF" : "View TALLY"}</h1>
                    <h1 className="Soption"  onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>{userData?.role === "admin" ? "Upload O Level PDF" : "View O Level"}</h1>
                    <h1 className="Soption"  onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>{userData?.role === "admin" ? "Upload MS-OFFICE PDF" : "View MS-OFFICE "}</h1>
                    <h1 className="Soption"  onClick={() => { nav(userData?.role === "admin" ? "/upload" : "/view") }}>PDF & E-Book</h1>
                    <h1 className="Soption" onClick={() => { nav('/') }}>Signup</h1>
                    <h1 className="" onClick={handleLogout} style={{ color: "red", fontFamily: "arial black", fontSize: "14px", position: "absolute", bottom: "9%", cursor: "pointer" }}>Logout</h1>


                </div>

            </div>



        </div>
    )
}

export default Sidebar