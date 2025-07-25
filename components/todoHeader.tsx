/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { CiFilter } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setTodos } from '@/store/todoSlice/todoSlice';
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretLeft} from "react-icons/fa6";
import Select from 'react-select';
import api from '@/lib/api';
import { TbSortAscending,TbSortDescending } from "react-icons/tb";




type OptionType = {
  value: string;
  label: string;
}
// Options
const sortOptions = [
  { value: 'title', label: 'Title' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'dateCreated', label: 'D. Created' },
];

const orderOptions = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

const priorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

const dateFilters = [
  { value: '', label: 'None' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'week', label: 'This Week' },
];

export default function TodoHeader() {
  const dispatch = useDispatch();

  // State

  const [selectedSortOption, setSelectedSortOption] = useState<OptionType | null>(sortOptions.find(o => o.value === 'dateCreated')|| null);
  const [selectedOrder, setSelectedOrder] = useState<OptionType | null>(orderOptions.find(o => o.value === 'asc') || null);
  const [selectedPriority, setSelectedPriority] = useState<OptionType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState<OptionType | null>(null);


  const [showSortOPtions, setShowSortOptions] = useState(false)
  const [showFilterOptions, setShowFilterOptions] = useState(false)



  function buildQuery() {
    const query = new URLSearchParams();

    if (selectedSortOption?.value) query.append("sortBy", selectedSortOption.value);
    if (selectedOrder?.value) query.append("order", selectedOrder.value);
    if (selectedPriority?.value) query.append("priority", selectedPriority.value);
    if (selectedStatus?.value) query.append("status", selectedStatus.value);
    if (selectedDateFilter?.value) query.append(selectedDateFilter.value, "true");

    return `/api/task/fetch?${query.toString()}`;
    
  }

  async function fetchTasks() {
    const url = buildQuery();
    try {
      const res = await api.get(url);
      const data = res.data;
      if (data.success && data.tasks?.length > 0) {
        dispatch(setTodos(data.tasks));
        console.log("Tasks retrieved successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [selectedSortOption, selectedOrder, selectedPriority, selectedStatus, selectedDateFilter]);

  return (
    <div className='flex gap-2 sm:items-center items-start mt-2 md:mt-4 justify-start  sm:justify-between text-xs flex-col sm:flex-row flex-wrap '>
      <div className='flex items-center gap-2 text-left rounded-lg'>

        <div className='flex gap-1 items-center text-sm 2xl:text-base'>
          {selectedOrder?.value === "desc" ? <TbSortDescending className='2xl:text-xl text-xl' /> : <TbSortAscending className='2xl:text-xl text-xl'  />}


          <span className='text-sm flex items-center gap-1'>
            Sort by <span className='hidden 2xl:inline'>:</span>

            <span onClick={()=>{
              setShowSortOptions(true)
              setShowFilterOptions(false)
            }} className={`${!showSortOPtions?'flex xl:hidden':'hidden'} text-xl`} ><FaCaretRight /></span>
          </span>
        </div>

        <div className={`flex ${showSortOPtions?'flex':'hidden xl:flex'} items-center gap-2`}>
            <Select options={sortOptions} value={selectedSortOption} onChange={setSelectedSortOption} className=' w-24 cursor-pointer text-black' />
            <Select options={orderOptions} value={selectedOrder} onChange={setSelectedOrder} className=' w-24  text-black cursor-pointer' />
             <span onClick={()=>{ setShowSortOptions(false) }} className='flex xl:hidden text-xl' ><FaCaretLeft /></span>
        </div>
        

      </div>

      <div className='flex items-center gap-2 rounded-lg py-2 sm:p-2'>
        <div className='flex gap-1 items-center'>
          <CiFilter className='text-xl'  />
          <span className='text-sm flex items-center gap-1'>
            Filter <span className='hidden 2xl:inline'>:</span>
             <span onClick={()=>{
              setShowFilterOptions(true)
              setShowSortOptions(false)

             }} className={`${!showFilterOptions?'flex xl:hidden':'hidden'} text-xl`} ><FaCaretRight /></span>
          </span>
        </div>


        <div className={`flex ${showFilterOptions?'flex':'hidden xl:flex'} items-center gap-2`}>
          {/* <Select options={priorityOptions} placeholder="Priority" value={selectedPriority} onChange={setSelectedPriority} isClearable className='w-24  text-black' /> */}
          {/* <Select options={statusOptions} placeholder="Status" value={selectedStatus} onChange={setSelectedStatus} isClearable className='w-24 hidden sm:inline  text-black'/> */}
          <Select options={dateFilters} placeholder="Date" value={selectedDateFilter} onChange={setSelectedDateFilter} isClearable className='w-24  text-black' />
          <span onClick={()=>{ setShowFilterOptions(false) }} className='flex xl:hidden text-xl' ><FaCaretLeft /></span>
        </div>
      </div>
    </div>
  );
}
