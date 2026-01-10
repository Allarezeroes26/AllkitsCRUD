import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div className='flex flex-col'>
          <h1 className='font-display text-3xl w-[max(10%, 80px)]'>Allkit</h1>
          <p className='text-red-600 text-sm font-paragraph'>Admin Panel</p>
      </div>
      <button onClick={() => setToken('')} className='bg-zinc-800 font-display text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
