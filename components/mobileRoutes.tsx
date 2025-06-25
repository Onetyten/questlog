'use client'
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import RouteHamburger from "@/components/routeHamburger"


export default function MobileRoutes() {
    const [showMobileHamburger,setShowMobileHamburger] = useState(false)

  return (
    <div className="xl:hidden block absolute right-8 top-6 ">
        <GiHamburgerMenu className="text-3xl" onClick={()=>setShowMobileHamburger(!showMobileHamburger)} />
        {showMobileHamburger&&(
            <RouteHamburger setShowMobileHamburger={setShowMobileHamburger} />
        )}
    </div>
  )
}
