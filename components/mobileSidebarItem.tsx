import React,{ReactNode} from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from 'next/link';




interface sidebarItemProps{
    name:string,
    link:string,
    icon:ReactNode,
}


export default function MobileSidebarItem(prop:sidebarItemProps) {
    const {name,icon,link} = prop
    const pathname = usePathname()
    const subRoute = pathname.split('/')[1] || ""
    const activeLink = "/"+subRoute


  return (
    <Link href={link} className={`${activeLink===link?"text-primary":"text-foreground hover:text-background "} px-3 pr-6 w-44 hover:bg-primary hover:text-background flex gap-3 justify-start py-3 text-base z-50 items-center `}>
        {icon?(icon):(< MdKeyboardDoubleArrowLeft/>)}
        {name}
        
    </Link>
  )
}
