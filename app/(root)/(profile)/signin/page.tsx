/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/userSlice/userSlice'
import { toast } from 'react-toastify'
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";


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


export default function page() {

    const router = useRouter()
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const [showEmailError,setShowEmailError] = useState(false)
    const [showPasswordError,setShowPasswordError] = useState(false)
    const [isSubmitting,setIsSubmitting] = useState(false)
    
    

    const submit = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (!email || email.trim().length<1){
            setShowEmailError(true)
        }
        else
        {
            setShowEmailError(false)
        }
        if (!password || password.trim().length<1){
            setShowPasswordError(true)
        }
        else
        {
            setShowPasswordError(false)
        }


        if (email && email.trim().length>0 && password && password.trim().length>7)
        {   
           try {
                if(isSubmitting) return
                setIsSubmitting(true)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/signin`, { email, password});

                if (!res.data.success) {
                    toast.error((res.data?.message.toLowerCase()) || "Something went wrong");
                    return 
                }

                if (res.data.user.id && res.data.user.name && res.data.user.email && res.data.token && res.data.refreshToken?.token)
                {
                    toast.success(`Login successful welcome ${res.data.user.name}`)
                    const savedData:userInterface = {
                        _id:res.data.user.id,
                            name:res.data.user.name,
                            email:res.data.user.email,
                            refreshToken:res.data.refreshToken,
                            accessToken:res.data.token
                    }

                    dispatch(setUser(savedData))
                    console.log(savedData)
                    router.push('/')
                }
           }
           catch (error) {
                
                if (axios.isAxiosError(error)) {
                    toast.error((error.response?.data?.message).toLowerCase()|| "Server error. Please try again.");
                } 
                else {
                    toast.error("Something went wrong. Please try again.");
                }
           }  
            finally{
                setIsSubmitting(false)
            }   


            
        }



    }


  return (
    <div className='bg-secondary h-screen w-full flex justify-center items-center '>
        <div className='flex bg-background w-[90%] h-[90%] overflow-scroll sm:w-9/12 sm:h-10/12 relative shadow-lg'>
            <div className='h-full flex-1 pt-20 relative flex justify-center items-center'>
                <div className='w-10/12 h-11/12 flex flex-col gap-4 justify-around'>
                    <form className='flex flex-col gap-3' onSubmit={submit}>
                        <p className='text-2xl sm:text-4xl text-primary font-bold'>
                            Welcome back
                        </p>
                        <p className='text-sm sm:text-lg text-gray-300 mb-8'>
                            Your Adventure awaits
                        </p>
                        <div className='flex flex-col items-start gap-5 w-full text-base'>
                            <div className='flex flex-col gap-5'>

                                <div className='flex flex-col gap-2'>
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className=' border-2 p-2 border-secondary text-sm  h-12 w-64 sm:w-sm rounded-sm'/>
                                    {showEmailError&&(<p className='text-xs text-red-600'>Email cannot be blank</p>)}    
                                </div>

                                <div className='flex flex-col gap-2'>
                                     <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='border-2 p-2 border-secondary text-sm h-12 w-64 sm:w-sm rounded-sm'/>
                                     {showPasswordError&&(<p className='text-xs text-red-600'>password cannot be blank</p>)}    
                                </div>
                                <button type='submit' className={` ${isSubmitting?'bg-secondary':'bg-primary hover:bg-purple-400'}  text-background rounded-sm text-sm p-2 px-4 my-2`}>Sign in
                                </button>


                                {isSubmitting&&(
                                    <div className='w-full flex justify-center items-center'>
                                        <Bounce color={"#ba8fff"} />
                                    </div>
                                )}
                                
                                
                               
                            </div>
                            
                        </div>
                    </form>

                    

                    <p className='text-sm landscape:pb-6 sm:pb-0'>
                       Dont have an account ? <Link href={'/signup'} className='text-primary hover:text-purple-500'>Sign up</Link>
                    </p>
                </div>


            </div>

            <div className='h-full relative overflow-hidden flex-1 hidden xl:flex flex-col justify-center items-center'>
                <Image alt='signup screen' src={'/splash_art/login.webp'} priority sizes='80vw' fill style={{ objectFit: 'cover' }}/>
            </div>

            <div className='absolute flex items-center text-base sm:text-2xl top-0 left-0 text-primary font-semibold'>
                <Image src={'/logo/questlog.png'} alt='questlog logo' width={60} height={60}/>
                Questlog
            </div>
        </div>

    </div>
  )
}