import styles from './Cart.module.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function Cart() {

  let { getLoggedCart , removeProductFromCart , increaseProduct } = useContext(CartContext)
  const [cartUserData, setcartUserData] = useState([])

  async function showCartProducts() {
    let response = await getLoggedCart()
    if (response?.data?.status === 'success') {
      setcartUserData(response.data.data)
      // console.log(cartUserData.product);
    }
  }

  async function deleteProductFromCart(productId) {
    let response = await removeProductFromCart(productId)
    // console.log(response);
    toast.error('Product is removed' , {duration:2000})
    setcartUserData(response.data.data)
  }
  
  async function addMoreOneProduct(productId , count) {
    let response = await increaseProduct(productId , count)
    toast.success('Product is Updated' , {duration:2000})
    setcartUserData(response.data.data)
  }

  useEffect(() => {
    showCartProducts()
  }, [])
  return (
    <>
      <div className="container p-3">
        <h2 className='text-decoration-underline'>Shop Cart :</h2>
        {cartUserData !== null ? <>
          <h2 className='h5 mb-4 text-success'>Total Price : { cartUserData.totalCartPrice }  EGP</h2>
          <div className='row justify-content-between align-items-center'>
            {cartUserData?.products?.map((product) =>
              <>
                <div className='bg-light rounded-3 p-2 m-3 d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <img src={product.product.imageCover} height={180} className='p-2' alt="" />
                    <div className='p-3'>
                      <h2 className='h5'>Product Name : {product.product.title} </h2>
                      <p className='text-success'>Product Price : {(product.price)} EGP</p>
                      {product.count > 1 ? <p className='text-success'>Total Product Price : {(product.price) * (product.count)} EGP</p> : null}
                      <button onClick={()=> deleteProductFromCart(product.product._id)} className='btn text-danger'><span><i class="fa-solid fa-trash"></i></span> Remove From Cart</button>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <button onClick={()=> addMoreOneProduct(product.product._id , product.count + 1)} className='btn btn-outline-success btn- m-2'><span>+</span></button>
                    <p className='mb-0 px-3'>{product.count}</p>
                    <button onClick={()=> addMoreOneProduct(product.product._id , product.count - 1)} className='btn btn-outline-success btn- m-2'><span>-</span></button>
                  </div>
                </div>
              </>
            )}

          </div>
        </>

          : null}
      </div>

    </>
  )

}
