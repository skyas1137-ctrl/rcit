import axios from "axios";
import React, { useContext, useEffect } from "react";
import { dataContext } from "./UserContext";
import { useDispatch } from "react-redux";
import {setPdfData } from "./redux/userSlice";


function useAllPdf() {
    let { serverUrl } = useContext(dataContext)
    let dispatch = useDispatch()
    useEffect(() => {
        const fatechingData = async () => {

            try {
                let res = await axios.get(`${serverUrl}/all-pdf`, { withCredentials: true })
                    dispatch(setPdfData(res.data))
                console.log(res)
            } catch (error) {
                console.log(error.response.data.message)


            }
        }
        fatechingData()
    }, [])
}

export default useAllPdf