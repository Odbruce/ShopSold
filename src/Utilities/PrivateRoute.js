import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {useFireContext} from "../components/FirebaseContext"

const PrivateRoute = ({type,children}) => {
  const {User} = useFireContext();

  const cart = useSelector(state=>state.cart.cart)
  const navigate = useNavigate();

useEffect(()=>{
  
if(User&type==="form"){
    return navigate("/",{replace:true});
  }  
  else if ((!User||cart.length<1)&type==="checkout"){
    return navigate("/",{replace:true})
  }
  

},[User,type,cart])
 


  return children;
}

export default PrivateRoute