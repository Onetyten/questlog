import React from 'react'

import { CiFilter } from "react-icons/ci";
import { MdOutlineSort } from "react-icons/md";

export default function TodoHeader() {
  return (
    <div className='flex gap-4 items-center text-center w'>
        <div className='p-2 border-2 flex items-center gap-2 rounded-lg'>
            <MdOutlineSort />
            Sort
        </div>

        <div className='p-2 border-2 flex items-center gap-2 rounded-lg'>
            <CiFilter />
            Filters
        </div>

    </div>
  )
}
