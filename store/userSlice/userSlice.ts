import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface refreshTokenType{
    _id:string,
    createdAt:string,
    device:string,
    expiresAt:string,
    token:string
}

interface userInterface {
    _id:string,
    name:string,
    email:string,
    refreshToken:refreshTokenType,
    accessToken:string
    
}

const initialState:userInterface ={
    _id:"",
    name:"",
    email:"",
    refreshToken:{
        _id:"",
        createdAt:"",
        device:"",
        expiresAt:"",
        token:""
    },
    accessToken:""
}


const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<userInterface>)=>{
            state._id = action.payload._id
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
        }, 
        clearUser:(state)=>{
            state._id = ""
            state.name = ""
            state.email = ""
            state.accessToken = ""
        },

        updateRefreshToken:(state,action:PayloadAction<refreshTokenType>)=>{
            state.refreshToken = action.payload
        },

        updateAccessToken:(state,action:PayloadAction<string>)=>{
            state.accessToken = action.payload
        }


    }
})

export const {setUser,clearUser,updateRefreshToken,updateAccessToken} = userSlice.actions
export default userSlice.reducer