import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Allgames from './Components/Allgames/Allgames';
import Pcplatforms from './Components/Pcplatforms/Pcplatforms';
import Sortalphabetical from './Components/Sortalphabetical/Sortalphabetical';
import Sortpopularity from './Components/Sortpopularity/Sortpopularity';
import Sortrelevance from './Components/Sortrelevance/Sortrelevance';
import Sortrealisedata from './Components/Sortrealisedata/Sortrealisedata';
import Browserplatforms from './Components/Browserplatforms/Browserplatforms';
import './App.css';
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom'
import Notfound from './Components/Notfound/Notfound';
import Gamedetails from './Components/Gamedetails/Gamedetails';
import  jwtDecode  from "jwt-decode";
import { useEffect, useState } from 'react';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';




function App() {

  const [userData, setuserData] = useState()

  function saveUserData(){
    let encodedData = localStorage.getItem('userToken')
    let decodedData = jwtDecode(encodedData)
    setuserData(decodedData)
    
  }

  useEffect(() => {
    document.title = "Game Over"
    
    if(localStorage.getItem('userToken') !== null){
      saveUserData()
      
    }
  }, [])

  

  let router = createHashRouter([
    {path:'' , element:<Layout userData={userData} setuserData={setuserData}/> , children : [
      {index:true , element :<ProtectRoute><Home/></ProtectRoute> },
      {path: 'home' , element :<ProtectRoute><Home/></ProtectRoute> },
      {path: 'register' , element : <Register/>},
      {path: 'login' , element :<Login saveUserData={saveUserData}/> },
      {path: 'allgames' , element :<ProtectRoute><Allgames/></ProtectRoute> },
      {path: `gamedetails/:id` , element :<ProtectRoute><Gamedetails/></ProtectRoute> },
      {path: 'Pcplatforms' , element :<ProtectRoute> <Pcplatforms/></ProtectRoute> },
      {path: 'Sortrealisedata' , element :<ProtectRoute> <Sortrealisedata/></ProtectRoute> },
      {path: 'Sortrelevance' , element :<ProtectRoute> <Sortrelevance/></ProtectRoute> },
      {path: 'Sortpopularity' , element :<ProtectRoute> <Sortpopularity/></ProtectRoute> },
      {path: 'Sortalphabetical' , element :<ProtectRoute> <Sortalphabetical/></ProtectRoute> },
      {path: 'browserplatforms' , element :<ProtectRoute><Browserplatforms/></ProtectRoute> },
      {path: '*' , element : <Notfound/>},
    ]}
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App;
