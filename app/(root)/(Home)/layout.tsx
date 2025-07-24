'use client'
import Sidebar from "@/components/sidebar"
import { Provider } from "react-redux"
import {store,persistor} from "@/store"
import { PersistGate } from "redux-persist/integration/react"
import React from 'react'
import MobileRoutes from "@/components/mobileRoutes"

export default function layout({children}:Readonly<{children:React.ReactNode}>) {

  
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            <div className="text-xl w-full flex relative justify-around font-roboto bg-secondary ">
              <div className="bg-secondary max-h-screen xl:flex-row flex-col flex justify-around flex-1">
                
                  <div className="flex-1 h-full flex fixed left-0 flex-col-reverse xl:flex-col items-center justify-between">
                    <Sidebar/>
                  </div>
  
                  <MobileRoutes/>
                  <div className="overflow-y-scroll w-screen max-w-screen overflow-x-hidden">
                    {children}
                  </div>

  
              </div>    
            </div>
  
        </PersistGate>
      </Provider>
      
    )

}

  // return (
  //   <div>
  //       gggg
  //       {children}
        
  //   </div>
  // )