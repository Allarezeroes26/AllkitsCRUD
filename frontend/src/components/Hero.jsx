import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* LeftSide */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className="text-zinc-800">
            <p className='w-8 md:w-11 h-[2px] bg-zinc-800'></p>
            <p className='font-bold font-paragraph text-sm md:text-base'>BESTSELLERS</p>
        </div>
        <h1 className="font-paragraph text-3xl sm-py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
        <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-zinc-800'></p>
        </div>
      </div>
    </div>
  )
}

export default Hero
