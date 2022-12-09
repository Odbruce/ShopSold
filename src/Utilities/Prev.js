import React from 'react'
import { motion } from "framer-motion";
import styled from "styled-components";
import { priceToLocaleCurrrency } from './priceToLocaleCurrrency';
import { PrevNext } from './styled';

export const Prev = ({prev,direction}) => {
  const {products:name,price,url} = prev;

  return (
    <PrevNext
      direction="left"
      initial={{opacity:0,y:20}}
      animate={{opacity:direction==="leave"?0:(direction==="prev"?1:0),y:direction==="leave"?20:(direction==="prev"?0:20)}}
    >                 
        <div  className="prevnext">
          <img src={url} alt="" />
          <div className="prop_name">
            <h2>{name} </h2>
            <h3 className="h3">{priceToLocaleCurrrency(price)}</h3>
          </div>
        </div>
    </PrevNext>
  )
}


