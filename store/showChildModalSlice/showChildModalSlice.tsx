import { createSlice } from "@reduxjs/toolkit";

const showChildTaskSlice = createSlice({
    name:"showChildModal",
    initialState:{
        showChildModal:false
    },
    reducers:{
        toggleModal:(state)=>{
            state.showChildModal = !state.showChildModal
        },
        openModal:(state)=>{
            state.showChildModal = true
        },
        closeModal:(state)=>{
            state.showChildModal = false
        },
    }
})

export const {toggleModal,openModal,closeModal} = showChildTaskSlice.actions
export default showChildTaskSlice.reducer

