import React, { useState } from 'react'
import { IoMdAdd,IoMdRemove } from 'react-icons/io'
import InputTodo from './inputTodo'

export default function TodoFooter() {
     const [showInput,setShowInput]  = useState(false)
     function HandleShowTodo(){
          setShowInput(!showInput)
     }
  return (
       <div className='flex my-6 mb-32 flex-col items-start gap-6'>
            <div className='p-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2' onClick={()=>{HandleShowTodo()}}>
                {!showInput?<IoMdAdd/>:<IoMdRemove/>}
                New Task
            </div>
            {showInput&&<InputTodo parent_id={null} />}
            
       </div>
  )
}
