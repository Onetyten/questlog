'use client'
import Quotebar from "@/components/quotebar"
import { Calendar } from "@/components/ui/calendar"
import {useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import TodoBody from "@/components/todoBody"
import { BsLayoutSidebarInset,BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { ToggleSideBar } from "@/store/sidebarSlice/sidebarSlice"

export default function Home() {

  const dispatch = useDispatch()
  const openBarRedux = useSelector((state:RootState)=>state.openBar.openBar)



const handlechangeBar = () => {
    dispatch(ToggleSideBar())
}


  return (
          <div className="flex flex-nowrap flex-col xl:flex-row bg-background w-full">

          
            <div className="flex 2xl:flex-3 xl:flex-2 flex-col">
              <div className="border-b-2 border-secondary min-h-20 flex pl-5 items-center">
              {openBarRedux?(<BsLayoutSidebarInset className="text-2xl hidden xl:flex text-gray-500" onClick={handlechangeBar}/>):(<BsLayoutSidebarInsetReverse className="text-2xl text-gray-500 hidden xl:flex" onClick={handlechangeBar}/>)}
                <div className="flex w-full items-center justify-between mr-10">
                  <p className="ml-6 text-3xl text-primary ">
                    To-Do
                  </p>
                  
                  

                </div>

              </div>
              <TodoBody/>
            </div>

            <div className="flex-1 w-full xl:max-w-64 2xl:max-w-full h-full flex flex-col-reverse xl:flex-col items-center bg-secondary justify-between "> 
              <div className="xl:min-h-screen flex flex-col-reverse xl:flex-col items-center justify-between">
                <Calendar  className="w-full sm:w-xl xl:w-64  2xl:w-full text-xs sm:text-sm 2xl:text-base bg-secondary p-4 mt-7"/>

                <div className="mb-32 xl:pt-0 pt-20 flex justify-center items-center">
                  <Quotebar/>
                </div>
              </div>

              <div className="w-full xl:block flex-1">

              </div>

            </div>


          </div>
    
  )
}
