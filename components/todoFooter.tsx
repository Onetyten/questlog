import React from 'react'
import { IoMdAdd } from 'react-icons/io'

export default function TodoFooter() {
  return (
       <div className='flex my-6'>
            <div className='p-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2'>
                <IoMdAdd />
                New Task
            </div>
       </div>
  )
}
