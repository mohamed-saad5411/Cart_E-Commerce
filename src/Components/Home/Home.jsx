import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import { date } from 'yup';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {

  let {addToCart} = useContext(CartContext)
  const [productListSlider, setproductListSlider] = useState([])
  const [allProductsList, setallProductsList] = useState([])

  async function getProductsSlider() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setproductListSlider(data.data)
    // console.log(data.data);
  }

  async function getAllProducts() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    setallProductsList(data.data)
    // console.log(data.data);
  }

  async function addProduct(productId) {
    let response = await addToCart(productId)
    if (response.data.status === "success") {
      toast.success(response.data.message , {duration:1000})
    }
    // console.log(response);
  }

  useEffect(() => {
    getProductsSlider()
    getAllProducts()
  }, [])

  return (
    <>
      <div className="container my-5 py-5">
        <div className="row gx-0 justify-content-center">
          {productListSlider.map((product) =>
            <div className="col-md-1">
              <img height={100} className='w-100 rounded-' src={product.image} alt="" />
              {/* <h1 className='h6 text-muted my-3 text-center'>{product.name}</h1> */}
            </div>
          )}
        </div>
      </div>
      <div className="container mb-5 pb-5">
        <div className="row gy-5">
          {allProductsList.map((product) =>
            <div key={product._id} className="col-md-2 product pointer p-2 position-relative">
              <img className='w-100 mb-2' src={product.imageCover} alt="" />
              <h2 className='h6 text-success font-sm'>{product.category.name}</h2>
              <h2 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
              <div className='d-flex justify-content-between'>
                <div><p>{product.price} EGP</p></div>
                <div className='d-flex align-items-top'>
                  <span><i className='fa-solid fa-star fa-sm pe-1 text-warning'></i></span><p className='text-muted'>{product.ratingsAverage}</p>
                </div>
              </div>
              {/* {console.log(product._id)} */}
              <button onClick={()=> addProduct(product._id) } className='btn btn-custom btn-success w-100'>+ Add</button>
            </div>
          )}
        </div>
      </div>
    </>
  )

}
