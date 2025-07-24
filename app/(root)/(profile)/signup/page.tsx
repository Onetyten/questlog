/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";


export default function page() {

    const router = useRouter()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const [showNameError,setShowNameError] = useState(false)
    const [showEmailError,setShowEmailError] = useState(false)
    const [showPasswordError,setShowPasswordError] = useState(false)
    const [showPasswordLengthError,setShowPasswordLengthError] = useState(false)
    const [isSubmitting,setIsSubmitting] = useState(false)

    async function submit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!name || name.trim().length<1){
            setShowNameError(true)
            toast.warn("Name cannot be blank")
        }
        else
        {
            setShowNameError(false)
        }

        if (!email || email.trim().length<1){
            setShowEmailError(true)
            toast.warn("Email cannot be blank")
        }
        else
        {
            setShowEmailError(false)
        }
        if (!password || password.trim().length<1){
            setShowPasswordError(true)
            toast.warn("Password cannot be blank")
        }
        else
        {
            setShowPasswordError(false)
            if (password.trim().length<8){
                setShowPasswordLengthError(true)
                toast.warn("Password length must be 8 characters or more")
            }
            else
            {
                setShowPasswordLengthError(false)
            }
        }

        if (name && name.trim().length>0 && email && email.trim().length>0 && password && password.trim().length>7 ){
            try
            {
                if(isSubmitting) return
                setIsSubmitting(true)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/signup`, { name, email, password});

                if (!res.data.success) {
                    console.log("Signup failed:", res.data?.message || "Unknown error");
                    return toast.error(res.data?.message || "Something went wrong");
                } 
                if (res.data.user.name && res.data.user.email && res.data.user._id)
                {
                    toast.success(`Signup successful welcome ${res.data.user.name}`)
                    console.log(res.data.user)
                    router.push('/signin')
                } 
            }
            catch(error)
            {
                if (axios.isAxiosError(error)){
                    toast.error(error.response?.data?.message || "Server error. Please try again.");
                }
                else
                {
                    toast.error("Something went wrong. Please try again.");
                }
            }
            finally{
                setIsSubmitting(false)
            } 
        }
     
        
        
        
    }

  return (
    <div className='bg-secondary dark:bg-foreground h-screen w-full flex justify-center items-center '>
        <div className='flex bg-background relative w-[90%] h-[90%] overflow-scroll sm:w-9/12 sm:h-10/12 shadow-lg'>
            <div className='h-full flex-1 pt-20 relative flex justify-center items-center'>
                <div className='w-10/12 h-11/12 flex flex-col gap-4 justify-around'>
                    <form onSubmit={submit} className='flex flex-col gap-3'>
                        <p className='text-2xl sm:text-4xl text-primary font-bold'>
                            Gamify your tasks
                        </p>
                        <p className=' text-sm sm:text-lg text-gray-300 mb-8'>
                            Welcome to questlog
                        </p>
                        <div className='flex flex-col items-start gap-5 w-full text-base'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Username' className=' border-2 p-2 border-secondary text-sm  h-12 w-64 sm:w-sm rounded-sm' />
                                    {showNameError&&(<p className='text-xs text-red-600'>Name cannot be blank</p>)}    
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className=' border-2 p-2 border-secondary text-sm  h-12 w-64 sm:w-sm rounded-sm'/>
                                    {showEmailError&&( <p className='text-xs text-red-600'>Email cannot be blank</p>)}
                                </div>

                                <div className='flex flex-col gap-2'>
                                     <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'  className=' border-2 p-2 border-secondary text-sm  h-12 w-64 sm:w-sm rounded-sm'/>
                                      {showPasswordError&&(<p className='text-xs text-red-600'>Password cannot be blank</p>)}
                                      {showPasswordLengthError&&(<p className='text-xs text-red-600'>Password length must be 8 characters or more</p>)}
                                </div>

                                <button type='submit' className={` ${isSubmitting?'bg-secondary':'bg-primary hover:bg-purple-400'}  text-background rounded-sm text-sm p-2 px-4 my-2`}>Sign up</button>

                                {isSubmitting&&(
                                    <div className='w-full flex justify-center items-center'>
                                        <Bounce color={"#ba8fff"} />
                                    </div>
                                )}
                                
                                
                               
                            </div>
                            
                        </div>
                    </form>

                    

                    <p className='text-sm landscape:pb-6 sm:pb-0'>
                       Already have an account ? <Link href={'/signin'} className='text-primary hover:text-purple-500'>Sign in</Link>
                    </p>
                </div>


            </div>

            <div className='h-full hidden relative overflow-hidden flex-1 xl:flex flex-col justify-center items-center'>
                <Image alt='signup screen' src={'/splash_art/signup.webp'} fill style={{ objectFit: 'cover' }}/>
            </div>


            <div className='absolute flex items-center text-base sm:text-2xl top-0 left-0 text-primary font-semibold'>
                            <Image src={'/logo/questlog.png'} alt='questlog logo' width={60} height={60}/>
                            Questlog
            </div>


        </div>

    </div>
  )
}
