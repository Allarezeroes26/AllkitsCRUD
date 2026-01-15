import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title';
import { MdDelete } from "react-icons/md";
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, navigate, currency, cartItems, updateQuantity } = useContext(ShopContext);

  const [ cartData, setCartData ] = useState([])

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const sizeKey in cartItems[productId]) {
        if (cartItems[productId][sizeKey] > 0) {
          tempData.push({
            id: productId,
            size: sizeKey,
            quantity: cartItems[productId][sizeKey]
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);


  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'Your'} text2={'Cart'}/>
      </div>
      <div>
        {cartData.map((item) => {
          const productData = products.find((product) => product.id === item.id)

          if (!productData) return null;

          return (
            <div key={`${item.id}-${item.size}`} className="py-4 font-paragraph border-t border-b text-gray-800 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img className='w-16 sm:w-20' src={productData.image} />
                <div>
                  <p className='text-xs font-display sm:text-lg font-medium'>{productData.title}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    {item.size && item.size !== 'default' && (
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-sm">
                        {item.size}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!value) return;
                  updateQuantity(item.id, item.size, value);
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2"
              />

              <MdDelete onClick={() => updateQuantity(item.id, item.size, 0)} className='text-xl cursor-pointer'/>
            </div>
          )
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className="w-full sm:w-450px">
          <CartTotal/>
          <div className="w-full text-end font-paragraph">
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
