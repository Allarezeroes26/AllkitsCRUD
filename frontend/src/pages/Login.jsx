import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex font-paragraph flex-col items-center w-[90%] sm:max-w-96 m-auto text-gray-500'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='font-display text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState === 'Login' ? '' : <input type="text" required className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
      <input type="email" required className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input type="password" required className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[8px]'>
        <p className='cursor-pointer'>Forgot your Password?</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white cursor-pointer hover:scale-105 transition-all duration-300 font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
