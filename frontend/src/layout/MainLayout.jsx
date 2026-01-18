import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Searchbar from '../components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';

const MainLayout = () => {
  return (
    <div className='flex flex-col gap-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <div>
        <Searchbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
