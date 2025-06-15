'use client'
import React, { useEffect } from 'react'
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

interface sidebarProps {
    openSideBar:boolean,
    handlechangeBar:()=>void
}


export default function Sidebar(props:sidebarProps) {
    const {openSideBar} = props
    const router = useRouter()

    const userRedux  = useSelector((state:RootState)=>state.user)

    useEffect(()=>{
        if (!userRedux._id || !userRedux.name || !userRedux.email || !userRedux.refreshToken || !userRedux.accessToken)
        {
            router.push('/signin')
            return
        }
    },[router,userRedux])

    console.log(userRedux)
  return (
    <div className={`bg-background border-r-2 flex  flex-col box-content justify-between border-secondary h-screen ${openSideBar?'w-60':'w-20'}  top-0 left-0`}>
        <div className='w-full'>
            <div className='flex justify-between items-center relative border-b-2 h-20 px-6'> 
                <div className={`flex gap-4 items-center w-full ${openSideBar?'justify-start':'justify-center'} `}>
                    <Avatar className='2xl:size-12 size-10'>
                        <AvatarImage/>
                        <AvatarFallback>{userRedux.name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {openSideBar&&(
                        <p className='2xl:text-lg'>
                            {userRedux.name.slice(0,20)}
                            {userRedux.name.length>20?"....":""}
                        </p>  
                    )}
                          
                </div>
               
                
            </div>

            <div className='flex flex-col w-full p-6 px-0 text-center 2xl:gap-8 gap-4 justify-center items-center '>
                <SidebarItem name = "Todo" icon = {<GrHomeRounded  />} active={true} openSideBar = {openSideBar}/>
                <SidebarItem name = "My Day" icon = {<CiCalendar />} active={false} openSideBar = {openSideBar}/>
                <SidebarItem name = "Upgrades" icon = {<GiUpgrade />} active={false} openSideBar = {openSideBar} />
                <SidebarItem name = "Avatar" icon ={<RxAvatar />} active={false} openSideBar = {openSideBar} />
                <SidebarItem name = "Rank" icon ={<GiRank1  />} active={false} openSideBar = {openSideBar} />
            </div>
        </div>

        <div className='px-6 mb-8'>
            <Image alt='logo' src={'/logo/questlog.png'} width={70} height={70}/>
        </div>

        
    </div>
  )
}
