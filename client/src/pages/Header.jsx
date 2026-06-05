import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import rcitLogo from "../assets/rcitLogo.png"
import { useNavigate } from "react-router";
function Header() {
    let [sidebar, setSidebar] = useState(false)
    let nav = useNavigate()
    return (
        <div className="">
            <div className="headerDiv">
                <img src={rcitLogo} id="rcitLogo"/>
                <div className="headerItems">
                    <p className="hItems" onClick={()=>{nav("/upload")}}>CCC</p>
                    <p className="hItems" onClick={()=>{nav("/upload")}}>DCA</p>
                    <p className="hItems" onClick={()=>{nav("/upload")}}>ADCA</p>
                    <p className="hItems" onClick={()=>{nav("/upload")}}>TALLY</p>
                    <p className="hItems" onClick={()=>{nav("/upload")}}>O LEVEL</p>
                    <p className="hItems" onClick={()=>{nav("/upload")}}>MS-OFFICE</p> 
                    <p className="hItems" onClick={()=>{nav("/upload")}}>PDF & E-Book</p>


                    


                </div>
                <RxHamburgerMenu id="menu" onClick={(prev)=>{setSidebar(prev => !prev)}}/>
            </div>
            <hr/>


            {
                sidebar && <Sidebar />
            }


        </div>
    )
}

export default Header