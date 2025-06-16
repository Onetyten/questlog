import React,{ReactNode} from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface sidebarItemProps{
    name:string,
    icon:ReactNode,
    active:boolean,
}


export default function MobileSidebarItem(prop:sidebarItemProps) {
    const {name,icon,active} = prop
  return (
    <div className={`${active?"text-primary":"text-foreground hover:text-background "} px-3 pr-6 w-44 hover:bg-primary hover:text-background flex gap-3 justify-start py-3 text-base z-50 items-center `}>
        {icon?(icon):(< MdKeyboardDoubleArrowLeft/>)}
        {name}
        
    </div>
  )
}
