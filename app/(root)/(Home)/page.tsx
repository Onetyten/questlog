'use client'
import Quotebar from "@/components/quotebar"
import Sidebar from "@/components/sidebar"
import { Calendar } from "@/components/ui/calendar"
import { Provider } from "react-redux"
import {store,persistor} from "@/store"
import { PersistGate } from "redux-persist/integration/react"
import TodoBody from "@/components/todoBody"
import { useState } from "react"
import { BsLayoutSidebarInset,BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import RouteHamburger from "@/components/routeHamburger"

export default function Home() {

const [showMobileHamburger,setShowMobileHamburger] = useState(false)
const [openSideBar,setOpenSideBar] = useState(true)
const handlechangeBar = () => {
    setOpenSideBar(!openSideBar)
    console.log(openSideBar)
}


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <div className="text-xl w-full h-screen flex relative justify-around font-roboto bg-secondary ">
            <div className="bg-secondary xl:flex-row flex-col flex justify-around flex-1">
                <Sidebar openSideBar={openSideBar} handlechangeBar={handlechangeBar}/>
                <div className="flex flex-nowrap flex-col xl:flex-row w-full bg-background xl:overflow-scroll">
                  

                  <div className="flex 2xl:flex-3 xl:flex-2 flex-col">
                    <div className="border-b-2 border-secondary min-h-20 flex pl-5 items-center">
                    {openSideBar?(<BsLayoutSidebarInset className="text-2xl hidden xl:flex text-gray-500" onClick={handlechangeBar}/>):(<BsLayoutSidebarInsetReverse className="text-2xl text-gray-500 hidden xl:flex" onClick={handlechangeBar}/>)}
                      <div className="flex w-full items-center justify-between mr-10">
                        <p className="ml-6 text-3xl text-primary ">
                          To-Do
                        </p>
                        <div>
                          <GiHamburgerMenu onClick={()=>setShowMobileHamburger(!showMobileHamburger)} />
                          {showMobileHamburger&&(
                            <RouteHamburger setShowMobileHamburger={setShowMobileHamburger} />
                          )}
                        </div>
                        

                      </div>

                    </div>
                    <TodoBody/>
                  </div>

                  <div className="flex-1 w-full xl:h-screen flex flex-col-reverse xl:flex-col items-center bg-secondary justify-between "> 
                    <Calendar  className="w-xl xl:w-full text-base bg-secondary p-4 mt-7"/>

                    <div className="mb-32 xl:pt-0 pt-20 w-full flex justify-center items-center">
                      <Quotebar/>
                    </div>

                  </div>


                </div>

            </div>    
          </div>

      </PersistGate>
    </Provider>
    
  )
}
