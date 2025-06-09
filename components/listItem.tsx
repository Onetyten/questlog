import React from 'react'
import { MdArrowDropDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

export default function 
istItem() {
  return (
    <div className='w-3xl border-2 border-secondary rounded-lg flex gap-6  p-6'>
        <div>
            <input type="checkbox" name="" id="" className='size-6' />
        </div>

        <div className='flex flex-col gap-3 items-start'>
            <div className='flex gap-6'>
                <p>
                    Finish user onboarding
                </p>
            </div>

            <div className='flex gap-6 items-center'>
                <div className='flex items-center gap-2'>
                    {/* <CiCalendar className='text-2xl' /> */}
                    <input type="date" name="" id="" className='size-6' />
                    Jan 8, 2023
                </div>

                <div className='text-red-600 p-2 px-6 rounded-lg'>
                    <div className='flex items-center gap-2 relative'>
                       pending
                       <MdArrowDropDown />

                       <div className='hidden text-foreground bg-background border-t-2 border-secondary py-4 text-center absolute -bottom-36 -left-3 translate-y-1 flex flex-col rounded-md shadow-md'>
                            <div className='py-1 w-full hover:bg-primary px-4'>
                                Pending
                            </div>
                            <div className='py-1 w-full hover:bg-primary px-4'>
                                Ongoing
                            </div>
                            <div className='py-1 w-full hover:bg-primary px-4'>
                                Completed
                            </div>
                       </div>

                    </div>
                </div>

                
                
            </div>

            <div className='bg-gray-300 p-1 px-4 rounded-md'>
                <div className='relative flex items-center gap-2'>  
                    <p>
                        Low
                    </p>
                    <MdArrowDropDown />
                    <div className='hidden text-foreground bg-background border-t-2 border-secondary py-4 text-center absolute -bottom-36 -left-5 translate-y-1 flex flex-col rounded-md shadow-md'>
                        <div className='py-1 w-full hover:bg-primary px-4'>
                            Low
                        </div>
                        <div className='py-1 w-full hover:bg-primary px-4'>
                            Medium
                        </div>
                        <div className='py-1 w-full hover:bg-primary px-4'>
                            High
                        </div>
                    </div>
                </div>    
            </div>

            <div>
                <div className='p-2 mt-2 hover:bg-purple-600 bg-primary text-background rounded-lg flex items-center gap-2'>
                    <IoMdAdd />
                    Add subtask
                </div>
            </div>
        </div>
        
    </div>
  )
}
