'use client'
import React, { useState } from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { GiUpgrade,GiRank1  } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import SidebarItem from './sidebarItem';
import Image from 'next/image';
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from '@/store';

export default function Sidebar() {
    const router = useRouter()

    const userRedux  = useSelector((state:RootState)=>state.user)
    if (!userRedux._id || !userRedux.name || !userRedux.email || !userRedux.refreshToken || !userRedux.accessToken)
    {
        router.push('/signin')
        return
    }
    console.log(userRedux)
  return (
    <div className="bg-background border-r-2 flex flex-1  flex-col box-content justify-between border-secondary h-screen w-100 top-0 left-0">
        <div>
            <div className='flex justify-between items-center border-b-2 h-20 px-6'> 
                <div className='flex gap-4 items-center'>
                    <Avatar className='size-12'>
                        <AvatarImage/>
                        <AvatarFallback>{userRedux.name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='text-lg'>
                        {userRedux.name}
                    </p>        
                </div>
                <MdKeyboardDoubleArrowLeft className='text-3xl text-gray-500' />
            </div>

            <div className='flex flex-col w-full p-6 gap-8 justify-center'>
                <SidebarItem name = "Todo" icon = {<GrHomeRounded/>} active={true}/>
                <SidebarItem name = "My Day" icon = {<CiCalendar/>} active={false}/>
                <SidebarItem name = "Upgrades" icon = {<GiUpgrade/>} active={false}/>
                <SidebarItem name = "Avatar" icon ={<RxAvatar />} active={false}/>
                <SidebarItem name = "Rank" icon ={<GiRank1 />} active={false}/>
            </div>
        </div>

        <div className='px-6 mb-8'>
            <Image alt='logo' src={'/logo/questlog.png'} width={70} height={70}/>
        </div>

        
    </div>
  )
}
