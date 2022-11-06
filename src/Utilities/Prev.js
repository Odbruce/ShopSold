import React from 'react'
import { motion } from "framer-motion";
import styled from "styled-components";
import { priceToLocaleCurrrency } from './priceToLocaleCurrrency';

export const Prev = ({prev,direction}) => {
  const {products:name,price,url} = prev;

  return (
    <Wrapper initial={{opacity:0,y:20}}
           animate={{opacity:direction==="leave"?0:(direction==="prev"?1:0),y:direction==="leave"?20:(direction==="prev"?0:20)}}>                 
                <div  className={"prev"}>
                  <img src={url} alt="" />
                  <div className="prop_name">
                    <h2>{name} </h2>
                    <h3 className="h3">{priceToLocaleCurrrency(price)}</h3>
                  </div>
                </div>
    </Wrapper>
  )
}


const Wrapper = styled(motion.div)`
position:absolute;
height:100%;
width:100%;




.prev{
  position:relative;
  display: flex;
  background: #f0f0f0;
  height:4rem;
  width:10rem;
  top:150%;
  left:-50%;
  border-left:solid 3px #DB9836;
  padding:0 0.2vw 0 0;
  gap: 0.5rem;
  box-shadow: 0px 3px 9px 1px rgb(0,0,0,0.2);

  @media (max-width:750px){
    display:none;
  } 
 
  img {
    width:3.41vw;
    object-fit:cover;
  }
  .prop_name {
    padding:0.8vw 0;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    h2 {
      font-family: "poppins", sans-serif;
      text-transform:uppercase;
      font-size: clamp(9px,calc(.9vw + 5px),12px);
      letter-spacing: .5px;
      font-weight: 400;
        // margin-bottom: 1rem;
    }
    h3 {
      //   margin-bottom: 2rem;
      font-size: 1.3rem;
      font-size:calc(9px + 1vw);
      font-size:clamp(7px,calc(.9vw + 9px),14px);
      color:green;
    }
  }

 
}


.leave{
  opacity:0;
}
`
