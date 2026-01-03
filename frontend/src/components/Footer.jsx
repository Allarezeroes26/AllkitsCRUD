import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">
        <div>
            <h1 className="mb-5 text-xl w-32 font-display">Menskit</h1>
            <p className='w-full md:w-2/3 text-gray-600 font-paragraph'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quam alias facilis, aliquam dolorum maiores quaerat, voluptate tenetur consequuntur exercitationem explicabo. Vel adipisci repudiandae molestiae asperiores ad dolorum eaque iure?</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 font-display'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600 font-paragraph'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 font-display'>Get In Touch</p>
            <ul className='flex flex-col gap-1 font-paragraph text-gray-600'>
                <li>+6-391-345-6789</li>
                <li>contactme@contactme.com</li>
            </ul>
        </div>
      </div>
        <div>
            <hr />
            <p className='py-5 font-paragraph text-sm text-center'>Copyright 2025@ <span className='font-display font-bold'>menskit.com</span> - All Rights Reserved </p>
        </div>
    </div>
  )
}

export default Footer
