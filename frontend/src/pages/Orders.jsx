import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)

  const [ orderData, setOrderData ] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        // Flatten items from all orders
        let allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              _orderId: order._id // optional: track which order it came from
            })
          })
        })

        if (allOrdersItem.length === 0) {
          console.log('No orders found for this user.')
        } else {
          console.log('Orders fetched:', allOrdersItem)
        }

        // Reverse to show newest first
        setOrderData(allOrdersItem.reverse())
      } else {
        toast.error('Failed to fetch orders')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  if (!token) {
    return <p className="mt-8 text-center">Please login to view your orders.</p>
  }

  if (orderData.length === 0) {
    return (
      <div className="mt-8 text-center">
        <Title text1="My" text2="Orders" />
        <p className="mt-4 text-gray-500">You have no orders yet.</p>
      </div>
    )
  }

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl mb-6">
        <Title text1={'My'} text2={'Orders'} />
      </div>

      {orderData.map((item, index) => (
        <div
          key={`${item._id || item.id}-${index}`}
          className='py-4 font-paragraph border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
        >
          <div className="flex items-start gap-10 text-sm">
            <img className='w-16 sm:w-20' src={item.image} alt={item.title} />

            <div>
              <p className='sm:text-base font-display font-medium'>{item.title}</p>

              <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                <p className='text-lg'>{currency}{item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
                <p>Size: {item.size || 'M'}</p>
              </div>

              <p className='mt-3'>
                Date:{' '}
                <span className='text-gray-400'>
                  {new Date(item.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>

                <span className='text-gray-400 mx-10'>Payment Method: {item.paymentMethod}</span>

              </p>
            </div>
          </div>

          <div className='md:w-1/2 flex justify-between mt-3 md:mt-0'>
            <div className='flex items-center gap-2'>
              <span
                className={`w-2 h-2 rounded-full ${
                  item.status === 'Ready to Ship'
                    ? 'bg-green-500'
                    : 'bg-gray-400'
                }`}
              ></span>
              <p className='text-sm md:text-base'>{item.status || 'Processing'}</p>
            </div>
            <button onClick={loadOrderData} className='border px-4 py-2 transition duration-300 hover:bg-black hover:text-white text-sm font-medium rounded-sm'>
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
