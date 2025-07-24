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


export default function Sidebar() {
    const openBarRedux = useSelector((state:RootState)=>state.openBar.openBar)
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
    <div className={`bg-background border-r-2 xl:flex  flex-row xl:flex-col box-content hidden justify-between border-secondary min-h-screen h-full ${openBarRedux?'w-full xl:w-44 2xl:w-60':'xl:w-20 w-full'}  top-0 left-0`}>
        <div className='w-full'>
            <div className='flex justify-between items-center relative border-secondary border-b-2 h-20 px-6'> 
                <div className={`flex gap-4 items-center w-full ${openBarRedux?'justify-start':'justify-center'} `}>
                    <Avatar className='2xl:size-12 size-10'>
                        <AvatarImage/>
                        <AvatarFallback className='bg-background text-foreground'>{userRedux?.name?.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {openBarRedux&&(
                        <p className='2xl:text-lg'>
                            {userRedux?.name?.slice(0,20)}
                            {userRedux?.name?.length>20?"....":""}
                        </p>  
                    )}
                          
                </div>
               
                
            </div>

            <div className='flex flex-row xl:flex-col  w-full p-6 px-0 text-center 2xl:gap-8 gap-4 justify-center items-center '>
                <SidebarItem name = "Todo" link="/" icon = {<GrHomeRounded   />} openSideBar = {openBarRedux}/>
                <SidebarItem name = "My Day" link="/myday" icon = {<CiCalendar />} openSideBar = {openBarRedux}/>
                <SidebarItem name = "Upgrades" link="/upgrades" icon = {<GiUpgrade />} openSideBar = {openBarRedux} />
                <SidebarItem name = "Avatar" link="/avatar" icon ={<RxAvatar />} openSideBar = {openBarRedux} />
                <SidebarItem name = "Rank" link="/rank" icon ={<GiRank1  />} openSideBar = {openBarRedux} />
            </div>
        </div>

        <div className='px-6 mb-8 relative w-16 h-16'>
            <Image alt='logo' src={'/logo/questlog.png'} fill objectFit='contain'/>
        </div>

        
    </div>
  )
}
