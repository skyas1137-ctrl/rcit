import React from "react";
import { createContext } from "react";

export const dataContext = createContext()


function UserContext({children}){
    const serverUrl = "https://rcit.onrender.com"
    // const serverUrl = "http://192.168.43.163:8000"


    const value = {
        serverUrl
    }

    return(
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext