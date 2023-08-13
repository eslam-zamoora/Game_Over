import React, { useState } from 'react'
import style from './Login.module.css'
import {useFormik} from 'formik'
import gameover from '../../asset/gameover.jpg'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'





export default function ({saveUserData}) {

  const [islaoding, setislaoding] = useState(false)
  const [errMsg, seterrMsg] = useState(null)
  let navigate = useNavigate()


  let validation = yup.object({
    
    email:yup.string().required('email is required').email('Email is in-valid'),
    password:yup.string().required('Password is required').min(5 , 'min length is 5 char'),
    
  })

  async function sendDataForLogin(values){
    setislaoding(true)
   let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin` , values).catch((err)=>{
    
   
   console.log(err);
   setislaoding(false)
   seterrMsg(err.response.data.message)
  
  })

   
    if(data.message == 'success'){
      setislaoding(false)
      navigate('/home')
      localStorage.setItem('userToken' , data.token)
      saveUserData()
      
    }
  }


  let formik = useFormik({
    
    initialValues:{
      
      email : '',
      password : '' 
    },
    validationSchema:validation,
    onSubmit: sendDataForLogin
  }) 

  function toRegisterPage(){
    navigate('/register')
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
              <h3 className='text-center'>login Now</h3>
              {errMsg ? 
              <div className='alert bg-danger'>{errMsg}</div> : null}

               



               <input type="email" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='Email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
               {formik.errors.email && formik.touched.email ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.email}</div> : null}
  


               <input type="password" className='form-control bg-dark bg-opacity-25 text-info mt-3' placeholder='Password' email='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/> 
               {formik.errors.password && formik.touched.password ? 
                <div className="alert bg-danger bg-opacity-50">{formik.errors.password}</div> : null}



              

                {islaoding ? 
              <button className='btn btn-danger mt-3 w-100'><i className='fas fa-spinner fa-spin'></i></button>:
              <button className='btn btn-danger mt-3 w-100' disabled={!(formik.isValid && formik.dirty)} type='submit'>Submit</button>

              }


            </form>
            <hr className='w-75 m-auto'/>
            <div className='d-flex align-items-center justify-content-between px-5 mt-3 forgetting'>
              
              <p className='cursor-pointer' onClick={toRegisterPage}>Sign Up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
    
    </>
  )
}
