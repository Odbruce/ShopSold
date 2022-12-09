import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

    const RouteOrRedirect = ({children}) => {
        const paramsArray = ["men","women","bags", "work","dresses","fitness","beach?please","have a look","shoes", "tees", "beach wear", "jeans", "shirts"]
        const {cate,type} = useParams();
        
        const handleRedirect = () => {
            return <Navigate to="/error" replace/>
          }
          
          const isMatch = () => {
           
            let params = [cate,type==="beach"?type + "?please":type]

            let matched;

            matched = params.every(value => { //check if all values in the array passes the test it returns true else ...
                if(!type){
                    params[1]="work"  //if the type param is undefined add an existing type string
                }
                return paramsArray.includes(value);
              });
            return matched;
        }
       if(isMatch()){
        return <>{children}</>
       }
       else{
        return <>{handleRedirect()}</>
       }

      }
      
     

export default RouteOrRedirect