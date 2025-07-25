'use client'
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import RouteHamburger from "@/components/routeHamburger"


export default function MobileRoutes() {
    const [showMobileHamburger,setShowMobileHamburger] = useState(false)

  return (
    <div className="xl:hidden block absolute z-40 right-8 top-4 sm:top-6 ">
        <GiHamburgerMenu className="text-xl sm:text-3xl" onClick={()=>setShowMobileHamburger(!showMobileHamburger)} />
        {showMobileHamburger&&(

            <RouteHamburger setShowMobileHamburger={setShowMobileHamburger} />
        )}
    </div>
  )
}
