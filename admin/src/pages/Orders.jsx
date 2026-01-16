import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../layout/MainLayout'
import { toast } from 'react-toastify'
import { BiPackage } from 'react-icons/bi'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:e.target.value}, {headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }

    }  catch (err) {
      console.log(err)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="p-6 font-paragraph">
      <h3 className="text-2xl font-display font-semibold mb-6">
        Orders Management
      </h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-sm p-5 grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Left: Items */}
            <div className="lg:col-span-2 flex gap-4">
              <BiPackage className="text-3xl text-gray-500 mt-1" />

              <div className='font-paragraph'>
                <p className="font-display font-medium mb-2">
                  Ordered Items
                </p>

                {order.items.map((item, idx) => {
                  const itemName =
                    item.name ||
                    item.title ||
                    item.product?.name ||
                    'Unknown Product'

                  return (
                    <p key={idx} className="text-sm text-gray-700">
                      <span className="font-medium">{itemName}</span> × {item.quantity || 1}

                      {item.size && (
                        <span className="ml-2 text-xs px-2 py-0.5 border rounded">
                          {item.size}
                        </span>
                      )}
                    </p>
                  )
                })}

              </div>
            </div>

            {/* Middle: Address */}
            <div>
              <p className="font-display font-medium mb-2">
                Customer
              </p>
              <p className="text-sm text-gray-700">
                {order.address.firstName} {order.address.lastName}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {order.address.street},
                <br />
                {order.address.city}, {order.address.state}
                <br />
                {order.address.country} – {order.address.zipcode}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                📞 {order.address.phone}
              </p>
            </div>

            {/* Right: Order Info */}
            <div>
              <p className="font-display font-medium mb-2">
                Order Info
              </p>
              <p className="text-sm">Items: {order.items.length}</p>
              <p className="text-sm">
                Method: {order.paymentMethod}
              </p>
              <p className="text-sm">
                Payment:{' '}
                <span
                  className={`font-medium ${
                    order.payment ? 'text-green-600' : 'text-orange-500'
                  }`}
                >
                  {order.payment ? 'Done' : 'Pending'}
                </span>
              </p>
              <p className="text-sm">
                Date:{' '}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount & Status */}
            <div className="flex flex-col justify-between">
              <p className="text-lg font-display font-semibold">
                {currency}
                {order.amount}
              </p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                className="mt-3 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue={order.status || 'Order Placed'}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">
                  Out For Delivery
                </option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No orders found.
          </p>
        )}
      </div>
    </div>
  )
}

export default Orders
