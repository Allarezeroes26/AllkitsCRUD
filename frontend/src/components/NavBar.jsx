import { NavLink, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {

  const [ visible, setVisible ] = useState(false)

  return (
    <div className="flex items-center justify-between py-5">
      <h1 className="font-display text-2xl">Mens Fashion</h1>
      <nav className="hidden sm:flex items-center space-x-6">
        <NavLink
          to="/"
          className="relative group font-paragraph text-black"
        >
          Home
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-500"></span>
        </NavLink>

        <NavLink
          to="/collection"
          className="relative group font-paragraph text-black"
        >
          Collection
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-500"></span>
        </NavLink>

        <NavLink
          to="/about"
          className="relative group font-paragraph text-black"
        >
          About
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-500"></span>
        </NavLink>

        <NavLink
          to="/contact"
          className="relative group font-paragraph text-black"
        >
          Contact
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-500"></span>
        </NavLink>
      </nav>
      <div className="flex flex-row gap-5">
        <CiSearch className="text-2x cursor-pointer w-5"/>

        <div className="group relative">
          <IoPersonOutline className="text-2x cursor-pointer w-5"/>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        <Link to='/cart' className='relative'>
          <CiShoppingCart className="w-5 min-w-5"/>
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">10</p>
        </Link>

        <IoIosMenu onClick={() => setVisible(true)} className="w-5 cursor-pointer sm:hidden"/>
      </div>

      {/* Sidebar menu for small Screen */}

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <IoIosArrowBack className="h-4"/>
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border font-paragraph' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border font-paragraph' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border font-paragraph' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border font-paragraph' to='/contact'>Contact</NavLink>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
