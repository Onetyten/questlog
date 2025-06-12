'use client'
import api from '@/lib/api'
import { RootState } from '@/store'
import { addTodo, deleteTodo, replaceTodo } from '@/store/todoSlice/todoSlice'
import { setPriority } from 'os'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

export default function InputTodo() {
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

    const [selectedStatus,setSelectedStatus] = useState(defaultStatusOption)
    const [selectedPriority,setSelectedPriority] = useState(defaultPriority)


    async function submitTask () {
        
        if (title.length>0){
            setShowTaskError(false)
            const newTodo={
                user_id: userData._id,
                parent_id: null,
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
                
                const res = await api.post('/api/task/add', {title,status:selectedStatus?.value,priority:selectedPriority?.value,dueDate:dueDate.toISOString()})
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
        <div className='w-3xl border-2 mb-9 border-secondary rounded-lg flex pl-12 p-6'>

            <div className='flex flex-col gap-3 items-start'>

                <div className='flex gap-2 flex-col'>
                    <input type="text" placeholder='Add new task' className='border-2 border-secondary p-3 w-lg rounded-lg' onChange={(e)=>{setTitle(e.target.value)}} />
                    {showTaskError&& <p className='text-sm text-red-600'>Add your task description</p>}
                    
                </div>

                <div className='flex gap-6 items-center'>
                    <div className='flex items-center gap-2'>
                        DueDate :
                        {/* <CiCalendar className='text-2xl' /> */}
                        <input type="date" min={new Date().toISOString().split("T")[0]} name="" id="" className='size-6' onChange={(e)=>{
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

                        {dueDate.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}

                    </div>

                    <div className=' p-2 px-6 rounded-lg'>
                        <div className='flex items-center gap-2 relative'>
                            <p>
                                Completion status :
                            </p>
                            <Select options={statusOptions} defaultValue={selectedStatus} onChange={setSelectedStatus }/>
                        </div>
                    </div>

                    
                    
                </div>

                <div className='rounded-md flex items-center gap-3'>
                    <p>
                        Priority :
                    </p>
                    <Select options={priorityOptions} defaultValue={selectedPriority} onChange={setSelectedPriority }/>
                </div>

                <div>
                    <div onClick={()=>{submitTask()}} className='p-2 px-4 mt-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2'>
                        Add Task 
                    </div>
                </div>
            </div>
            
        </div>
  )
}


//     title: {

//     status:{

//     priority:{

//     dueDate:{
