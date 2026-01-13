import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { products, addToCart } = useContext(ShopContext)
  const { id } = useParams()
  const [productData, setProductData] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizes, setSizes] = useState([])
  const [specs, setSpecs] = useState(null)
  const [material, setMaterial] = useState(null)
  const [weight, setWeight] = useState(null)

  useEffect(() => {
    if (!products.length) return

    const foundProduct = products.find(item => item.id === id)
    if (!foundProduct) return

    setProductData(foundProduct)
    setSelectedSize(null)

    switch (foundProduct.category.toLowerCase()) {
      case "men's clothing":
      case "women's clothing":
        setSizes(foundProduct.sizes || [])
        setSpecs(null)
        setMaterial(null)
        setWeight(null)
        break

      case "electronics":
        setSizes([])
        setSpecs({
          warranty: "1 year",
          brand: foundProduct.title.split(" ")[0],
          connectivity: "USB / SATA"
        })
        setMaterial(null)
        setWeight(null)
        break

      case "jewelery":
        setSizes([])
        setSpecs(null)
        setMaterial("Gold / Silver")
        setWeight("10g")
        break

      default:
        setSizes([])
        setSpecs(null)
        setMaterial(null)
        setWeight(null)
    }
  }, [id, products])


  if (!productData) {
    return <div className="font-paragraph text-center mt-20">Loading Product...</div>
  }

  return (
    <div className="border-t-2 pt-10 max-w-6xl mx-auto min-h-screen px-4">
      <div className="flex flex-col sm:flex-row gap-10">

        {/* Product Image */}
        <div className="sm:w-1/2 flex justify-center">
          <img
            src={productData.image}
            alt={productData.title}
            className="w-full max-w-md h-auto object-contain rounded shadow"
          />
        </div>

        {/* Product Info */}
        <div className="sm:w-1/2 flex flex-col gap-4">
          <h1 className="font-display text-2xl font-medium">{productData.title}</h1>

          <p className="text-gray-500 uppercase font-paragraph tracking-wide text-sm">
            Category: {productData.category}
          </p>

          <p className="text-2xl font-semibold mt-2">₱{productData.price}</p>

          <p className="font-paragraph text-gray-700 mt-2">{productData.description}</p>

          {/* Sizes for Clothing */}
          {sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-600 font-paragraph font-medium mb-2">Select Size:</p>
              <div className="flex gap-2 flex-wrap font-paragraph">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`border px-4 py-2 rounded-lg transition font-display ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="mt-2 font-paragraph text-gray-700 font-medium">
                  Selected Size: {selectedSize}
                </p>
              )}
            </div>
          )}

          {/* Specs for Electronics */}
          {specs && (
            <div className="mt-4">
              <p className="text-gray-600 font-medium mb-2 font-paragraph">Specifications:</p>
              <ul className="list-disc list-inside font-paragraph text-gray-700">
                {Object.entries(specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Material / Weight for Jewelry */}
          {material && weight && (
            <div className="mt-4 text-gray-700 font-paragraph">
              <p>
                <span className="font-semibold">Material:</span> {material}
              </p>
              <p>
                <span className="font-semibold">Weight:</span> {weight}
              </p>
            </div>
          )}

          <button disabled={sizes.length > 0 && !selectedSize} onClick={() => addToCart(productData.id, selectedSize || 'default')} className="mt-6 bg-black text-white font-display font-semibold py-3 px-6 rounded hover:bg-gray-800 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300">
            Add to Cart
          </button>

          <hr className='mt-8 sm:w-4/5'/>
          <div className="font-paragraph font-medium text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20 font-paragraph">
        <div className="flex font-display">
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews: {Math.floor(Math.random() * 50) + 500}</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>AllKit is more than just a store; it’s a complete lifestyle destination designed to make shopping effortless, enjoyable, and inspiring. At AllKit, we believe in bringing the best products from across the globe right to your fingertips, combining quality, variety, and convenience under one roof.</p>
        </div>
      </div>

      <RelatedProducts category={productData.category}/>
    </div>
  )
}

export default Product
