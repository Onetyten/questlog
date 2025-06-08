import React,{ReactNode} from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface sidebarItemProps{
    name:string,
    icon:ReactNode,
    active:boolean,
}


export default function SidebarItem(prop:sidebarItemProps) {
    const {name,icon,active} = prop
  return (
    <div className={`${active?"text-primary":"text-foreground"} flex w-full gap-6 text-lg items-center`}>
        {icon?(icon):(< MdKeyboardDoubleArrowLeft/>)}
        {name}
    </div>
  )
}
