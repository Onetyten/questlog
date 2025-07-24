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
          
          <div className={` ${openBarRedux?'xl:ml-44 2xl:ml-60':'xl:ml-20'} flex flex-nowrap flex-col xl:flex-row bg-background`}>
            <div className="flex 2xl:flex-3 xl:flex-2 flex-col xl:mr-96 2xl:mr-sm relative">
              <div className="border-b-2 fixed bg-background border-secondary z-30 h-16 sm:h-20 flex w-full pl-5 items-center">
              {openBarRedux?(<BsLayoutSidebarInset className="text-2xl cursor-pointer hidden xl:flex text-gray-500" onClick={handlechangeBar}/>):(<BsLayoutSidebarInsetReverse className="text-2xl text-gray-500 cursor-pointer hidden xl:flex" onClick={handlechangeBar}/>)}
                <div className="flex w-full items-center justify-between mr-10">
                  <p className="ml-6 text-2xl sm:text-3xl text-primary ">
                    To-Do
                  </p>
                </div>

              </div>cursor-pointer
              <div className="overflow-scroll z-0 relative mt-7 md:mt-20 ">
                <TodoBody/>
              </div>
              
            </div>

            <div className="flex-1 w-full xl:w-96 2xl:w-sm h-full xl:fixed z-10 xl:z-40 xl:right-0 relative bg-secondary xl:h-screen flex flex-col-reverse xl:flex-col items-center justify-between "> 

                <Calendar  className="w-full sm:w-xl xl:w-64  2xl:w-full text-xs sm:text-sm bg-secondary p-4 mt-7"/>

                <div className="mb-32 xl:pt-0 pt-20 flex justify-center items-center">
                  <Quotebar/>
                </div>



            </div>


          </div>
    
  )
}
