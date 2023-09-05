import { createSlice } from "@reduxjs/toolkit"

const theme = localStorage.getItem("theme")
const initialMode = (theme === "0")

const initialState={
    mode: initialMode

}

const dataSet = createSlice({
    name:'dataSet',
    initialState,
    reducers:{
        modeRdc:(state)=>{
            state.mode = !state.mode
        },

    }
})

export const {modeRdc} = dataSet.actions
export default dataSet.reducer
