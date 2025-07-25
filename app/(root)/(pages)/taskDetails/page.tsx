'use client'
import React from 'react'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ListItem from '@/components/listItem';
import { useRouter } from 'next/navigation';


export default function TaskDetails() {
  const modalRedux_id = useSelector((state:RootState)=>state.modalId.modalId)
  const todoRedux = useSelector((state:RootState)=>state.todo)

  const childrenTodo = todoRedux.filter((todo)=>todo.parent_id == modalRedux_id)
  const unCompletedTodos = childrenTodo.filter((todo)=>todo.status !== "completed" )
  const parentTodo = todoRedux.find((todo)=>todo._id == modalRedux_id)

  const router = useRouter()

  function BackToHome(){
      router.back()
  }






  return (
    <div className="no-scrollbr w-full h-screen flex justify-center items-center flex-col gap-6 no-scrollbar ">
        <div className='w-full bg-background relative h-full flex flex-col justify-center items-center overflow-scroll no-scrollbar'>
            <div className='w-full flex-col flex justify-center items-center border-b-2 border-secondary'>
                <div className='w-full flex justify-start italic'>
                      <HiArrowNarrowLeft onClick={BackToHome} className=' ml-3 mt-3 top-1 left-0 text-2xl hover:text-primary cursor-pointer' />
                </div>
                
                <p className='text-base xl:text-xl 2xl:text-2xl text-primary py-3 xl:py-6'> {parentTodo?.title}</p> 
            </div>

            <div className=' flex flex-col justify-start gap-6 w-[90%] xl:w-[60%] 2xl:w-[40%] h-[90%] no-scrollbar overflow-scroll py-16 pb-32 sm:p-16'>
                {unCompletedTodos.map((item)=>{
                return(
                    <div key={item._id}>
                        <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id} parent_id={item.parent_id}  level = {0}/>
                    </div>
                    
                )
                })}    
        
            </div>
        </div>
        <div className='bg-background w-full h-8 absolute -bottom-3 z-50'>
            
        </div>

    </div>
  )
}
