import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name:"openBar",
    initialState:{
        openBar:true
    },
    reducers:{
        ToggleSideBar:(state)=>{
            state.openBar = !state.openBar
        },
        openSideBar:(state)=>{
            state.openBar = true
        },
        closeSideBar:(state)=>{
            state.openBar = false
        },
    }
})

export const {openSideBar,closeSideBar,ToggleSideBar} = sidebarSlice.actions
export default sidebarSlice.reducer

