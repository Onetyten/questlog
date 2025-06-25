import { createSlice } from "@reduxjs/toolkit";


const activeRouteSlice = createSlice({
    name:"activeRoute",
    initialState:{
        activeRoute:"/"
    },
    reducers:{
        setActiveRoute:(state,action)=>{
            state.activeRoute = action.payload
        }
    }
})

export const {setActiveRoute} = activeRouteSlice.actions
export default activeRouteSlice.reducer