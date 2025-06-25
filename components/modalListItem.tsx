'use client'
import React, { useEffect, useState } from 'react'
import { IoMdAdd,IoMdRemove } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import Select from 'react-select'
import api from '@/lib/api';
import { RootState } from '@/store';
import { useDispatch,useSelector } from 'react-redux';
import { deleteTodo, updateTodo } from '@/store/todoSlice/todoSlice';
import OutsideClickHandler from 'react-outside-click-handler';
import InputTodo from './inputTodo';
import { LuChevronsUpDown } from "react-icons/lu";
import { openModal } from '@/store/showChildModalSlice/showChildModalSlice';
import { setModalId } from '@/store/modalIdSlice/modalIdSlice';
import ListItem from '@/components/listItem'




interface TaskPropType {
    title:string,
    dueDate:string | null,
    priority:string | null,
    status:string | null,
    _id:string | null,
    parent_id:string | null,
    level:number
}






export default function ModalListItem(prop:TaskPropType) {
    const {title,priority,status,_id,dueDate,level} = prop
    const todoRedux = useSelector((state:RootState)=>state.todo)
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
    const [editText,setEditText] = useState(title)
    const [showSubTaskInput,setShowSubTaskInput] = useState(false)

    const childrenTodo = todoRedux.filter((todo)=>todo.parent_id == _id)
    const unCompletedTodos = childrenTodo.filter((todo)=>todo.status !== "completed" )
    const completedTodos = childrenTodo.filter((todo)=>todo.status == "completed" )
    const [showAll,setShowAll] = useState(false)

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


    function openChildModal(){
        dispatch(setModalId(_id))
        dispatch(openModal()) 
    }





  return (
    showTask &&(
        <div className={`w-full flex-grow border-2 rounded-sm 2xl:rounded-lg border-secondary flex flex-col gap-2  py-3 pl-3`}>
            <div className='flex flex-row justify-between w-full'>
                <div >
                    <input
                        type="checkbox"
                        checked={isChecked}
                        className="2xl:size-6 size-4 bg-foreground checked:bg-foreground"
                        onChange={async (e) => {
                            const checked = e.target.checked;
                            setIsChecked(checked);

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

               
                <div className={`flex gap-3 pr-3 `}>
                    <div className='text-xl relative'>
                
                        <BsThreeDots onClick={()=>{setShowDetailBox(!showDetailBox)}}/>
                    
                        {showDetailBox&&(
                        <OutsideClickHandler  onOutsideClick={() => { setShowDetailBox(false)}} >
                            <div className='text-base absolute top-8 z-20 text-center bg-secondary -left-10 shadow-md flex flex-col rounded-sm '>
                                {!isChecked&&(
                                    <p className='hover:bg-primary p-2 px-6 w-full rounded-t-sm' onClick={()=>{setEditTextShow(!editTextShow)}}>
                                        Edit
                                    </p>   
                                )}
                                {!isChecked&& childrenTodo.length>0&&(
                                    <p onClick={()=>{openChildModal()}} className='hover:bg-primary p-2 px-6 w-full'>
                                        Open
                                    </p>   
                                )}
                                <p className={`hover:bg-red-600 ${isChecked?"rounded-xl":"rounded-b-xl"} p-2 px-6 w-full rounded-b-sm`} onClick={()=>{deleteTask()}}>
                                    Delete
                                </p>
                            </div>
                        </OutsideClickHandler>
                        )}
                    </div>

                    <div className='flex gap-3 text-xl right-3'>
                        <LuChevronsUpDown onClick={()=>{setShowAll(!showAll)}} />
                    </div>
                </div>
            </div>
           
            <div className='flex 2xl:gap-6 xl:gap-2 gap-1 w-full'>
                
                
                <div className='flex 2xl:text-md text-sm w-full flex-col 2xl:gap-3 gap-1 items-start'>
                    <div className='flex w-full'>
                       {!editTextShow?
                       ( <div>
                            <p className={`${isChecked?"line-through":""} mb-4 mt-2 pr-3 text-wrap` }> {title} </p>
                        </div>
                       
                       ):
                       (
                         <div className={`flex  gap-3` }>
                            <input type="text" placeholder='Add new task' value={editText} className='border-2 border-secondary p-3 w-lg rounded-lg' onChange={(e)=>{setEditText(e.target.value)}} />
                            <button className='p-2 px-4 mt-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2' onClick={async()=>{
                                try {
                                    const res = await api.patch(`/api/task/edit/${_id}`, { title:editText});
                                    if (res.data?.success) {
                                        dispatch(updateTodo(res.data.updatedTask));
                                        console.log("Title updated to", editText);
                                        setEditTextShow(false)
                                }
                                } catch (error) {
                                console.error(error);

                                }
                            }}>
                                Edit
                            </button>
                        </div>
                       )}
                    </div>
                    
                    {showAll && !isChecked&&(
                        <div className='flex gap-6 items-center w-full'>
                            <div className='flex items-center gap-2'>
                                {/* <CiCalendar className='text-2xl' /> */}
                                <input type="date" name="" id="" className='size-6' onChange={async (e)=>{
                                    const updatedDate = new Date(e.target.value).toISOString()
                                     try {
                                        const res = await api.patch(`/api/task/edit/${_id}`, { dueDate:updatedDate});
                                        if (res.data?.success) {
                                            dispatch(updateTodo(res.data.updatedTask));
                                            console.log("date updated to", updatedDate);
                                        }
                                    }
                                    catch (error) {
                                    console.error(error);
                                    }
                                }} />
                                {
                                <p className='2xl:text-md text-xs'>{formatDueDate(dueDate)}</p>}
                            </div>

                            <div className='rounded-lg'>
                                <div className='flex items-center gap-2 2xl:text-md text-xs relative'>
                                <Select options={statusOptions} className='text-black' defaultValue={selectedStatus} onChange={async (option)=>{
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
                    {showAll && !isChecked&&(
                    <div className='2xl:text-md text-xs'>
                        <Select className='text-black' options={priorityOptions} defaultValue={selectedPriority} onChange={async(option)=>{
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

{showAll &&!isChecked&&(<div className='mt-3 w-full flex flex-grow flex-col gap-6'>
                          {unCompletedTodos.map((item)=>{
                            return(
                              <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id} parent_id={_id} level={level+1}  />
                            )
                          })}
                    
                          {completedTodos.map((item)=>{
                            return(
                              <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id} parent_id={_id} level={level+1} />
                            )
                          })}
                    
                    
                    </div>)}
                    {
                        childrenTodo.length>0?(
                             <p className='text-primary'>
                               {!showAll&&
                                <span>
                                    {childrenTodo.length} subtask{childrenTodo.length>1&& <span>s</span>}
                                </span>
                               } 
                                
                            </p>
                        ):(
                            <p className=''>
                                {/* {level<=3&&!showAll&&(<span>No subtask</span>)} */}
                            </p>
                        )
                    }
                   
                    
                    {level<= 2 && showAll &&!isChecked&&(
                        <div className='flex flex-col justify-start items-start'>
                            <div className='p-2 my-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-1 2xl:text-md text-xs' onClick={()=>{setShowSubTaskInput(!showSubTaskInput)}}>
                               {!showSubTaskInput?<IoMdAdd/>:<IoMdRemove/>}
                                Add subtask  
                            </div>
                            {showSubTaskInput&&<InputTodo parent_id={_id}/>}
                            
                        </div>
                    )}

                </div>
            </div>


            
        </div>
    )
  )
}

