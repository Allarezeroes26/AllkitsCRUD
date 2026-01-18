import React from 'react'
import Title from '../components/Title'
import Img from '../assets/about.jpg'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div className='mt-15'>
      <div className="text-2xl text-center p-8">
        <Title text1={'About'} text2={'Us'}/>
      </div>

      <div className="font-paragraph my-10 flex flex-col md:flex-row gap-16">
        <div className='flex flex-col'>
          <img src={Img} className='w-full md:max-w-[450px]'/>
          
          <div className='w-100 text-gray-400 text-[0.8rem]'>Photo by <a href="https://unsplash.com/@fazurrehman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Faizur Rehman</a> on <a href="https://unsplash.com/photos/black-iphone-7-beside-black-and-silver-key-iwd_99qV7Uk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></div>
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className='leading-6 tracking-wide'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur voluptatem voluptatibus tempora, necessitatibus delectus optio aliquid eaque nobis consequatur quibusdam vitae laudantium veritatis sapiente similique debitis facere sequi error saepe?</p>
          <p className='leading-6 tracking-wide'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, voluptas autem dolorem eius nulla quibusdam sit incidunt accusantium, est voluptate nostrum ea deleniti hic consequuntur rem sed praesentium perspiciatis corporis.</p>

          <b className='text-gray-800'>Our Mission</b>
          <p className='leading-6 tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam illum quisquam natus odio qui vitae dignissimos dolores ducimus nam optio? Quidem obcaecati nam ipsam saepe quisquam debitis harum nemo? Iusto.</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>

      <div className='flex font-paragraph flex-col md:flex-row text-sm mb-20'>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='leading-6 tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis repellendus praesentium modi aliquam! Eveniet modi optio dolor repudiandae at vero mollitia, eum, similique corporis et natus quod nemo soluta nisi.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className='leading-6 tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis repellendus praesentium modi aliquam! Eveniet modi optio dolor repudiandae at vero mollitia, eum, similique corporis et natus quod nemo soluta nisi.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='leading-6 tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis repellendus praesentium modi aliquam! Eveniet modi optio dolor repudiandae at vero mollitia, eum, similique corporis et natus quod nemo soluta nisi.</p>
        </div>
      </div>

      <Newsletter />
    </div>
  )
}

export default About
