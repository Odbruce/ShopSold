import React from 'react';
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
