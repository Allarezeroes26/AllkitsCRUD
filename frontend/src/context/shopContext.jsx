import { createContext, useEffect } from "react";
import { useState } from 'react';
import api from '../api/api'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const currency = '₱';
    const delivery_fee = 60;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [ search, setSearch ] = useState('');
    const [ showSearch, setShowSearch ] = useState(true)
    const [ cartItems, setCartItem ] = useState({})
    const [ products, setProducts ] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (id, size = 'default') => {
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
        if (!product) return
        const sizeText = size && size !== "default" ? `(${size})` : "";

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {productId: id, size}, {headers: {token: token}})
            } catch (err) {
                console.error(err)
                toast.error(err.response?.data?.message || err.message)
            }
        }

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

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list')

            if (response.data.success) {
            const normalized = response.data.products.map(p => ({
                id: p._id,
                title: p.title,
                price: p.price,
                category: p.category,
                image: p.images?.[0],
                description: p.description,
                sizes: p.sizes,
                raw: p
            }))

            setProducts(normalized)
            } else {
            toast.error(response.data.message)
            }
        } catch (err) {
            console.error(err)
            toast.error(err.message)
        }
        }

        const getUserCart = async (token) => {
            if (!token) return;

            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/get',
                    {},
                    { headers: { token: token } }
                );

                if (response.data.success) {
                    setCartItem(response.data.cartData);
                }

            } catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || err.message);
            }
        };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            getUserCart(savedToken);
        }
    }, []);



    useEffect(() => {
        getProductsData()
    }, [])


    const updateQuantity = async (id, size = 'default', quantity) => {
        const finalSize = size || 'default'; // 🚨 KEY LINE

        const cartData = structuredClone(cartItems);

        if (!cartData[id]) cartData[id] = {};

        const product = products.find(p => p.id === id);
        if (!product) return;

        const sizeText = finalSize !== 'default' ? ` (${finalSize})` : '';

        if (quantity === 0) {
            delete cartData[id][finalSize];

            if (Object.keys(cartData[id]).length === 0) {
                delete cartData[id];
            }

            toast.info(`${product.title}${sizeText} removed from cart`, {
                className: 'bg-red-600 text-white font-display px-4 py-2 rounded-lg shadow-lg',
                progressClassName: 'bg-white',
                autoClose: 1500,
                position: 'bottom-right'
            });
        } else {
            cartData[id][finalSize] = quantity;

            toast.success(`${product.title}${sizeText} quantity updated`, {
                className: 'bg-gray-800 text-white font-paragraph px-4 py-2 rounded-lg shadow-lg',
                progressClassName: 'bg-white',
                autoClose: 1500,
                position: 'bottom-right'
            });
        }

        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {productId: id, size, quantity}, { headers: {token: token} })
            } catch (err) {
                console.log(err)
                toast.error(err.message)
            }
        }
    };


    const getCartAmount = () => {
        let totalAmount = 0;

        for (const productId in cartItems) {
            const itemInfo = products.find(
            (p) => String(p.id) === String(productId)
            );

            if (!itemInfo) continue; // 🔥 prevent crash

            for (const size in cartItems[productId]) {
            const qty = cartItems[productId][size];
            if (qty > 0) {
                totalAmount += itemInfo.price * qty;
            }
            }
        }

        return totalAmount;
        };


    const value = {
        products, setCartItem, setToken, token, backendUrl, navigate, getCartAmount, updateQuantity, getCartCount, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider