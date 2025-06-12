'use client'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import Select from 'react-select'
import api from '@/lib/api';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '@/store/todoSlice/todoSlice';

interface TaskPropType {
    title:string | null,
    dueDate:string | null,
    priority:string | null,
    status:string | null,
    _id:string | null,
}






export default function ListItem(prop:TaskPropType) {
    const {title,priority,status,_id,dueDate} = prop
    const dispatch = useDispatch()
    function formatDueDate(dueDate: string | null): string {
        if (!dueDate) return "No due date"; // or any fallback

        const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        return formattedDate;
    }
    const statusOptions = [
        {value:'pending', label:'Pending'},
        {value:'ongoing', label:'Ongoing'},
        {value:'completed', label:'Completed'}
    ]
    const priorityOptions = [
        {value:'low', label:'Low'},
        {value:'medium', label:'Medium'},
        {value:'high', label:'High'}
    ]
    const defaultPriority = priorityOptions.find(defprority=>defprority.value == `${priority}`)
    const defaultStatusOption = statusOptions.find(option=>option.value == `${status}`)

    const [selectedStatus,setSelectedStatus] = useState(defaultStatusOption||null)
    const [selectedPriority,setSelectedPriority] = useState(defaultPriority||null)

    const [showDetailBox,setShowDetailBox] = useState(false)
    const [showTask,setShowTask] = useState(true)
    const [isChecked,setIsChecked] = useState(false)
    const [editTextShow,setEditTextShow] = useState(false)
    const [editText,setEditText] = useState(false)

    useEffect(() => {
    if (status === "completed") {
        setIsChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, []);

    async function deleteTask(){
        setShowTask(false)
        try {
            const res = await api.delete(`/api/task/delete/${_id}`)
            if (res.data?.success==true)
            {
                dispatch(deleteTodo(res.data.data))
                console.log("task deleted succcessfully")
            }
            else{
                setShowTask(true)
            }
        } 
        catch (error) 
        {
            console.log(error)
        }
    }




  return (
    showTask &&(
        <div className='w-3xl border-2 border-secondary rounded-lg flex gap-6 justify-between  p-6'>
            <div className='flex gap-6'>
                <div>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        className="size-6"
                        onChange={async (e) => {
                            const checked = e.target.checked;
                            setIsChecked(checked);

                            // Immediately update the status
                            const newStatus = checked ? "completed" : "ongoing";
                            try {
                            const res = await api.patch(`/api/task/edit/${_id}`, { status: newStatus });
                            if (res.data?.success) {
                                dispatch(updateTodo(res.data.updatedTask));
                                console.log("Status updated to", newStatus);
                            }
                            } catch (error) {
                            console.error(error);
                            }
                        }}
                        />
                </div>

                <div className='flex flex-col gap-3 items-start'>
                    <div className='flex'>
                        <p className={`${isChecked?"line-through":""} mb-4` }>
                            {title}
                        </p>
                    </div>

                    {!isChecked&&(
                        <div className='flex gap-6 items-center'>
                            <div className='flex items-center gap-2'>
                                {/* <CiCalendar className='text-2xl' /> */}
                                <input type="date" name="" id="" className='size-6' />
                                {formatDueDate(dueDate)}
                            </div>

                            <div className='rounded-lg'>
                                <div className='flex items-center gap-2 relative'>
                                <Select options={statusOptions} defaultValue={selectedStatus} onChange={async (option)=>{
                                    setSelectedStatus(option)
                                    console.log(option?.value)
                                    try {
                                        const res = await api.patch(`/api/task/edit/${_id}`, { status:option?.value});
                                        if (res.data?.success) {
                                            dispatch(updateTodo(res.data.updatedTask));
                                            console.log("status updated to", option?.value);
                                        }
                                    } catch (error) {
                                    console.error(error);
                                    }
                                } }/>
                                </div>
                            </div>

                            
                            
                        </div>
                    )}
                    {!isChecked&&(
                    <div className=' p-1 px-4 rounded-md'>
                        <Select options={priorityOptions} defaultValue={selectedPriority} onChange={async(option)=>{
                            setSelectedPriority(option)
                            console.log("selected priority",option)
                            try {
                            const res = await api.patch(`/api/task/edit/${_id}`, { priority:option?.value});
                            if (res.data?.success) {
                                dispatch(updateTodo(res.data.updatedTask));
                                console.log("priority updated to", option?.value);
                            }
                            } catch (error) {
                            console.error(error);
                            }

                        }
                            
                            
                            
                            
                            
                            
                            
                            }/>
                    </div> 
                    )}
                    
                    {!isChecked&&(
                        <div>
                            <div className='p-2 mt-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2'>
                                <IoMdAdd />
                                Add subtask
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className='text-xl relative'>
                <BsThreeDots onClick={()=>{setShowDetailBox(!showDetailBox)}}/>
                {showDetailBox&&(
                <div className='text-base absolute top-8 text-center bg-secondary -left-10 shadow-md flex flex-col rounded-xl '>
                    {!isChecked&&(
                        <p className='hover:bg-primary p-2 px-8 w-full rounded-t-xl'>
                            Edit
                        </p>    
                    )}
                    <p className={`hover:bg-red-600 ${isChecked?"rounded-xl":"rounded-b-xl"} p-2 px-8 w-full rounded-b-xl`} onClick={()=>{deleteTask()}}>
                        Delete
                    </p>
                </div>)}
            </div>

            
        </div>
    )
  )
}
