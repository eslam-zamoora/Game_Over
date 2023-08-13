import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../asset/logo1.jfif'


export default function ({userData , logout}) {
  return (
    <>
    
    <nav className="navbar navbar-expand">
        <div className="container">
        <Link className="navbar-brand" to="home"><img src={logo} alt='' width={100}/></Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userData ?<ul className="navbar-nav me-auto mt-2 mt-lg-0">
           <li className="nav-item">
             <Link className="nav-link" to="home" aria-current="page">Home</Link>
           </li>
           <li className="nav-item">
             <Link className="nav-link" to="allgames">All</Link>
           </li>
           <li className="nav-item dropdown">
             <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Platforms</Link>
             <div className="dropdown-menu bg-dark bg-opacity-75" aria-labelledby="dropdownId">
               <Link className="dropdown-item" to="pcplatforms">PC</Link>
               <Link className="dropdown-item" to="browserplatforms">Browser</Link>
             </div>
           </li>
           <li className="nav-item dropdown">
             <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort-by</Link>
             <div className="dropdown-menu bg-dark bg-opacity-75" aria-labelledby="dropdownId">
               <Link className="dropdown-item" to="Sortrealisedata">realise-data</Link>
               <Link className="dropdown-item" to="Sortpopularity">popularity</Link>
               <Link className="dropdown-item" to="Sortalphabetical">alphabetical</Link>
               <Link className="dropdown-item" to="Sortrelevance">relevance</Link>
             </div>
           </li>
         </ul> : null
           
          }
         
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {userData ? 
          <li className="nav-item">
          <span className='nav-link cursor-pointer' onClick={logout}>LogOut</span>
        </li>:
          <>
          
          <li className="nav-item">
              <Link className="nav-link" to="register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="login">Login</Link>
            </li>
          </>
          }
            
            
          </ul>
         
        </div>
      </div>
    </nav>
    
    
    </>
  )
}
