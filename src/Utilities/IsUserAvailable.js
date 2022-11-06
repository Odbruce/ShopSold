import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export const IsUserAvailable = ({children}) => {
    const {error} = useAuth0();

if(error){
return <h4>error</h4>
}

  return (
    <>{children}</>
  )
}
