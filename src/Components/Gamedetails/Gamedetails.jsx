import React, { useEffect, useState } from 'react'
import style from './Gamedetails.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'



export default function () {
  const [isLoadingPage, setisLoadingPage] = useState(true)

  let params =useParams()
  // console.log(params.id);

  const [gamedetails, setgamedetails] = useState(null)


  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: `${params.id}`},
    headers: {
      'X-RapidAPI-Key': '7ec89a45e3msh3c78dd36418122ep149c90jsn02a9e2fca153',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  async function getgameDeatails(){
    let {data} = await axios.request(options)
    setgamedetails(data)
    setisLoadingPage(false)
    // console.log(data);
  }

  useEffect(()=>{
    getgameDeatails()

  }, [])

  let navigate = useNavigate()
  function closetab(){
    navigate(-1)
  }

  const settings = {
    arrows :false ,
    dots: false,
    pauseOnHover: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    fade: true,
    variableWidth: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <>
      {isLoadingPage ? <div className='w-100 vh-100 position-relative'>
      <div className="sk-chase position-absolute top-50 start-50">
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
</div>
    </div> :
      
      <div className="container p-2 rounded box-shadow3 game-details position-relative">
      <span onClick={closetab} className='position-absolute end-0 top-0 mt-3 me-3 cursor-pointer'><i className='fas fa-close fs-4'></i></span>
      <div className="row">
        <div className="col col-lg-5 col-md-12 mt-2">
        <div className="img rounded overflow-hidden">
        <img src={gamedetails?.thumbnail} alt='' className='w-100'></img>
        </div>
        <div className="row gx-3">
          <div className="col-6 mt-2">
            <button className='btn btn-secondary w-100'>Free</button>
          </div>
          <div className="col-6 mt-2">
          <button className='btn btn-info w-100'>Play Now</button>

          </div>
        </div>
        </div>
        <div className="col col-lg-7 col-md-12">
          <div className="text text-light">
            <h2 className='mt-2'>{gamedetails?.title}</h2>
            <span className=''>About {gamedetails?.title}</span>
            <p className=' fs-sm'>{gamedetails?.description}</p>
            <h5 className='ms-3'>Minimum System Requirements</h5>

            {gamedetails.minimum_system_requirements ?
            <ul className='mt-4'>
            <li className='fs-sm'><p><span className='fs-5'>graphics : </span>{gamedetails?.minimum_system_requirements.graphics}</p></li>
            <li className='fs-sm'><p><span className='fs-5'>memory  : </span>{gamedetails?.minimum_system_requirements.memory}</p></li>
            <li className='fs-sm'><p><span className='fs-5'>os : </span>{gamedetails?.minimum_system_requirements.os}</p></li>
            <li className='fs-sm'><p><span className='fs-5'>processor : </span>{gamedetails?.minimum_system_requirements.processor}</p></li>
            <li className='fs-sm'><p><span className='fs-5'>storage : </span>{gamedetails?.minimum_system_requirements.storage}</p></li>
          </ul> : null }
            
            <h5 className='mt-5'>Elvenar Screenshots</h5>
            <Slider {...settings}>

            {gamedetails?.screenshots.map((img)=> <div className='mt-2 rounded overflow-hidden' key={img.id}> <img src={img.image} alt='' className='w-100' /> </div>)}

            </Slider>

            <h4 className='mt-4'>Additional Information</h4>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
              <div className="col">
                <div className="txt mt-3">
                  <p className='text-info'>Title</p>
                  <span className='fs-sm mt-0'>{gamedetails?.title}</span>
                </div>
              </div>
              <div className="col">
                <div className="txt mt-3">
                  <p className='text-info'>Developer</p>
                  <span className='fs-sm mt-0'>{gamedetails?.developer}</span>
                </div>
              </div>
              <div className="col">
                <div className="txt mt-3">
                  <p className='text-info'>Publisher</p>
                  <span className='fs-sm mt-0'>{gamedetails?.publisher}</span>
                </div>
              </div>
              <div className="col">
                <div className="txt mt-3">
                  <p className='text-info'>Release Date</p>
                  <span className='fs-sm mt-0'>{gamedetails?.release_date}</span>
                </div>
              </div>
              <div className="col">
                <div className="txt mt-3">
                  <p className='text-info'>Genre</p>
                  <span className='fs-sm mt-0'>{gamedetails?.genre}</span>
                </div>
              </div>
              <div className="col">
                <div className="txt mt-3">
                  <p className='text-info'>Platform</p>
                  <span className='fs-sm mt-0'>{gamedetails?.platform}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
      }

   
    
    
    </>
  )
}
