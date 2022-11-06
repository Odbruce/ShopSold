import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate,Outlet,useNavigate } from 'react-router-dom'
import {useFireContext} from "../components/FirebaseContext"

const PrivateRoute = ({type,children}) => {
  // const {user} = useAuth0();
  const {User} = useFireContext();

  const cart = useSelector(state=>state.cart.cart)

  console.log(User&type==="form"?true:false);

 

if(User&type==="form"){
  return <Navigate to="/" replace/>
}


  if(!User&type=="checkout"){
    return <Navigate to="/" replace/>

  }


  return children;
}

export default PrivateRoute