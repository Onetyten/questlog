/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {store} from "@/store"
import { updateAccessToken,clearUser } from "@/store/userSlice/userSlice"

const api  = axios.create({
    baseURL:process.env.NEXT_PUBLIC_DOMAIN,
})

api.interceptors.request.use((config)=>{
    const state = store.getState()
    const token  = state.user.accessToken
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

let is_Refreshing = false
let failedQueue:any[] = []

const processQueue = (error:any,token:string|null = null)=>{
    failedQueue.forEach(prom=>{
        if (token){
            prom.resolve(token)
        }
        else{
            prom.reject(error)
        }
    })
    failedQueue = []
}


api.interceptors.response.use(
    response=>response,
    async (error)=>{
        const originalRequest = error.config
        if (error.response?.data?.code == "TOKEN_EXPIRED" && !originalRequest._retry){
            if (is_Refreshing){
                return new Promise(function(resolve,reject){
                    failedQueue.push({
                        resolve:(token:string)=>{
                            originalRequest.headers["Authorization"]= `Bearer ${token}`
                            resolve(api(originalRequest))
                        },
                        reject:(err:any)=>reject(err)
                    })
                })
            }
            is_Refreshing = true
            originalRequest._retry = true

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/refreshAccesstoken`,{ refreshToken: store.getState().user.refreshToken.token})
                const newAccessToken = res.data.user.token
                store.dispatch(updateAccessToken(newAccessToken));
                processQueue(null,newAccessToken)
                originalRequest.headers["Authorization"]= `Bearer ${newAccessToken}`
                return api(originalRequest)
            }
            catch (error) {
                processQueue(error,null)
                store.dispatch(clearUser())
                return Promise.reject(error) 
            }
            finally{
                is_Refreshing = false
            }   
        }
        return Promise.reject(error);

    }
)
export default api