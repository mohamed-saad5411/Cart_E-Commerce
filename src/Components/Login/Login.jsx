import React, { useState } from 'react'
import styles from './Login.module.css'
import { useFormik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login({saveUserData}) {

  // console.log(props.userdata);
  let navigate = useNavigate()

  const [isLoading, setisLoading] = useState(false)

  async function handleLogin(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token)
      saveUserData()
      setisLoading(false)
      navigate('/')
    }
    // console.log(data.token)
  }

  let validation = Yup.object({
    email: Yup.string().required('Email is Required').email('Email must me example@gmail.com'),
    password: Yup.string().required('password is Required').matches(),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    // validate,
    onSubmit: handleLogin
  })

  return (
    <>
      <div className="container rounded-3 w-75 my-3 p-4 bg-dark text-white">
        <h3 className='text-center my-3 text-decoration-underline h2'>Login Now :</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* email */}
          <label className='mb-2' htmlFor="email">Email</label>
          <input className='form-control' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
          {formik.errors.email || formik.touched.email ? <div className='alert alert-danger my-1'>{formik.errors.email}</div> : null}

          {/* password */}
          <label className='mb-2' htmlFor="password">Password</label>
          <input className='form-control' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />

          {/* Register */}
          {isLoading ? <button type='button' className='btn btn-success mt-3'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button type='submit' disabled={!(formik.dirty && formik.isValid)} className='btn btn-success mt-3'>Register</button>}
        </form>
      </div>    </>


  )

}
