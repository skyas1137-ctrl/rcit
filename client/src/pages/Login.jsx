import React, { lazy, useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import { dataContext } from "./UserContext";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
function Login() {
    let nav = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);



    let { serverUrl } = useContext(dataContext)

    let dispatch = useDispatch()


    const handleSignupAPI = async (e) => {
        e.preventDefault()
        setLoading(true)
            setErr("")
        try {
            let res = await axios.post(`${serverUrl}/login`, {
                email,
                password
            }, { withCredentials: true })

            dispatch(setUserData(res.data))

            console.log(res.data)
            nav("/home")
            setLoading(false)


        } catch (error) {
            setLoading(false)
            console.log(error.response.data.message)
            setErr(error.response.data.message)
        }
    }


    return (
        <div className="">
            <div className="signupDiv">
                <form className="signup" onSubmit={handleSignupAPI}>
                    <h1 id="signLogo">Login</h1>
                    <input type="text" placeholder="Email" className="SignupInput" onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="text" placeholder="Password" className="SignupInput" onChange={(e) => { setPassword(e.target.value) }} />
                    {
                        err && 
                        <p style={{ color: "red" }}>{err}</p>
                    }
                    <button id="signBtn" disabled={loading}>{loading?"Loading...":"Login"}</button>
                    <p id="navSign" onClick={() => { nav("/") }}>Create an account? <span id="navSignSapn">Signup</span></p>
                </form>

            </div>

        </div>
    )
}

export default Login