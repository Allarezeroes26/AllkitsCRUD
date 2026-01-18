import { NavLink, Link } from "react-router-dom"
import { CiSearch, CiShoppingCart } from "react-icons/ci"
import { IoPersonOutline } from "react-icons/io5"
import { IoIosMenu, IoIosArrowBack } from "react-icons/io"
import { useContext, useState } from "react"
import { ShopContext } from "../context/shopContext"

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItem,
  } = useContext(ShopContext)

  const logout = () => {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItem({})
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      {/* NAV CONTENT */}
      <div className="flex items-center justify-between h-16 px-6 sm:px-12">

        {/* LOGO */}
        <Link to="/">
          <h1 className="font-display text-2xl">AllKit</h1>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex items-center space-x-8">
          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const labels = ["Home", "Products", "About", "Contact"]
            return (
              <NavLink
                key={path}
                to={path}
                className="relative group font-paragraph text-black"
              >
                {labels[i]}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
              </NavLink>
            )
          })}
        </nav>

        {/* ACTION ICONS */}
        <div className="flex items-center gap-5">

          <CiSearch
            onClick={() => setShowSearch(true)}
            className="w-5 cursor-pointer"
          />

          {/* USER */}
          <div className="relative group">
            <IoPersonOutline
              onClick={() => (!token ? navigate("/login") : null)}
              className="w-5 cursor-pointer"
            />

            {token && (
              <div className="absolute right-0 top-full pt-4 hidden group-hover:block">
                <div className="w-36 bg-slate-100 rounded shadow-md py-3 px-5 text-gray-600 flex flex-col gap-2">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <Link to="/orders">
                    <p className="cursor-pointer hover:text-black">Orders</p>
                  </Link>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CART */}
          <Link to="/cart" className="relative">
            <CiShoppingCart className="w-5 min-w-5" />
            <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[10px] flex items-center justify-center bg-black text-white rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* MOBILE MENU ICON */}
          <IoIosMenu
            onClick={() => setVisible(true)}
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white z-50 transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600">

          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <IoIosArrowBack className="h-4" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b font-paragraph"
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b font-paragraph"
            to="/collection"
          >
            Collection
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b font-paragraph"
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b font-paragraph"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
