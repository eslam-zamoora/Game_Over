import React, { useState } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import gameover from '../../asset/gameover.jpg'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




export default function () {

  const [islaoding, setislaoding] = useState(false)
  const [errMsg, seterrMsg] = useState(null)
  let navigate = useNavigate()


  let validation = yup.object({
    name:yup.string().required('name is reqired').min(4 , 'min length is 4 letters').max(15 , 'max length is 15 letters'),
    email:yup.string().required('email is required').email('Email is in-valid'),
    password:yup.string().required('Password is required').min(5 , 'min length is 5 char'),
    rePassword:yup.string().required('RePassword id required').oneOf([yup.ref('password')] , 'Passwords are not match'),
    phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'phone is in-valid in Egypt')
  })

  async function sendData(values){
    setislaoding(true)
   let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).catch((err)=>{
    
   
   console.log(err);
   setislaoding(false)
   seterrMsg(err.response.data.message)
  
  })

   
    if(data.message == 'success'){
      setislaoding(false)
      navigate('/login')
    }
  }


  let formik = useFormik({
    
    initialValues:{
      name : '',
      email : '',
      password : '' ,
      rePassword : '' ,
      phone : ''
    },
    validationSchema:validation,
    onSubmit: sendData
  }) 

  function tologinPage(){
    navigate('/login')
  }



  return (
    <>
    
  <div className="container">
  <div className='my-5 p-2 register'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5 d-md-block d-sm-none">
            <div className="img">
                <img src={gameover} alt='' className='w-100'/>
            </div>
          </div>
          <div className="col-md-7">
            <form onSubmit={formik.handleSubmit} className='p-4'>
              <h3 className='text-center'>Register Now</h3>
              {errMsg ? 
              <div className='alert bg-danger'>{errMsg}</div> : null}

               <input type="text" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='Name' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.errors.name && formik.touched.name ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.name}</div> : null}



               <input type="email" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='Email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
               {formik.errors.email && formik.touched.email ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.email}</div> : null}
  


               <input type="password" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='Password' email='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
               {formik.errors.password && formik.touched.password ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.password}</div> : null}



               <input type="password" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='RePassword' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
               {formik.errors.rePassword && formik.touched.rePassword ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.rePassword}</div> : null}

               <input type="tel" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='Phone' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
               {formik.errors.phone && formik.touched.phone ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.phone}</div> : null}

                {islaoding ? 
              <button className='btn btn-danger mt-3 w-100'><i className='fas fa-spinner fa-spin'></i></button>:
              <button className='btn btn-danger mt-3 w-100' disabled={!(formik.isValid && formik.dirty)} type='submit'>Submit</button>

              }


            </form>

            <hr className='w-75 m-auto'/>
            <div className='d-flex mt-3 forgetting'>
              
              <span className='ms-5'>have an account !    </span><p className='cursor-pointer ms-3 text-danger' onClick={tologinPage}>Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    </>
  )
}
