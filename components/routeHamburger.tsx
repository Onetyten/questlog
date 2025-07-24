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
        <div className='absolute right-3 top-3 bg-secondary shadow-lg text-sm flex flex-col z-20 rounded-sm'>
            <MobileSidebarItem link="/"  name = "Todo" icon = {<GrHomeRounded  />}/>
            <MobileSidebarItem link="myday"  name = "My Day" icon = {<CiCalendar />}/>
            <MobileSidebarItem link="/upgrades"  name = "Upgrades" icon = {<GiUpgrade />}/>
            <MobileSidebarItem link="/avatar"  name = "Avatar" icon ={<RxAvatar />} />
            <MobileSidebarItem link="/rank"  name = "Rank" icon ={<GiRank1  />}/>
        </div>
    </OutsideClickHandler>

  )
}
