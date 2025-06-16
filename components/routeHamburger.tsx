import React from 'react'
import MobileSidebarItem from './mobileSidebarItem';
import { GrHomeRounded } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { GiUpgrade,GiRank1  } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import OutsideClickHandler from 'react-outside-click-handler';

interface propType{
    setShowMobileHamburger:React.Dispatch<React.SetStateAction<boolean>>
}

export default function RouteHamburger(props:propType) {
    const {setShowMobileHamburger} = props
  return (
    <OutsideClickHandler  onOutsideClick={() => {setShowMobileHamburger(false) }}>
        <div className='absolute right-14 top-14 bg-secondary py-5 text-sm flex flex-col z-20 rounded-md'>
            <MobileSidebarItem name = "Todo" icon = {<GrHomeRounded  />} active={true} />
            <MobileSidebarItem name = "My Day" icon = {<CiCalendar />} active={false} />
            <MobileSidebarItem name = "Upgrades" icon = {<GiUpgrade />} active={false}  />
            <MobileSidebarItem name = "Avatar" icon ={<RxAvatar />} active={false}  />
            <MobileSidebarItem name = "Rank" icon ={<GiRank1  />} active={false}  />
        </div>
    </OutsideClickHandler>

  )
}
