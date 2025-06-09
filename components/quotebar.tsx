'use client'
import { RootState } from '@/store';
import React,{ useCallback, useEffect, useState } from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import {setQuote,setLastFetchTimestamp,clearQuote} from '@/store/quoteSlice/quoteSlice';
import { useDispatch,useSelector } from 'react-redux';


export default function Quotebar() {
    const quoteRedux = useSelector((state:RootState)=>state.dailyQuote.dailyQuote)
    const lastFetchTimestamp = useSelector((state:RootState)=>state.dailyQuote.lastFetchTimestamp)
    const dispatch = useDispatch()
    const [quoteIndex,setQuoteIndex] = useState(0) 
    


    const fetchQuotes = useCallback(async ()=>{
        const url ="/api/getQuoutes"
        const response  = await fetch(url)
        if (!response.ok){
                throw new Error("Failed to get response")
        }
        const data = await response.json()
        if (data.data && data.data!=null && data.data.length>0){
            dispatch(setQuote(data.data))
            dispatch(setLastFetchTimestamp(new Date()))
        }

        console.log(data)

    },[dispatch])

    useEffect(()=>{
            if (quoteRedux){
                if (quoteRedux?.length>0 && quoteRedux != null ){
                    setQuoteIndex(Math.floor(Math.random()*quoteRedux.length))  
                    if (lastFetchTimestamp){
                        const today = new Date();
                        const lastFetchedDate  = new Date(lastFetchTimestamp)
                        const isTimestampToday =  lastFetchedDate.getDate() === today.getDate() && lastFetchedDate.getMonth() === today.getMonth() && lastFetchedDate.getFullYear() === today.getFullYear();
                        if (!isTimestampToday){
                            dispatch(clearQuote())
                            fetchQuotes()
                        }
                    }
                    console.log(quoteRedux[quoteIndex])
                }
                else{
                    fetchQuotes()
                    console.log("fetching quotes")
                }
        }
    },[dispatch,lastFetchTimestamp,quoteRedux,fetchQuotes])




 
  return (
    <div className='w-[80%] min-h-32 gap-2 p-3 py-12 bg-background text-base flex justify-center items-center flex-col text-center'>
        <div className='flex flex-col gap-2'>
            <FaQuoteLeft className='text-2xl'/>
            <p>
                {
                    Array.isArray(quoteRedux) && quoteRedux[quoteIndex]
                    ? `${quoteRedux[quoteIndex].q}` : "Strive not to be a success, but rather to be of value."
                }
            </p>

        </div>
        <div className='flex justify-self-end w-full justify-end p-3'>
            <p className='text-lg font-semibold'>
                {
                    Array.isArray(quoteRedux) && quoteRedux[quoteIndex]
                    ? `${quoteRedux[quoteIndex].a}` : " -- Albert Einstein"
                }
               
            </p>
        </div>

    </div>
  )
}
