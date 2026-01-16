import React, { useState } from 'react'
import { FaFileUpload } from "react-icons/fa";
import axios from 'axios'
import { backendUrl } from '../layout/MainLayout'
import { toast } from 'react-toastify'

const AVAILABLE_SIZES = ["S", "M", "L", "XL"]

const Add = ({ token }) => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([null, null, null, null])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [sizes, setSizes] = useState([])

  const isClothing = ["men's clothing", "women's clothing"].includes(category)

  const handleImageChange = (index, file) => {
    setImages(prev => {
      const copy = [...prev]
      copy[index] = file
      return copy
    })
  }

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isClothing && sizes.length === 0) {
      toast.error("Select at least one size", { autoClose: 2000 })
      return
    }
    if (loading) return

    const toastId = toast.loading("Uploading product...")

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("sizes", JSON.stringify(sizes))
      images.forEach((img, idx) => img && formData.append(`image${idx + 1}`, img))

      await axios.post(backendUrl + "/api/products/add", formData, {
        headers: { token }
      })

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
      setImages([null, null, null, null])

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
    <div className="px-10 py-6 font-paragraph w-full overflow-x-auto">
      <h2 className="text-2xl font-display font-semibold mb-6">Add New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {images.map((img, idx) => (
          <label key={idx} htmlFor={`image-${idx}`} className="border rounded-lg flex items-center justify-center h-32 cursor-pointer hover:shadow-md transition">
            {img ? (
              <img src={URL.createObjectURL(img)} alt={`Upload ${idx+1}`} className="w-full h-full object-cover rounded-lg"/>
            ) : (
              <FaFileUpload className="text-gray-400 text-3xl"/>
            )}
            <input type="file" id={`image-${idx}`} hidden onChange={e => handleImageChange(idx, e.target.files[0])} />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-6"
        rows={4}
      />

      {isClothing && (
        <div className="flex gap-3 mb-6">
          {AVAILABLE_SIZES.map(size => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 rounded cursor-pointer border transition ${
                sizes.includes(size) ? "bg-black text-white border-black" : "bg-gray-100 border-gray-300 hover:border-black"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onSubmitHandler}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  )
}

export default Add
