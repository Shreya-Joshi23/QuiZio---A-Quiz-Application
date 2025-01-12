import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' bg-black flex flex-col justify-center items-center'>
      <h1 className='text-white'>Made with ❤️ by <b>Shreya Joshi</b></h1>
      <br />
      <div>
      <Link to="https://www.linkedin.com/in/shreyajoshi23/" className='text-blue-700 m-2'>LinkedIn</Link>
      <Link to="https://x.com/ShreyaJoshi43" className='text-blue-700 m-2'>Twitter</Link>
      <Link to="https://www.instagram.com/shreya_joshi095/" className='text-blue-700 m-2'>Instagram</Link>
      </div>
      
      <footer className="mt-2 text-center text-white text-sm">
        <p className='font-semibold'>© 2025 QuiZio.</p>
      </footer>
    </div>
  )
}

export default Footer
