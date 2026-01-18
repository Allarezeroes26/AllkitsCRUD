import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/shopContext"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";


const Searchbar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if(location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 mt-10 text-center font-paragraph">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search" />
        <CiSearch/>
      </div>
      <RxCross2 onClick={() => setShowSearch(false)} className="inline w-3 cursor-pointer"/>
    </div>
  ) : null
}

export default Searchbar
