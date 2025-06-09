import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return (
    <div className='bg-secondary h-screen w-full flex justify-center items-center '>
        <div className='flex bg-background w-9/12 h-10/12 relative shadow-lg'>
            <div className='h-full flex-1 relative flex justify-center items-center'>
                <div className='w-10/12 h-11/12 flex flex-col justify-around'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-4xl text-primary font-bold'>
                            Welcome back
                        </p>
                        <p className='text-lg text-gray-300 mb-8'>
                            Your Adventure awaits
                        </p>
                        <div className='flex flex-col items-start gap-5 w-full text-base'>
                            <div className='flex flex-col gap-5'>

                                <div>
                                    <input type="email" placeholder='Email' className='border-2 p-3 border-secondary w-sm rounded-md'/>
                                </div>

                                <div>
                                     <input type="password" placeholder='Password' className='border-2 p-3 border-secondary w-sm rounded-md'/>
                                </div>

                                <div>
                                     <input type="password" placeholder='Confirm Password' className='border-2 p-3 border-secondary w-sm rounded-md'/>
                                </div>
                                
                                
                               
                            </div>
                            <button className='bg-primary text-background p-3 px-8 hover:bg-purple-500 rounded-md'>Sign in</button>
                        </div>
                    </div>

                    

                    <p>
                       Dont have an account ? <Link href={'/signup'} className='text-primary hover:text-purple-500'>Sign up</Link>
                    </p>
                </div>


            </div>

            <div className='h-full relative overflow-hidden bg-amber-100 flex-1 flex flex-col justify-center items-center'>
                <Image alt='signup screen' src={'/splash_art/login.webp'} fill style={{ objectFit: 'cover' }}/>
            </div>

            <div className='absolute flex items-center text-2xl top-0 left-0 text-primary font-semibold'>
                <Image src={'/logo/questlog.png'} alt='questlog logo' width={70} height={70}/>
                Questlog
            </div>
        </div>

    </div>
  )
}