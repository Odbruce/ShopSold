import React from 'react'
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";

export const Stars = ({num}) => {
const stars = Array.from({length:5},(_, index)=>{
    const digit = index + 0.5;
    return (
        num >= index + 1?(<ImStarFull key={index} />):num >=digit?(<ImStarHalf key={index}/>):<ImStarEmpty key={index} />
    )
})

  return (
   <> {stars}</>
  )
}
