import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'

const Home = () => {
  
  const dispatch  = useDispatch()
  const {allProducts,loading,errorMsg}= useSelector(state=>state.productReducer)
  console.log(allProducts,loading,errorMsg);



  // pagination
  const [currentPage,setCurrentPage]=useState(1)
  const productPerPage=8
  const totalPages = Math.ceil(allProducts?.length/productPerPage)
  const currentPageProductLastIndex = currentPage * productPerPage
  const currentPageProductFirstIndex = currentPageProductLastIndex - productPerPage
  const visibleAllProducts =allProducts?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)


  const navigateToNextPage=()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  
  const navigateToPrevPage=()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (

    <>
    <Header insideHome = {true}/>
    <div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
    {
    loading ?
      <div className="flex justify-center items center my-5 text-lg">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-req7OpP8oaMumNbHGb4yDEGOY7X_PtZ4g&s" alt="" />
        Loading...
      </div>
    :
    <>
        <div className="grid grid-cols-4 gap-4">
    {
      allProducts?.length>0 ?
      visibleAllProducts?.map(product=>(
        <div key={product?.id} className="rounded border p-2 shadow">
        <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
        <div className="text-center">
          <h3 className='text-xl font-bold'>{product?.title}</h3>
          <Link to={`/${product?.id}/view`} className='bg-blue-700 rounded p-1 mt-3 text-white inline-block'>View More..</Link>
        </div>
      </div>

    ))
         



          :
          <div className="flex justify-center font-bold text-red-600 items center my-5 text-lg">
              Products Not Found!!
        </div>
          }
        </div>
            <div className="text-2xl text-center font-bold mt-20">
              <span onClick={navigateToPrevPage} className='cursor-pointer'>  <i  class="fa-solid fa-backward me-5"></i></span>
              <span>  {currentPage} of {totalPages} </span>
              <span onClick={navigateToNextPage} className='cursor-pointer'>  <i class="fa-solid fa-forward ms-5"></i></span>
            </div>

     </>
     }
    </div>
    </>
  )
}

export default Home