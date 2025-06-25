import React from 'react'
import TodoHeader from './todoHeader'
import TodoList from './todoList'
import TodoFooter from './todoFooter'
import ChildTaskModal from './childTaskModal'



export default function TodoBody() {
  return (
    <div className='flex items-center mt-6 flex-col  text-sm relative'>
        <div className='2xl:w-4xl xl:w-2xl w-xl flex flex-col gap-2'>
            <TodoHeader/>
            <TodoList/>
            <TodoFooter/>
        </div>

        <ChildTaskModal/>

        

    </div>
  )
}
