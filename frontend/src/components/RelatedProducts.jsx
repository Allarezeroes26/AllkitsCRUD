import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'

const RelatedProducts = ({category}) => {

    const { products } = useContext(ShopContext)

    const [ related, setRelated ] = useState([])

    useEffect(() => {
        if(products.length > 0) {
            let productsCopy = products.slice()

            productsCopy = productsCopy.filter((item) => category === item.category)
            setRelated(productsCopy.slice(0, 5))
        }
    }, [products]) 
  return (
    <div className='my-24'>
        <div className='text-center text-3xl pb-10 py-2'>
            <Title text1={'Related'} text2={'Products'}/>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
            {related.map((item) => (
                <ProductItem key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts
