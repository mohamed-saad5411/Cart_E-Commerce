import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'


export default function Brands() {

  const [brandList, setbrandList] = useState([])

  async function getBrands() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setbrandList(data.data)
  }

  useEffect(() => {
    getBrands()
  }, [])

  return <>
    <div className='container'>
      <div className="row">
        {brandList.map((brand)=>
          <div className="col-md-2">
            <img className='w-100' src={brand.image} alt="" />
          </div>
        )}
      </div>
    </div>
  </>

//   <div className="row gy-5">
//   {allProductsList.map((product) =>
//     <div className="col-md-2 product pointer p-2 position-relative">
//       <img className='w-100 mb-2' src={product.imageCover} alt="" />
//     </div>
//   )}
// </div>

}
