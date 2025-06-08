'use client'
import Quotebar from "@/components/quotebar"
import Sidebar from "@/components/sidebar"
import { Calendar } from "@/components/ui/calendar"
import { Provider } from "react-redux"
import {store,persistor} from "@/store"
import { PersistGate } from "redux-persist/integration/react"



export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <div className="text-xl w-full h-screen flex absolute justify-around font-roboto bg-secondary ">
            <div className="bg-secondary flex justify-around flex-1">
                <Sidebar/>
                <div className="flex-3 flex flex-col w-full bg-background overflow-scroll">
                  <div className="border-b-2 border-secondary h-20 flex items-center">
                    <p className="ml-6 text-3xl text-primary ">
                      To-Do
                    </p>
                  </div>
                  <div>
                    
                  </div>
                </div>

                <div className="flex-1 w-full h-screen flex flex-col items-center justify-between "> 
                  <Calendar  className="w-full text-base bg-secondary p-4 mt-7"/>

                  <div className="mb-60 w-full flex justify-center items-center">
                    <Quotebar/>
                  </div>

                </div>
            </div>    
          </div>

      </PersistGate>
    </Provider>
    
  )
}
