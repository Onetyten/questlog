'use client'
import React,{ReactNode} from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';



interface sidebarItemProps{
    name:string,
    link:string,
    icon:ReactNode,
    openSideBar:boolean
}


export default function SidebarItem(prop:sidebarItemProps) {
    const {name,icon,openSideBar,link} = prop
    const pathname = usePathname()
    const subRoute = pathname.split('/')[1] || ""
    const activeLink = "/"+subRoute

  return (
    <Link href={link} className={`${activeLink===link?"text-primary":"text-foreground"}  flex w-full ${openSideBar?" text-sm gap-6 justify-start pl-8":"justify-center "} items-center`} >
              {icon?(icon):(< MdKeyboardDoubleArrowLeft/>)}
              {openSideBar&&name}          
    </Link>

  )
}
