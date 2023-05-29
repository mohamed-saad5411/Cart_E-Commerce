import React from 'react'
import styles from './Layout.module.css'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function Layout({userData , setuserData}) {

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken')
    setuserData(null)
    navigate('/SignIn')
  }
  return (
    <>
      <NavBar logOut={logOut} userData={userData}/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}
