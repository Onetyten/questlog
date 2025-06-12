/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { CiFilter } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setTodos } from '@/store/todoSlice/todoSlice';
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
  { value: 'dateCreated', label: 'Date Created' },
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
  const [selectedOrder, setSelectedOrder] = useState<OptionType | null>(orderOptions.find(o => o.value === 'desc') || null);
  const [selectedPriority, setSelectedPriority] = useState<OptionType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState<OptionType | null>(null);


  // Build query string
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
    <div className='flex gap-2 items-center justify-between flex-wrap text-xs 2xl:text-md'>
      <div className='flex items-center gap-2 text-left rounded-lg'>

        {selectedOrder?.value === "desc" ? <TbSortDescending className='2xl:text-xl text-xl' /> : <TbSortAscending className='2xl:text-xl text-lg'  />}



        Sort by:
        <Select options={sortOptions} value={selectedSortOption} onChange={setSelectedSortOption} className='2xl:w-36 w-24' />
        <Select options={orderOptions} value={selectedOrder} onChange={setSelectedOrder} className='2xl:w-36 w-24' />
      </div>

      <div className='flex items-center gap-2 rounded-lg p-2'>
        <CiFilter className='text-xl'  />
        Filter : 
        
        <div className='flex items-center gap-2'>
          <Select options={priorityOptions} placeholder="Priority" value={selectedPriority} onChange={setSelectedPriority} isClearable className='2xl:w-36 w-24' />
          <Select options={statusOptions} placeholder="Status" value={selectedStatus} onChange={setSelectedStatus} isClearable className='2xl:w-32 w-24' />
          <Select options={dateFilters} placeholder="Date" value={selectedDateFilter} onChange={setSelectedDateFilter} isClearable className='2xl:w-32 w-20' />
        </div>
      </div>
    </div>
  );
}
