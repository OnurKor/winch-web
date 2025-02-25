import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row h-16 bg-white  md:justify-between items-center justify-center text-lightkozy font-medium px-4 text-sm  py-4 '>
     <div>2025© quatro</div>
     <div className='flex gap-4 '>
        <Link to="https://quatrowinch.com/">Quatro Winch | Her Duruma Hazırlıklı Ol</Link>
     </div>
    </div>
  )
}

export default Footer
