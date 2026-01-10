import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import Login from '../components/Login'

const MainLayout = () => {
  const [token, setToken] = useState('')

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login />
      ) : (
        <>
          <Navbar />
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
