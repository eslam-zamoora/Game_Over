import React, { useEffect, useState } from 'react'
import style from './Home.module.css'

import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'



export default function () {

  const [isLadingPade, setisLadingPade] = useState(true)

  

  let navigate = useNavigate()
  function toAllGames(){
    navigate('/Allgames')
  }

  const [specificgame1, setspecificgame1] = useState(null)
  const [specificgame2, setspecificgame2] = useState(null)
  const [specificgame3, setspecificgame3] = useState(null)


  const options1 = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: '11'},
    headers: {
      'X-RapidAPI-Key': '7ec89a45e3msh3c78dd36418122ep149c90jsn02a9e2fca153',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const options2 = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: '12'},
    headers: {
      'X-RapidAPI-Key': '7ec89a45e3msh3c78dd36418122ep149c90jsn02a9e2fca153',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const options3 = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: '15'},
    headers: {
      'X-RapidAPI-Key': '7ec89a45e3msh3c78dd36418122ep149c90jsn02a9e2fca153',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  async function getspecific1(){
    let {data} = await axios.request(options1)
    setspecificgame1(data)
    setisLadingPade(false)
    
  }
  async function getspecific2(){
    let {data} = await axios.request(options2)
    setspecificgame2(data)
    setisLadingPade(false)

    
  }
  async function getspecific3(){
    let {data} = await axios.request(options3)
    setspecificgame3(data)
    setisLadingPade(false)

    
  }

  useEffect(()=>{
    getspecific1()
    getspecific2()
    getspecific3()

  }, [])

 


  return (
    <>
    
    <div className='home-top text-center'>
      
      <div className="layout">
      <div className="text">
      <h2 className='text-danger'>Find & track the best <span className='text-info'>free-to-play</span> games!</h2>
      <p className='text-info fs-5'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
      <button className='btn btn-secondary' onClick={toAllGames}>Browse Games</button>
      </div>
      </div>

    </div>

    
     <div className="personal p-5 bg-body-color">
     <div className="container">
     <h3 className='text-muted h2 mb-3'><i className='fas fa-robot fs-1 me-3'></i>Personalized Recommendations</h3>

    { isLadingPade ? <div className='w-100 vh-100 position-relative'>
      <div className="sk-chase position-absolute top-0 start-50">
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
</div>
    </div> :  
     <div className="row row-cols-md-3 row-cols-sm-1 row-cols-xsm-1 gy-5">
     <div className="col">
     <Link className='text-decoration-none' to={`/gamedetails/${specificgame1?.id}`}>
     <div className="box" >
         <img src={specificgame1?.thumbnail} alt='' className='w-100'/>
         <h2 className='mt-2 text-center'>{specificgame1?.title}</h2>
       </div>
       </Link>
       
     </div>
     <div className="col">
     <Link className='text-decoration-none' to={`/gamedetails/${specificgame2?.id}`}>
     <div className="box">
         <img src={specificgame2?.thumbnail} alt='' className='w-100'/>
         <h2 className='mt-2 text-center'>{specificgame2?.title}</h2>
       </div>
       </Link>
       
     </div>
     <div className="col">
     <Link className='text-decoration-none' to={`/gamedetails/${specificgame3?.id}` }>
     <div className="box">
         <img src={specificgame3?.thumbnail} alt='' className='w-100'/>
         <h2 className='mt-2 text-center'>{specificgame3?.title}</h2>
       </div>
       </Link>
       
     </div>
   </div> }
    
     
     </div>
   </div>
    
   
    
    </>
  )
}
