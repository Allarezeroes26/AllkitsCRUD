import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../layout/MainLayout'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/products/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/products/remove', { id }, { headers: {token} })

      if(response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="font-paragraph w-full px-10 py-6 overflow-hidden">
      <p className="mb-5 text-xl font-display">All Product List</p>

      {/* Header */}
      <div className="hidden md:grid grid-cols-[80px_3fr_1fr_1fr_80px] items-center py-2 px-3 border bg-gray-100 text-sm">
        <b>Image</b>
        <b>Title</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {/* Rows */}
      {list.map(item => (
        <div
          key={item._id}
          className="
            grid grid-cols-[60px_1fr_auto]
            md:grid-cols-[80px_3fr_1fr_1fr_80px]
            items-center
            gap-3
            py-2 px-3
            border-b
            text-sm
            hover:bg-gray-50
            transition
          "
        >
          {/* Image */}
          <img
            src={item.images?.[0]}
            alt={item.title}
            className="w-14 h-14 md:w-16 md:h-16 object-cover rounded"
          />

          {/* Title */}
          <p className="truncate font-medium">{item.title}</p>

          {/* Category */}
          <p className="hidden md:block capitalize">{item.category}</p>

          {/* Price */}
          <p className="hidden md:block font-semibold">
            {currency}{item.price}
          </p>

          {/* Action */}
          <button
            onClick={() => removeProduct(item._id)} className="text-red-500 hover:text-red-700 text-lg font-bold text-right md:text-center"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default List
