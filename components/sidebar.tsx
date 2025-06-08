import React from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Sidebar() {
  return (
    <div className="bg-background border-r-2 flex flex-col border-secondary h-screen fixed w-100 top-0 left-0">
        <div className='flex justify-between items-center border-b-2 h-20 px-6'> 
            <div className='flex gap-3 items-center'>
                <Avatar className='size-12'>
                    <AvatarImage/>
                    <AvatarFallback>EY</AvatarFallback>
                </Avatar>
                <p>
                    Eren Yeager
                </p>        
            </div>
            <MdKeyboardDoubleArrowLeft className='text-3xl text-gray-500' />
        </div>

        <div>

        </div>
    </div>
  )
}
