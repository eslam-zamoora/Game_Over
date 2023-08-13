import React from 'react'
import style from './ProtectRoute.module.css'
import {Navigate} from 'react-router-dom'

export default function (props) {

if(localStorage.getItem('userToken') == null){
  return <Navigate to={'/login'}/>
}else{
  return props.children
}


 
}
