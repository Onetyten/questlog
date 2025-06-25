import React from 'react'
import { IoIosClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/showChildModalSlice/showChildModalSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ModalListItem from './modalListItem';

export default function ChildTaskModal() {
    const showChildModal = useSelector((state:RootState)=>state.showChildModal.showChildModal)
    const modalRedux_id = useSelector((state:RootState)=>state.modalId.modalId)
    const todoRedux = useSelector((state:RootState)=>state.todo)
    const dispatch = useDispatch()
    const childrenTodo = todoRedux.filter((todo)=>todo.parent_id == modalRedux_id)
    const unCompletedTodos = childrenTodo.filter((todo)=>todo.status !== "completed" )
    const parentTodo = todoRedux.find((todo)=>todo._id == modalRedux_id)

  return (
    <div>
        {showChildModal && (
            <div className="fixed  z-60 -top-1 left-0 w-full h-screen flex justify-center items-center flex-col gap-6 no-scrollbar ">
                <div className='w-full bg-background relative h-full flex flex-col justify-center items-center overflow-scroll'>
                    
                    <IoIosClose onClick={()=>{dispatch(closeModal())}} className='absolute top-0 left-0 text-5xl hover:text-primary cursor-pointer' />
                    <p className='text-xl text-primary'> {parentTodo?.title}</p> 
                    <div className=' flex flex-col justify-start gap-6 w-[90%] xl:w-[60%] 2xl:w-[40%] h-[90%] overflow-scroll py-16 pb-32 sm:p-16'>
                        {unCompletedTodos.map((item)=>{
                        return(
                            <div key={item._id}>
                                <ModalListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id} parent_id={item.parent_id} level = {0} />
                            </div>
                            
                        )
                        })}    
                
                    </div>
                </div>
                <div className='bg-background w-full h-8 absolute -bottom-3 z-50'>
                    
                </div>

            </div>
        )}
    </div>
  )
}
