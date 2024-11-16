import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = ({insideHome}) => {

  const userWishlist = useSelector(state=>state.wishlistReducer)
  return (
    <nav className='flex bg-green-500 fixed w-full p-5 text-white font-bold'>
     <Link className='text-3xl' to={'/'}><i class="fa-solid fa-store"></i> Zepto</Link>
     <ul className='flex-1  text-right'>
{   insideHome&&   <li className='list-none inline-block px-5'> <input className='rounded p-1' style={{width:'300px'}} type="text" name="" id="" placeholder='Search Any Products' /></li>
}      <li className='list-none inline-block px-5'><Link to={'/wishlist'}><i  class="fa-solid fa-heart text-red-700" ></i>WishList <span className='bg-black rounded p-1 text-white'>{userWishlist?.length}</span></Link></li>
      <li className='list-none inline-block px-5'><Link to={'/cart'}><i class="fa-solid fa-cart-shopping text-green-600"></i>Cart <span className='bg-black rounded p-1 text-white'>10</span></Link></li>
     </ul>
    </nav>
  )
}

export default Header