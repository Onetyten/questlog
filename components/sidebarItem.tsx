import React,{ReactNode} from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface sidebarItemProps{
    name:string,
    icon:ReactNode,
    active:boolean,
    openSideBar:boolean
}


export default function SidebarItem(prop:sidebarItemProps) {
    const {name,icon,active,openSideBar} = prop
  return (
    <div className={`${active?"text-primary":"text-foreground"}  flex w-full ${openSideBar?"text-base gap-6 justify-start pl-8":"justify-center "} items-center`}>
        {icon?(icon):(< MdKeyboardDoubleArrowLeft/>)}
        {openSideBar&&name}
        
    </div>
  )
}
