import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import GCASH from '../assets/gcash_logo.png'
import PAYPAL from '../assets/paypal_logo.png'
import { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [ method, setMethod ] = useState('cod')
  const {navigate, backendUrl, token, cartItems, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [ formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data, [name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]){
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product.id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }


      switch(method) {
        //Api for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token: token}})
          console.log(response.data)
          if (response.data.success) {
            setCartItem({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }

          break;

        default:
        break;
      }

    } catch (err) {

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex font-paragraph flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'}/>
        </div>
        <div className="flex gap-3">
          <input required type="text" onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required type="text" onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required type="email" onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required type="text" onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className="flex gap-3">
          <input required type="text" onChange={onChangeHandler} name='city' value={formData.city} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required type="text" onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
          <input required type="number" onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required type="text" onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className="flex gap-3">
          <input required type="number" onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
      </div>

      {/* Right Side */}

      <div className="mt-8">
        <div className="mt-8 min-w-8">
          <CartTotal/>
        </div>
        <div className="mt-12">
          <Title text1={'Payment'} text2={'Method'}/>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('gcash')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'gcash' ? 'bg-zinc-700' : ''} `}></p>
              <img className='h-5 mx-4' src={GCASH} />
            </div>
            <div onClick={() => setMethod('paypal')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-zinc-700' : ''} `}></p>
              <img className='h-5 mx-4' src={PAYPAL} />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-zinc-700' : ''} `}></p>
              <p className='text-gray-500 text-sm font-display font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className='bg-black font-display hover:bg-zinc-500 text-white px-16 py-3 text-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
