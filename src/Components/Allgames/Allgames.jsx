import React from 'react'
import style from './Allgames.module.css'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';



export default function () {


  const [allGames, setallGames] = useState([])
  const [isLoadingPage, setisLoadingPage] = useState(true)

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    params: {tag: '3d.mmorpg.fantasy.pvp', platform: 'pc'},
    headers: {
      'X-RapidAPI-Key': '7ec89a45e3msh3c78dd36418122ep149c90jsn02a9e2fca153',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  async function getallgames(){
    setisLoadingPage(true)
    let {data} = await axios.request(options)
    setallGames(data)
    setisLoadingPage(false)
    // console.log(data);
  }

  useEffect(()=>{
    getallgames()
    
    
  }, [])

  return (
    <>
    {isLoadingPage? <div className='w-100 vh-100 position-relative'>
      <div className="sk-chase position-absolute top-50 start-50">
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
</div>
    </div>:
    <div className="all mt-5">
    <div className="container">
      <div className="row row-cols-md-3 row-cols-sm-2 row-cols-lg-4 gy-5">
        
          {allGames.map((game)=><div key={game.id} className='col'>


            <Link className='text-decoration-none' to={`/gamedetails/${game.id}`}>
            <div className="box pb-2">
                <img src={game.thumbnail} alt=''  className='w-100'/>
                <div className="title d-flex justify-content-between align-items-center ps-3 pt-2">
                  <h3 className='overflow-x-hidden h6 text-dark'>{game.title.split(' ').slice(0,3).join(' ')}</h3> <span className='me-3 bg-primary rounded p-1 fs-sm bg-opacity-50 text-dark'>free</span>
                </div>
                <div className="descrioption overflow-x-hidden fs-sm ps-3">
                {game.short_description}
                  
                </div>
                
                <div className="d-flex justify-content-between ps-1 pe-1 mt-4">
                <i className="fas fa-plus-square"></i>
                <div className="d-flex justify-content-between align-items-center me-1">
                <span className="badge badge-secondary text-dark badge-genre red-color ms-1 me-2">{game.genre}</span>
                <i className='fab fa-windows'></i>
                </div>

                </div>

               
           </div>


            </Link>
          
            
            
            </div>
            )}
        </div>

      
    </div>
  </div>
    
    }
    
    
    
    </>
  )
}
