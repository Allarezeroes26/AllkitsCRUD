import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/shopContext'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [ latestProducts, setLatestProducts ] = useState([]);

    useEffect(() => {

    }, [])

    console.log(products)

    if(!products) return <p>Loading... </p>

  return (
    <div>
      
    </div>
  )
}

export default LatestCollection
