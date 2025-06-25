/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/userSlice/userSlice'


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
    const [confirmPassword,setConfirmPassword] = useState('')

    const [showEmailError,setShowEmailError] = useState(false)
    const [showPasswordError,setShowPasswordError] = useState(false)
    const [showPasswordMatchError,setShowPasswordMatchError] = useState(false)
    

    const submit = async () => {
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
        if (!confirmPassword || confirmPassword !== password){
            setShowPasswordMatchError(true)
        }
        else
        {
            setShowPasswordMatchError(false)
        }

        if (email && email.trim().length>0 && password && password.trim().length>7 && confirmPassword && confirmPassword === password)
        {   
           try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/signin`, { email, password});

                if (!res.data.success) {
                    alert(res.data?.message || "Something went wrong");
                    return 
                }

                if (res.data.user.id && res.data.user.name && res.data.user.email && res.data.token && res.data.refreshToken?.token)
                {
                    alert(`Login successful welcome ${res.data.user.name}`)
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
           } catch (error) {
            
                if (axios.isAxiosError(error)) {
                    alert(error.response?.data?.message || "Server error. Please try again.");
                } 
                else {
                    alert("Something went wrong. Please try again.");
                }
           }    


            
        }



    }


  return (
    <div className='bg-secondary h-screen w-full flex justify-center items-center '>
        <div className='flex bg-background w-[90%] h-[90%] sm:w-9/12 sm:h-10/12 relative shadow-lg'>
            <div className='h-full flex-1 relative flex justify-center items-center'>
                <div className='w-10/12 h-11/12 flex flex-col justify-around'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-2xl sm:text-4xl text-primary font-bold'>
                            Welcome back
                        </p>
                        <p className='text-sm sm:text-lg text-gray-300 mb-8'>
                            Your Adventure awaits
                        </p>
                        <div className='flex flex-col items-start gap-5 w-full text-base'>
                            <div className='flex flex-col gap-5'>

                                <div>
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='border-2 p-3 border-secondary  h-12 sm:h-14 w-64 sm:w-sm rounded-md'/>
                                    {showEmailError&&(<p className='text-sm text-red-600'>Email cannot be blank</p>)}    
                                </div>

                                <div>
                                     <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='border-2 p-3 border-secondary  h-12 sm:h-14 w-64 sm:w-sm rounded-md'/>
                                     {showPasswordError&&(<p className='text-sm text-red-600'>password cannot be blank</p>)}    
                                </div>

                                <div>
                                     <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Confirm Password' className='border-2 p-3 border-secondary  h-12 sm:h-14 w-64 sm:w-sm rounded-md'/>
                                     {showPasswordMatchError&&(<p className='text-sm text-red-600'>Passwords do not match</p>)}    
                                </div>
                                
                                
                               
                            </div>
                            <button onClick={submit} className='bg-primary text-background px-8 h-12 sm:h-14 text-sm sm:text-base hover:bg-purple-500 rounded-md'>Sign in</button>
                        </div>
                    </div>

                    

                    <p className='text-sm sm:text-base'>
                       Dont have an account ? <Link href={'/signup'} className='text-primary hover:text-purple-500'>Sign up</Link>
                    </p>
                </div>


            </div>

            <div className='h-full relative overflow-hidden bg-amber-100 flex-1 hidden xl:flex flex-col justify-center items-center'>
                <Image alt='signup screen' src={'/splash_art/login.webp'} priority sizes='80vw' fill style={{ objectFit: 'cover' }}/>
            </div>

            <div className='absolute flex items-center text-base sm:text-2xl top-0 left-0 text-primary font-semibold'>
                <Image src={'/logo/questlog.png'} alt='questlog logo' width={70} height={70}/>
                Questlog
            </div>
        </div>

    </div>
  )
}