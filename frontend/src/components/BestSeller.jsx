import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        setBestSeller(products.slice(0, 5))
    }, [products])
  return (
    <div className='my-10'>
      <div className="text-center text-3xl py-8">
        <Title text1={'Best'} text2={'Sellers'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base font-paragraph text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eveniet architecto veniam dignissimos magnam aut vero maiores veritatis unde laboriosam, cumque maxime quaerat, autem ratione corporis nobis quo! Veritatis, numquam!</p>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSeller.map((item, index) => (
                <ProductItem key={index} id={item.id} title={item.title} image={item.image} price={item.price}/>
            ))
        }
      </div>

    </div>
  )
}

export default BestSeller
