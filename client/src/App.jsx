import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useGetCurrent from "./pages/useGetCurrent";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin/Admin";
import UploadPDF from "./pages/Admin/UploadPDF";
import ViewPDF from "./pages/ViewPDF";
import useAllPdf from "./pages/useAllPdf";

function App() {
  useGetCurrent()
  useAllPdf()
  let {userData,loading} = useSelector(state=>state.user)

  if(loading){
    return(
      <div className="" style={{height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center",color:"orange"}}>
        Loading RCIT Portal...
      </div>
    )
  }


  


  return (
    <Routes>
      <Route path="/" element={!userData?<Signup/>:(userData?.role==="admin" ? <Navigate to="/admin"/>:<Navigate to="/home"/>)}/>
      <Route path="/login" element={!userData?<Login/>:(userData?.role==="admin" ? <Navigate to="/admin"/>:<Navigate to="/home"/>)}/>

      <Route path="/home" element={userData?.role==="user"?<Home/>:<Navigate to="/"/>}/>

      <Route path="/admin" element={userData?.role==="admin"?<Admin/>:<Navigate to="/home"/>}/>

      <Route path="/upload" element={userData?.role==="admin"?<UploadPDF/>:<Navigate to="/home"/>}/>
      <Route path="/view" element={userData?.role==="user"?<ViewPDF/>:<Navigate to="/home"/>}/>




    </Routes>
  )
}

export default App