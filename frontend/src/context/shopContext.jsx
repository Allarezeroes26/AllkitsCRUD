import { createContext, useEffect } from "react";
import { useState } from 'react';
import api from '../api/api'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {

    const [products, setProducts] = useState([])

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
    const [ search, setSearch ] = useState('');
    const [ showSearch, setShowSearch ] = useState(true)
    const [ cartItems, setCartItem ] = useState({})
    const navigate = useNavigate()

    const addToCart = (id, size = 'default') => {
        const cartData = structuredClone(cartItems)

        if (!cartData[id]) {
            cartData[id] = {}
        }

        if (cartData[id][size]) {
            cartData[id][size] += 1
        } else {
            cartData[id][size] = 1
        }

        setCartItem(cartData)

        const product = products.find(p => p.id === id)
        const sizeText = size && size !== "default" ? `(${size})` : "";

        toast.success(`${product.title}${sizeText} Added to Cart!`, {
            className: 'bg-black text-white font-display px-4 py-2 rounded-lg shadow-lg',
            progressClassName: 'bg-white',
            autoClose: 1500,
            position: 'bottom-right'
        });
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }

        return totalCount;
    }

    const updateQuantity = (id, size, quantity) => {
        const cartData = structuredClone(cartItems);
        
        if (!cartData[id]) cartData[id] = {};

        const product = products.find(p => p.id === id);
        const sizeText = size ? ` (${size})` : '';

        if (quantity === 0) {
            delete cartData[id][size];
            if (Object.keys(cartData[id]).length === 0) delete cartData[id];

            toast.info(`${product.title}${sizeText} removed from cart`, {
                className: 'bg-red-600 text-white font-display px-4 py-2 rounded-lg shadow-lg',
                progressClassName: 'bg-white',
                autoClose: 1500,
                position: 'bottom-right'
            });
        } else {
            cartData[id][size] = quantity;

            toast.success(`${product.title}${sizeText} quantity updated`, {
                className: 'bg-gray-800 text-white font-paragraph px-4 py-2 rounded-lg shadow-lg',
                progressClassName: 'bg-white',
                autoClose: 1500,
                position: 'bottom-right'
            });
        }

        setCartItem(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for(const items in cartItems) {
            let itemInfo = products.find((p) => p.id === Number(items));
            for(const item in cartItems[items]){
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }

        return totalAmount;
    }


    const value = {
        products, navigate, getCartAmount, updateQuantity, getCartCount, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider