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

export default function Home() {

const [openSideBar,setOpenSideBar] = useState(true)
const handlechangeBar = () => {
    setOpenSideBar(!openSideBar)
    console.log(openSideBar)
}


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <div className="text-xl w-full h-screen flex absolute justify-around font-roboto bg-secondary ">
            <div className="bg-secondary xl:flex-row flex-col flex justify-around flex-1">
                <Sidebar openSideBar={openSideBar} handlechangeBar={handlechangeBar}/>
                <div className="flex-3 flex flex-col w-full bg-background xl:overflow-scroll">
                  <div className="border-b-2 border-secondary min-h-20 flex pl-5 items-center">
                    {openSideBar?(<BsLayoutSidebarInset className="text-2xl text-gray-500" onClick={handlechangeBar}/>):(<BsLayoutSidebarInsetReverse className="text-2xl text-gray-500" onClick={handlechangeBar}/>)}
                    <p className="ml-6 text-3xl text-primary ">
                      To-Do
                    </p>
                  </div>
                  <TodoBody/>
                </div>

                <div className="flex-1 w-full xl:h-screen flex flex-col items-center bg-secondary justify-between "> 
                  <Calendar  className="w-full text-base hidden xl:block bg-secondary p-4 mt-7"/>

                  <div className="mb-32 w-full flex justify-center items-center">
                    <Quotebar/>
                  </div>

                </div>
            </div>    
          </div>

      </PersistGate>
    </Provider>
    
  )
}
