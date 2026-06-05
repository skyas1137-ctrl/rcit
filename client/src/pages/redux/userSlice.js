import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: true,
        pdfData: null,
        updateData:null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.loading = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPdfData: (state, action) => {
            state.pdfData = action.payload;
        },
        setUpdateData: (state, action) => {
            state.updateData = action.payload;
        }
    }
})

export const { setUserData, setLoading ,setPdfData, setUpdateData} = userSlice.actions
export default userSlice.reducer