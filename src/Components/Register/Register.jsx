import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik , validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Register() {

  let navigate = useNavigate()

  const [isLoading, setisLoading] = useState(false)

  async function handleRegister(values) {
    setisLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)

    if (data.message === "success") {
      setisLoading(false)
      navigate('/SignIn')
    }
    // console.log(data)
  }

  let validation = Yup.object({
    name : Yup.string().required('Name is Required').min(3,'Name minlengh is 3').max(10,'Name is maxlength is 10'), 
    email : Yup.string().required('Email is Required').email('Email must me example@gmail.com'),
    password : Yup.string().required('password is Required').matches(),
    rePassword : Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')],'rePassword must be like password'),
    phone : Yup.string().required('phone is Required').matches(),
  })

  function validate(values) {
    let errors= {}
    // if (!values.name) {
    //   errors.name = "Name is Required"
    // }else if(values.name.length<3 || values.name.length>10) {
    //   errors.name = "Name minlengh is 3 and maxlength is 10"
    // }

    // if (!values.email) {
    //   errors.email = "Email is Required"
    // }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = "Email must me example@gmail.com"
    // }
    


    return errors
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema : validation,
    // validate,
    onSubmit: handleRegister
  })

  return (
    <>
      <div className="container rounded-3 w-75 my-3 p-4 mb-5 pb-5 bg-dark text-white">
        <h3 className='text-center my-3 text-decoration-underline h2'>Register Now :</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* name */}
          <label className='mb-2' htmlFor="name">Name</label>
          <input className='form-control' type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id='name' name='name' />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger my-1'>{formik.errors.name}</div> : null }
          
          {/* email */}
          <label className='mb-2' htmlFor="email">Email</label>
          <input className='form-control' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
          {formik.errors.email || formik.touched.email ? <div className='alert alert-danger my-1'>{formik.errors.email}</div> : null }
          
          {/* password */}
          <label className='mb-2' htmlFor="password">Password</label>
          <input className='form-control' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
          {/* rePassword */}
          <label className='mb-2' htmlFor="rePassword">rePassword</label>
          <input className='form-control' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' />
          {/* phone */}
          <label className='mb-2' htmlFor="phone">Phone</label>
          <input className='form-control' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' />
          {/* Register */}

          {isLoading ? <button type='button' className='btn btn-success mt-3'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button type='submit' disabled={!(formik.dirty && formik.isValid)} className='btn btn-success mt-3'>Register</button>}
        </form>
      </div>
    </>
  )

}
