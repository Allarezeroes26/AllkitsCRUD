import React from 'react'

const Newsletter = () => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

  return (
    <div className='text-center mt-10'>
        <p className='text-2xl font-medium font-display text-gray-800'>Subscribe Now & Get 20% Off</p>
        <p className='text-gray-400 mt-3 font-paragraph'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum incidunt enim quae cupiditate! Dolor unde culpa facere fugiat ad veritatis velit optio tenetur neque, doloremque suscipit deleniti, ipsum hic? Error!
        </p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" className='w-full sm:flex-1 outline-none font-paragraph' placeholder='Enter your E-mail' required/>
            <button onClick={submitHandler} type='submit' className='bg-black font-display text-white text-sm px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletter
