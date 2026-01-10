import React from 'react'
import { FaFileUpload } from "react-icons/fa";

const Add = () => {
  return (
    <form className='flex flex-col w-full items-start gap-3'>
      <div className='mx-10 my-5 font-paragraph'>
        <p className='mb-5 text-xl font-display'>Upload Image</p>

        <div className='flex gap-10 mt-10'>
          <label htmlFor="image1" className='shadow-lg p-4 flex items-center duration-400 transition-all hover:scale-110'>
            <FaFileUpload className='w-20 text-3xl' />
            <input type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2" className='shadow-lg p-4 flex items-center duration-400 transition-all hover:scale-110'>
            <FaFileUpload className='w-20 text-3xl' />
            <input type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3" className='shadow-lg p-4 flex items-center duration-400 transition-all hover:scale-110'>
            <FaFileUpload className='w-20 text-3xl' />
            <input type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4" className='shadow-lg p-4 flex items-center duration-400 transition-all hover:scale-110'>
            <FaFileUpload className='w-20 text-3xl' />
            <input type="file" id='image4' hidden/>
          </label>
        </div>
      </div>
    </form>
  )
}

export default Add
