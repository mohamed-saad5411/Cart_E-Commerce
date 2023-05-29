import { RouterProvider, Routes, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Product from './Components/Product/Product';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { CartContext, CartContextProvider } from './Context/CartContext';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }
  }, [])
  const [userData, setuserData] = useState(null)

  // function protectRoute(props) {
  //   let navigate = useNavigate()
  //   if (localStorage.getItem('userToken') == null) {
  //     navigate('/SignIn')
  //   }else{
  //     return props.children
  //   }
  //   // useEffect(()=>{
  //   // },[])
  // }

  function saveUserData() {
    let encodeToken = localStorage.getItem("userToken")
    let decodeToken = jwtDecode(encodeToken)
    setuserData(decodeToken)
  }

  <protectRoute></protectRoute>
  let routers = createBrowserRouter([
    {
      path: '', element: <Layout setuserData={setuserData} userData={userData} />, children: [
        { index: true, element: <protectRoute><Home /></protectRoute> },
        { path: 'cart', element: <protectRoute><Cart /></protectRoute> },
        { path: 'home', element: <protectRoute><Home /></protectRoute> },
        { path: 'product', element: <protectRoute><Product /></protectRoute> },
        { path: 'categoties', element: <protectRoute><Categories /></protectRoute> },
        { path: 'brands', element: <protectRoute><Brands /></protectRoute> },
        { path: 'register', element: <Register /> },
        { path: 'SignIn', element: <Login saveUserData={saveUserData} /> },
        // {path:'*' , element:<ErrorPage/>},
      ]
    }

  ])


  return (
    <>
      <CartContextProvider>
        <Toaster />
        <RouterProvider router={routers}></RouterProvider>
      </CartContextProvider>
    </>

  )
}

export default App;
