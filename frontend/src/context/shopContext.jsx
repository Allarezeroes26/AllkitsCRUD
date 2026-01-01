import { createContext, useEffect } from "react";
import { useState } from 'react';
import api from '../api/api'

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('http://localhost:8001/api/products')
                setProducts(response.data)
            } catch (err) {
                console.log('Error Fetching Products: ', err)
            }
        }

        fetchProducts()
    }, [])

    const currency = '₱';
    const delivery_fee = 60;

    const value = {
        products, currency, delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider