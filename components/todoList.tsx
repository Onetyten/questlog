import React, { useEffect } from 'react'
import ListItem from './listItem'
import {useSelector } from 'react-redux'
import { RootState } from '@/store'



export default function TodoList() {
  const todoRedux = useSelector((state:RootState)=>state.todo)
  const loneTodos = todoRedux.filter((todo)=>todo.parent_id == null )
  const unCompletedTodos = loneTodos.filter((todo)=>todo.status !== "completed" )
  const completedTodos = loneTodos.filter((todo)=>todo.status == "completed" )

  useEffect(()=>{
    // fetchTasks()
  },[])
  return (
    <div className='sm:mt-6 flex flex-col gap-6'>
      {unCompletedTodos.map((item)=>{
        return(
          <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id} parent_id={item.parent_id} level = {0} />
        )
      })}

      {completedTodos.map((item)=>{
        return(
          <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id} parent_id={item.parent_id}  level = {0}  />
        )
      })}


    </div>
  )
}