import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-gray-300 border-r-1'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'} to={'/add'}>
            <IoIosAddCircleOutline className='w-5 h-5 text-4xl'/>
            <p className='hidden font-paragraph md:block'>Add Items</p>
        </NavLink>

        <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'} to={'/list'}>
            <CiViewList className='w-5 h-5 text-4xl'/>
            <p className='hidden font-paragraph md:block'>List Items</p>
        </NavLink>

        <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'} to={'/orders'}>
            <FaRegCalendarCheck className='w-5 h-5 text-4xl'/>
            <p className='hidden font-paragraph md:block'>Orders Items</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
