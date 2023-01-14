//if user is present in local storage, it will navigate to homePage, no need to relogin in for eg. in another tab 
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function PublicRoute({children}) {
  const navigate = useNavigate();
  useEffect(() => {
     if(localStorage.getItem('token')){
       navigate('/')
     }
  }, [])
  
  return (
    <div>
        {children}
    </div>
  )
}

export default PublicRoute