import React from 'react'
import TodoHeader from './todoHeader'
import TodoList from './todoList'
import TodoFooter from './todoFooter'

export default function TodoBody() {
  return (
    <div className='flex items-center mt-6 flex-col  text-sm'>
        <div className='w-4xl flex flex-col gap-2'>
            <TodoHeader/>
            <TodoList/>
            <TodoFooter/>
        </div>
    </div>
  )
}
