import React from 'react'
import TodoHeader from './todoHeader'
import TodoList from './todoList'
import TodoFooter from './todoFooter'


export default function TodoBody() {
  return (
    <div className='flex items-center mt-6 flex-col  text-sm relative'>
        <div className='mb-32 2xl:w-4xl xl:w-2xl sm:w-xl w-[95%] flex flex-col gap-2'>
            <TodoHeader/>
            <TodoList/>
            <TodoFooter/>
        </div>        

    </div>
  )
}
