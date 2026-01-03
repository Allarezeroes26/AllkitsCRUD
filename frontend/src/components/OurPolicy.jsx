import React from 'react'
import { FaExchangeAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";

const OurPolicy = () => {
  return (
    <div className='mt-10 flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <FaExchangeAlt className='w-12 m-auto mb-5 text-4xl'/>
        <p className="font-display font-semibold">Easy Exchange Policy</p>
        <p className='text-gray-400 font-paragraph'>We offer hassle free exchange policy</p>
      </div>
      <div>
        <FaCircleCheck className='w-12 m-auto mb-5 text-4xl'/>
        <p className="font-display font-semibold">7 Days Return Policy</p>
        <p className='text-gray-400 font-paragraph'>We provide 7 days free return policy</p>
      </div>
      <div>
        <RiCustomerServiceFill className='w-12 m-auto mb-5 text-4xl'/>
        <p className="font-display font-semibold">Best Customer Support</p>
        <p className='text-gray-400 font-paragraph'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
