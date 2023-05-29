import React from 'react'
import styles from './NavBar.module.css'
import logoImg from '../../Assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'


export default function NavBar({ userData, logOut }) {
  return <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="#"><img src={logoImg} to="/" /></Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userData !== null ?
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="product">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categoties">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">Brands</Link>
              </li>
            </ul>
            : null}

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook pointer'></i>
              <i className='fab mx-2 fa-twitter pointer'></i>
              <i className='fab mx-2 fa-instagram pointer'></i>
              <i className='fab mx-2 fa-tiktok pointer'></i>
              <i className='fab mx-2 fa-linkedin pointer'></i>
              <i className='fab mx-2 fa-youtube pointer'></i>
            </li>
            {userData === null ? <><li className="nav-item">
              <Link className="nav-link" to="signin">SignIn</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">Register</Link>
              </li></> : <>
              {/* <li><Link className="nav-link" to="cart"><i class="fa-solid text-success fa-lg fa-cart-shopping"></i></Link></li> */}
              <li className="nav-item">
                <span onClick={logOut} className="nav-link pointer">SignOut</span>
              </li>

            </>

            }


          </ul>
        </div>
      </div>
    </nav>
  </>

}
