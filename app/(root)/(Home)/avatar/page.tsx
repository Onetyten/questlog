'use client'
import Image from 'next/image'
import React from 'react'

export default function Avatar() {


  return (
     <div className=" bg-background overflow-y-scroll">
            <div className='min-h-screen flex justify-center items-center flex-col gap-5 w-full'>
                <div className='text-2xl md:text-4xl xl:text-5xl text-secondary'>
                    In development
                </div>
                <div className='relative size-48 md:size-60 xl:size-72'>
                    <Image src={'/logo/DevAtWork.webp'} alt='Men at work' className='object-contain' fill/>
                </div>
            </div>

    </div>
  )
}
