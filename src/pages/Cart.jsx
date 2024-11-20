import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../redux/slices/cartSlice'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const userCart =  useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal]=useState(0)


  useEffect(()=>{
    if(userCart?.length>0){
      setCartTotal(userCart?.map(item=>item.totalPrice).reduce((a,b)=>a+b))
    }
  },[userCart])


  const handleDecrementQuantity =(product)=>{
    if(product?.quantity>1){
      dispatch(decrementQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const checkout = ()=>{
    dispatch(emptyCart())
    alert("Congrats!!! Order On The Way To Your Home")
    // redirect to your home 
    navigate("/")
  }

  return (
    < >
    <Header/>
      <div className="px-5" style={{paddingTop:'100px'}}>
{  
userCart?.length>0?  
      <>
      <h1 className='text-5xl font-bold text-green-800'>Cart Summary</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="col-span-2 border rounded p-5 shadow">
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <td className='font-semibold'>#</td>
                <td className='font-semibold'>Name</td>
                <td className='font-semibold'>Image</td>
                <td className='font-semibold'>Quantity</td>
                <td className='font-semibold'>Price</td>
                <td className='font-semibold'>...</td>
              </tr>
            </thead>
            <tbody>
        {
          userCart?.map((product,index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{product?.title}</td>
            <td><img width={'70px'} height={'70px'} src={product?.thumbnail} alt="" /></td>
            <td><div className="flex">
              <button onClick={()=>handleDecrementQuantity(product)}   className='font-bold'>-</button>
              <input type="text" readOnly style={{width:'40px'}} className='border p-1 rounded mx-5' value={product?.quantity} />
              <button onClick={()=>dispatch(incrementQuantity(product?.id))} className='font-bold'>+</button>
              </div></td>
            <td>$ {product?.totalPrice}</td>
            <td> <button onClick={()=>dispatch(removeCartItem(product?.id))}><i class="fa-regular fa-trash-can text-red-500"></i></button></td>
          </tr>
          ))

              } 
            </tbody>
          </table>
          <div className="float-right mt-5">
            <button onClick={()=>dispatch(emptyCart())} className='bg-red-700 rounded p-2 text-white'>Empty Cart</button>
            <Link to={'/'} className='bg-blue-800 rounded p-2 text-white ms-2'> Shop More</Link>
          </div>
        </div>
        <div className="col-span-1">
          <div className="border rounded shadow p-5">
            <h2 className='text-2xl font-bold my-4'>Total Amount : <span className='text-red-600'>${cartTotal}</span></h2>
            <hr />
            <button onClick={checkout} className="bg-blue-700 rounded p-2 text-xl text-white w-full mt-4">Check Out</button>
          </div>
        </div>
      </div>
      </>
      :
      <div className="flex felx-col justify-center items-center">
      <img style={{height:'400px'}} className='w-100  ' src="https://www.babyday.in/static/media/cart-empty.27846abe.gif" alt="" />
      <h1 className='text-4xl text-red-500 mt-3'>Your cart is empty!!!</h1>
    </div>
    }


      </div>
  
    </>
  )
}

export default Cart