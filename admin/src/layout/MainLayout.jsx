import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import Login from '../components/Login'
import { ToastContainer } from 'react-toastify'


export const backendUrl = import.meta.env.VITE_BACKEND_URL

const MainLayout = ({token, setToken}) => {

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr className="border-gray-300" />

          <div className="flex w-full">
            <Sidebar />
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default MainLayout
