import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../layout/MainLayout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiTrash2 } from 'react-icons/fi'

const List = ({ token }) => {
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
    if (!window.confirm('Remove this product?')) return

    try {
      const response = await axios.post(
        backendUrl + '/api/products/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
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
    <div className="p-6 font-paragraph">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold">
          Product List
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage all available products
        </p>
      </div>

      {/* Table Header (Desktop) */}
      <div className="hidden md:grid grid-cols-[90px_3fr_1.5fr_1fr_80px] bg-gray-100 border rounded-t-md px-4 py-3 text-sm font-medium">
        <span>Image</span>
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product Rows */}
      <div className="border rounded-b-md overflow-hidden bg-white">
        {list.map((item) => (
          <div
            key={item._id}
            className="
              grid grid-cols-[70px_1fr_auto]
              md:grid-cols-[90px_3fr_1.5fr_1fr_80px]
              items-center
              gap-4
              px-4 py-3
              border-b
              hover:bg-gray-50
              transition
            "
          >
            {/* Image */}
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-md border"
            />

            {/* Title */}
            <div>
              <p className="font-medium text-gray-800 truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-500 md:hidden capitalize">
                {item.category}
              </p>
            </div>

            {/* Category */}
            <p className="hidden md:block capitalize text-gray-600">
              {item.category}
            </p>

            {/* Price */}
            <p className="hidden md:block font-semibold text-gray-800">
              {currency}{item.price}
            </p>

            {/* Action */}
            <button
              onClick={() => removeProduct(item._id)}
              className="
                flex items-center justify-center
                text-red-500 hover:text-red-700
                transition
              "
              title="Remove product"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}

        {/* Empty State */}
        {list.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}

export default List
