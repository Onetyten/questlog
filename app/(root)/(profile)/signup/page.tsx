/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const [showNameError,setShowNameError] = useState(false)
    const [showEmailError,setShowEmailError] = useState(false)
    const [showPasswordError,setShowPasswordError] = useState(false)
    const [showPasswordLengthError,setShowPasswordLengthError] = useState(false)

    function submit() {

        
        console.log(name,email, password)
        
    }

  return (
    <div className='bg-secondary h-screen w-full flex justify-center items-center '>
        <div className='flex bg-background relative w-9/12 h-10/12 shadow-lg'>
            <div className='h-full flex-1 relative flex justify-center items-center'>
                <div className='w-10/12 h-11/12 flex flex-col justify-around'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-4xl text-primary font-bold'>
                            Gamify your tasks
                        </p>
                        <p className='text-lg text-gray-300 mb-8'>
                            Welcome to questlog
                        </p>
                        <div className='flex flex-col items-start gap-5 w-full text-base'>
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Username' className='border-2 p-3 border-secondary w-sm rounded-md' />
                                    {showNameError&&(<p className='text-sm text-red-600'>Name cannot be blank</p>)}    
                                </div>

                                <div>
                                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='border-2 p-3 border-secondary w-sm rounded-md'/>
                                    {showEmailError&&( <p className='text-sm text-red-600'>Email cannot be blank</p>)}
                                </div>

                                <div>
                                     <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'  className='border-2 p-3 border-secondary w-sm rounded-md'/>
                                      {showPasswordError&&(<p className='text-sm text-red-600'>Password cannot be blank</p>)}
                                      {showPasswordLengthError&&(<p className='text-sm text-red-600'>Password length must be 8 characters or more</p>)}
                                </div>
                                
                                
                               
                            </div>
                            <button className='bg-primary text-background p-3 px-8 hover:bg-purple-500 rounded-md' onClick={()=>{submit()}}>Sign up</button>
                        </div>
                    </div>

                    

                    <p>
                       Already have an account ? <Link href={'/signin'} className='text-primary hover:text-purple-500'>Sign in</Link>
                    </p>
                </div>


            </div>

            <div className='h-full relative overflow-hidden bg-amber-100 flex-1 flex flex-col justify-center items-center'>
                <Image alt='signup screen' src={'/splash_art/signup.webp'} fill style={{ objectFit: 'cover' }}/>
            </div>
            <div className='absolute flex items-center text-2xl top-0 left-0 text-primary font-semibold'>
                <Image src={'/logo/questlog.png'} alt='questlog logo' width={70} height={70}/>
                Questlog
            </div>
        </div>

    </div>
  )
}
