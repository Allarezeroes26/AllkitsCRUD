import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title';
import { IoIosArrowDropdown } from "react-icons/io";
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [ showFilter, setShowFilter ] = useState(false)
  const [ filterProducts, setFilterProducts ] = useState([])
  const [ category, setCategory ] = useState([])
  const [ sortType, setSortType ] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(prev => prev.title.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    setFilterProducts(products);
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, search, showSearch])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center font-paragraph cursor-pointer gap-2'>Filters
          <IoIosArrowDropdown className={`h-3 sm:hidden rotate-270 ${showFilter ? 'rotate-360' : ''}`}/>
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='font-paragraph mb-3 text-sm font-medium'>Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" value={`men's clothing`} className='w-3' />Men's Clothing
              {/* api: men's clothing */}
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" value={'jewelery'} className='w-3' />Jewelery
              {/* api: jewelery */}
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" value={'electronics'} className='w-3' />Electronics
              {/* api: electronics */}
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} type="checkbox" value={`women's clothing`} className='w-3' />Women's Clothing
              {/* api: women's clothing */}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={`Products`}/>
          <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item) => (
              <ProductItem key={item.id || item._id} title={item.title} id={item.id || item._id} price={item.price} image={item.images?.[0] || item.image}/>
            ))
          }
        </div>
        
      </div>

    </div>
  )
}

export default Collection
