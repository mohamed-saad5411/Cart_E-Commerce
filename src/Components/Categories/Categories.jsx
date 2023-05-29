import React, { useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'

export default function Categories() {

  const [categoryList, setcategoryList] = useState([])
  // async function getCategories() {
  //   let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
  //   setcategoryList(data.data)
  // }
  return <>
    <div className='container'>
      <div className="row">

      </div>
    </div>
  </>

}
