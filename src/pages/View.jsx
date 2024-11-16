import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'

const View = () => {
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const [product,setProduct]=useState({})
  const {id} = useParams()
  console.log(id);
  console.log(product);
  
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])


  const handleWishlist = ()=>{
    const existingProduct=userWishlist?.find(item=>item.id==id)
    if(existingProduct){
      alert("Product already added to wishlist")
    }else{
      alert("product added to wishlist")
      dispatch(addToWishlist(product))
    }
  }


  
  return (
    <>
    <Header/>
    <div className='flex flex-col mx-5'>
      <div className="grid grid-cols-2 items-center h-screen">
        <img className='ms-40' width={'350px'} height={'250px'} src={product?.thumbnail} alt="" />
      
        <div>
        <h3 className='font-bold'>P-ID : {product?.id}</h3>
        <h1 className='text-5xl font-bold text-black'>{product?.title}</h1>
        <h4 className='font-bold text-red-600'>$ {product.price}</h4>
        <h4>Brand : {product?.brand}</h4>
        <p>
          <span className='font-bold'>Description</span>:{product?.description}
        </p>
        <h3 className='font-bold mt-4'>Client Reviews</h3>
          {
            product?.reviews?.length>0?
            product?.reviews?.map(item=>(

              <div key={item?.date} className="shadow border rounded p-2 mb-2">
                <h5>
                  <span className='font-bold'>{item?.reviewerName}</span>: <span>{item?.comment}</span>
                </h5>
                <p>Rating : {item?.rating} <i class="fa-solid fa-star text-yellow-400"></i></p>
              </div>
            ))
            :
            <div className="font-bold text-red-600">No Reviews Yet!!!</div>
          }
              <div className='flex justify-evenly mt-5'>
                  <button onClick={handleWishlist} className='bg-blue-700 rounded p-2 text-white'>Add to Wishlist</button>
                  <button className='bg-green-500 rounded p-2 text-white'>Add to Cart</button>
              </div>    
        </div>

      </div>   
      </div>

    </>
  )
}

export default View