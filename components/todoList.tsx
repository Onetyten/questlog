import React, { useEffect } from 'react'
import ListItem from './listItem'
import api from '@/lib/api'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos } from '@/store/todoSlice/todoSlice'
import { RootState } from '@/store'



export default function TodoList() {
  const todoRedux = useSelector((state:RootState)=>state.todo)
  const dispatch = useDispatch()

  console.log("Todo redux: ",todoRedux)


  async function fetchTasks() {

    try {
      const res = await api.get(`/api/task/fetch`, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status === 404;
        },
      })
      const data =  res.data
      if (data.success == true){
        if (data.tasks.length>0){
          dispatch(setTodos(data.tasks))
        }
      }
      console.log(res.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const unCompletedTodos = todoRedux.filter((todo)=>todo.status !== "completed" )
  const completedTodos = todoRedux.filter((todo)=>todo.status == "completed" )

  useEffect(()=>{
    fetchTasks()
  },[])
  return (
    <div className='mt-6 flex flex-col gap-6'>
      {unCompletedTodos.map((item)=>{
        return(
          <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id}   />
        )
      })}

      {completedTodos.map((item)=>{
        return(
          <ListItem key={item._id} title= {item.title} dueDate = {item.dueDate} priority = {item.priority} status={item.status} _id = {item._id}   />
        )
      })}


    </div>
  )
}
                // user_id: userData._id,
                // parent_id: null,
                // status:selectedStatus?.value ?? null,
                // priority:selectedPriority?.value ?? null,
                // dueDate:dueDate.toISOString(),
                // dateCreated:null,