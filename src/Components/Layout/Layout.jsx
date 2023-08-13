import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


export default function ({userData ,setuserData}) {

  let navigate =useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setuserData(null)
    navigate('/login')

  }

  return (
    <>
    <Navbar userData={userData} logout={logout}/>
    <Outlet/>
    
    </>
  )
}
