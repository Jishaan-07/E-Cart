import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishlistSlice'

const Wishlist = () => {
  const dispatch = useDispatch()
const userWishlist = useSelector(state=>state.wishlistReducer)

  return (
    <>
    <Header/>
    <div style={{paddingTop:'100px'}} className='px-5'>
{  userWishlist?.length>0?

  <>
    <h1 className='text-5xl font-bold text-red-700 '>My Wishlist</h1>
    <div className="grid grid-cols-4 gap-4">
    {   
    userWishlist?.map(product=>(
      <div key={product?.id}  className="rounded border p-2 shadow">
      <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
      <div className="text-center">
        <h3 className='text-xl font-bold'>{product?.title}</h3>
        <div className="flex justify-evenly mt-3">
          <button onClick={()=>dispatch(removeItem(product?.id))} className='text-2xl'><i class="fa-regular fa-trash-can text-red-600"></i></button>
          <button  className='text-2xl'><i class="fa-solid fa-cart-plus text-green-600"></i></button>
        </div>
      </div>
    </div>
    ))
    }
      </div>
    </>
    :
    <div className="flex felx-col justify-center items-center">
      <img style={{height:'400px'}} className='w-100  ' src="https://www.babyday.in/static/media/cart-empty.27846abe.gif" alt="" />
      <h1 className='text-4xl text-red-500 mt-3'>Your Wishlist is empty!!!</h1>
    </div>
    }
    </div>
    </>
  )
}

export default Wishlist