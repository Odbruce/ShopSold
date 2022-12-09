import React from 'react';
import { motion } from "framer-motion";
import styled from "styled-components";
import { priceToLocaleCurrrency } from './priceToLocaleCurrrency';
import { PrevNext } from './styled';
export const Next = ({next,direction}) => {

  const {products:name,price,url} = next;


           return<PrevNext direction="right" initial={{opacity:0,y:20}}
                   animate={{opacity:direction==="leave"?0:(direction==="next"?1:0),y:direction==="leave"?20:(direction==="next"?0:20)}}>                 
                <div  className="prevnext">
                  <div className="prop_name">
                    <h2>{name} </h2>
                    <h3 className="">{priceToLocaleCurrrency(price)}</h3>
                  </div>
                  <img src={url} alt="" />
                </div>
                </PrevNext>
  
}


// const Wrapper = styled(motion.div)`
// position:absolute;
// height:100%;
// width:100%;


// .next{
//   position:absolute;
//   display: flex;
//   background: #f0f0f0;
//   width:10rem;
//   height:4rem;
//   top:150%;
//   border-right:solid 3px var(--bg_org);
//   padding:0 0 0 0.2vw;
//   gap: 0.5rem;
//   box-shadow: 0px 3px 9px 1px rgb(0,0,0,0.2);
//   right:-50%;
//   justify-content:flex-end;
//   text-align:end;

//   @media (max-width:750px){
//     display:none;
// }
 
//   img {
//     width:3.41vw;
//     object-fit:cover;
//   }
//   .prop_name {
//     padding:0.8vw 0;
//     display:flex;
//     flex-direction:column;
//     justify-content:space-around;
//     h2 {
//       font-family: "poppins", sans-serif;
//       text-transform:uppercase;
//       font-size: clamp(9px,calc(.9vw + 5px),12px);
//       letter-spacing: .5px;
//       font-weight: 400;
//         // margin-bottom: 1rem;
//     }
//     h3 {
//       font-size: 1.3rem;
//       font-size:calc(9px + 1vw);
//       font-size:clamp(7px,calc(.9vw + 9px),14px);
//       color:green;
//     }
//   }


// }



// .leave{
//   opacity:0;
// }


// `
