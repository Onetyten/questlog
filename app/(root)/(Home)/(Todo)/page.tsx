'use client'
import Quotebar from "@/components/quotebar"
import { Calendar } from "@/components/ui/calendar"
import TodoBody from "@/components/todoBody"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export default function Home() {
const openBarRedux = useSelector((state:RootState)=>state.openBar.openBar)    






  return (
          
          <div className={` ${openBarRedux?'xl:ml-44 2xl:ml-60':'xl:ml-20'} flex flex-nowrap flex-col xl:flex-row bg-background`}>
            <div className="flex 2xl:flex-3 xl:flex-2 flex-col xl:mr-96 2xl:mr-sm relative">
              <div className="overflow-scroll z-0 relative mt-14  ">
                <TodoBody/>
              </div>
              
            </div>

            <div className="flex-1 w-full xl:w-96 2xl:w-sm h-full xl:fixed z-10 xl:z-40 xl:right-0 relative bg-secondary xl:h-screen flex flex-col-reverse xl:flex-col items-center justify-between "> 

                <Calendar  className="w-full sm:w-xl xl:w-64  2xl:w-full text-xs sm:text-sm bg-secondary p-4 mt-7"/>

                <div className="mb-32 xl:pt-0 pt-20 flex justify-center w-full items-center">
                  <Quotebar/>
                </div>



            </div>


          </div>
    
  )
}
