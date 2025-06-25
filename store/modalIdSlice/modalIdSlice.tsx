import { createSlice } from "@reduxjs/toolkit";

const modalIdSlice = createSlice({
    name:"modalId",
    initialState:{
        modalId:null
    },
    reducers:{
        setModalId:(state,action)=>{
            state.modalId = action.payload
        },
        clearModalId:(state)=>{
            state.modalId = null
        }
    }
})

export const {setModalId,clearModalId} = modalIdSlice.actions
export default modalIdSlice.reducer
