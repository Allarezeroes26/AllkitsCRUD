import React, { useEffect, useState } from 'react'
import { FaFileUpload } from "react-icons/fa";
import axios from 'axios'
import {backendUrl} from '../layout/MainLayout'
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [loading, setLoading] = useState(false)

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("")
  const [sizes, setSizes] = useState([]) 

  const isClothing = ["men's clothing", "women's clothing"].includes(category)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (isClothing && sizes.length === 0) {
      toast.error("Select atleast one size", {
        autoClose: 2000
      })

      return
    }

    if (loading) return

    const toastId = toast.loading("Uploading product")

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      await axios.post(backendUrl + "/api/products/add", formData, {headers: {token}})

      toast.update(toastId, {
        render: "Product added successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000
      })
      
      setTitle("")
      setDescription("")
      setPrice("")
      setCategory("")
      setSizes([])
      setImage1(null)
      setImage2(null)
      setImage3(null)
      setImage4(null)

    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || err.message || "Upload failed",
        type: "error",
        isLoading: false,
        autoClose: 2000
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start overflow-hidden gap-3'>
      <div className='px-7 py-5 font-paragraph'>
        <p className='mb-5 text-xl font-display'>Upload Image</p>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
          {/* Image 1 */}
          <label htmlFor="image1" className='shadow-lg p-4 flex items-center justify-center w-full h-40 border border-gray-200'>
            <div className='w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-110'>
              {!image1 
                ? <FaFileUpload className='w-16 text-3xl text-gray-400' /> 
                : <img src={URL.createObjectURL(image1)} className='w-full h-full object-cover' />}
            </div>
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>

          {/* Image 2 */}
          <label htmlFor="image2" className='shadow-lg p-4 flex items-center justify-center w-full h-40 border border-gray-200'>
            <div className='w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-110'>
              {!image2 
                ? <FaFileUpload className='w-16 text-3xl text-gray-400' /> 
                : <img src={URL.createObjectURL(image2)} className='w-full h-full object-cover' />}
            </div>
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>

          {/* Image 3 */}
          <label htmlFor="image3" className='shadow-lg p-4 flex items-center justify-center w-full h-40 border border-gray-200'>
            <div className='w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-110'>
              {!image3 
                ? <FaFileUpload className='w-16 text-3xl text-gray-400' /> 
                : <img src={URL.createObjectURL(image3)} className='w-full h-full object-cover' />}
            </div>
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>

          {/* Image 4 */}
          <label htmlFor="image4" className='shadow-lg p-4 flex items-center justify-center w-full h-40 border border-gray-200'>
            <div className='w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-110'>
              {!image4 
                ? <FaFileUpload className='w-16 text-3xl text-gray-400' /> 
                : <img src={URL.createObjectURL(image4)} className='w-full h-full object-cover' />}
            </div>
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='px-7 w-full font-paragraph'>
        <p className='font-display mb-3'>Product Name</p>
        <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
      </div>

      <div className='px-7 w-full font-paragraph'>
        <p className='font-display mb-3'>Product Desciption</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write description here' required/>
      </div>

      <div className='px-7 flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div className='font-paragraph'>
          <p className='font-display mb-3'>Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="">Select a Category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <div className='font-paragraph'>
          <p className='font-display mb-3'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-1 sm:w-120px' type="number" />
        </div>
      </div>

      <div className='px-7 font-paragraph mb-4'>
        <p className='font-display mb-3'>Product Sizes</p>

        { ["men's clothing", "women's clothing"].includes(category) ? (
          <div className="flex gap-3">
            {["S", "M", "L", "XL"].map(size => (
              <div
                key={size}
                onClick={() => setSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(item => item !== size)
                    : [...prev, size]
                )}
              >
                <p className={`${sizes.includes(size) ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                  {size}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>The Category selected doesn't have size</p>
        )}
      </div>


      <button type='submit' className='w-28 ml-7 py-3 mb-8 mt-1 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add
