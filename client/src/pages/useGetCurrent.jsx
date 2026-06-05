import axios from "axios";
import React, { useContext, useEffect } from "react";
import { dataContext } from "./UserContext";
import { useDispatch } from "react-redux";
import { setLoading, setUserData } from "./redux/userSlice";


function useGetCurrent() {
    let { serverUrl } = useContext(dataContext)
    let dispatch = useDispatch()
    useEffect(() => {
        const fatechingData = async () => {

            try {
                let res = await axios.get(`${serverUrl}/get-current`, { withCredentials: true })
                if (res) {
                    dispatch(setUserData(res.data))
                } else {
                    dispatch(setLoading(false))
                }
                console.log(res)
            } catch (error) {
                console.log(error.response.data.message)
                dispatch(setLoading(false))


            }
        }
        fatechingData()
    }, [])
}

export default useGetCurrent