'use client'
import api from '@/lib/api'
import { RootState } from '@/store'
import { addTodo, deleteTodo, replaceTodo } from '@/store/todoSlice/todoSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'


interface InputType{
    parent_id:string|null,
}

export default function InputTodo(prop:InputType) {
    const {parent_id} = prop
    const dispatch = useDispatch()
    const userData = useSelector((state:RootState)=>state.user)
    // const taskRedux = useSelector((state:RootState)=>state.todo)

    const [title,setTitle] = useState('')
    const [dueDate,setDuedate] = useState(new Date())
    const statusOptions = [
        {value:'pending', label:'Pending'},
        {value:'ongoing', label:'Ongoing'},
    ]
    const priorityOptions = [
        {value:'low', label:'Low'},
        {value:'medium', label:'Medium'},
        {value:'high', label:'High'}
    ]
    const defaultPriority = priorityOptions.find(prority=>prority.value == 'low')
    const defaultStatusOption = statusOptions.find(option=>option.value == 'pending')
    const [showTaskError,setShowTaskError] = useState(false) 

    const [selectedStatus,setSelectedStatus] = useState(defaultStatusOption||null)
    const [selectedPriority,setSelectedPriority] = useState(defaultPriority||null)


    async function submitTask () {
        
        if (title.length>0){
            setShowTaskError(false)
            const newTodo={
                user_id: userData._id,
                parent_id: parent_id,
                title: title,
                status:selectedStatus?.value ?? null,
                priority:selectedPriority?.value ?? null,
                dueDate:dueDate.toISOString(),
                dateCreated:null,
            }
            const action = addTodo(newTodo)
            dispatch(action)
            const TempId = action.payload._id
            try {
                
                const res = await api.post('/api/task/add', {title,status:selectedStatus?.value,priority:selectedPriority?.value,dueDate:dueDate.toISOString(),parent_id: parent_id})
                if (res.data.success == false){
                    dispatch(deleteTodo(action.payload))
                    return alert ("Add task operation failed")
                    
                }
                else
                {
                    const savedTask = res.data.data
                    console.log(savedTask)
                    dispatch(replaceTodo({ Temp_id: TempId, newTodo: savedTask }))
                }
            }
            catch (error) {
                console.log(error)    
            }
            
            
        }
        else
        {
            setShowTaskError(true)
        }
    }

  return (
        <div className=' border-2 mb-9 border-secondary rounded-lg flex 2xl:pl-12 pl-4 2xl:p-6 p-2 w-full'>

            <div className='flex flex-col gap-4 sm:gap-1 items-start'>

                <div className='flex gap-1 flex-col'>
                    <input type="text" placeholder='Add new task' className='border-2 2xl:text-md text-xs border-secondary 2xl:p-3 p-2 w-full 2xl:rounded-lg rounded-sm' onChange={(e)=>{setTitle(e.target.value)}} />
                    {showTaskError&& <p className='text-sm text-red-600'>Add your task description</p>}
                    
                </div>

                <div className='flex flex-col sm:flex-row 2xl:gap-6 gap-6 sm:gap-2 items-start mt-3 sm:items-center'>
                    <div className='flex 2xl:text-md text-xs items-center gap-2'>
                        DueDate :
                        {/* <CiCalendar className='text-2xl' /> */}
                        <input type="date" min={new Date().toISOString().split("T")[0]} name="" id="" className='size-5' onChange={(e)=>{
                            const todaysDate = new Date()
                            const changedDate = new Date(e.target.value)

                            todaysDate.setHours(0,0,0,0)
                            changedDate.setHours(0,0,0,0)
                            
                            if (changedDate>=todaysDate){
                                setDuedate(new Date(e.target.value))
                            }
                            else{
                                alert("Your due date cant be in the past")
                            }
                            
                        }}/>
                        <p className='2xl:text-md text-xs'>
                           {dueDate.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})} 
                        </p>

                        

                    </div>

                    <div className=' sm:p-2 sm:px-6 2xl:text-md text-xs rounded-lg'>
                        <div className='flex items-center gap-2 relative'>
                            <p>
                                Completion status :
                            </p>
                            <Select options={statusOptions} defaultValue={selectedStatus} onChange={setSelectedStatus }/>
                        </div>
                    </div>

                    
                    
                </div>

                <div className='rounded-md flex 2xl:text-md text-xs items-center gap-3'>
                    <p>
                        Priority :
                    </p>
                    <Select options={priorityOptions} defaultValue={selectedPriority} onChange={setSelectedPriority }/>
                </div>

                <div className='2xl:text-md text-xs'>
                    <div onClick={()=>{submitTask()}} className='p-2 px-4 mt-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2'>
                        Add Task 
                    </div>
                </div>
            </div>
            
        </div>
  )
}

