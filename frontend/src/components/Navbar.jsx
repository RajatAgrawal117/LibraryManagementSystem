import React from 'react'
import { Link } from 'react-router-dom'
import icon from "../assets/icon.png"
const isLoggedIn = !!localStorage.getItem('token');
// const handleLogout ={

// }
const Navbar = () => {
  return (
    <div className=' flex flex-row justify-between w-full p-2 text text-2xl  '>
        <div className=' flex flex-row gap-6 items-center'>
        <img src={icon} alt="icon" className='h-10 w-auto'/>
       <p className=' '>Public Library</p>

        </div>
       <div className=' flex  align-middle  '>
        
       {
  isLoggedIn ? (
    <button className="p-4 align-middle">Logout</button>
  ) : (
    <Link to='/signin' className='p-4 align-middle'>Sign In</Link>
  )
}
<Link to="/User" className='p-4 align-middle' >User </Link>

        <Link to='/Home' className='p-4 align-middle'>Home</Link>
       </div>
        </div>
  )
}

export default Navbar