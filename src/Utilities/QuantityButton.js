import { motion } from 'framer-motion';
import React,{useRef} from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components'

export const QuantityButton = ({qty,setcartProp,stockLeft,selectedColor,size,setErrormsg}) => {

    const btnref = useRef(null);

    const decrease = () => {
        const { name } = btnref.current;
    
        if (!selectedColor || !size) {
          let msg = [];
    
          if (!selectedColor) {
            msg[0] = "please select a color";
          }
          if (!size) {
            msg[1] = "please select a size";
          }
    
          return setErrormsg(msg);
        }
    
        let prop = qty;
        if (qty > 1) {
          prop -= 1;
        }

        return setcartProp((prev)=>{return {...prev,[name]:prop}})
    
      };

      const increase = () => {
        const { name } = btnref.current;
    
        if (!selectedColor || !size) {
          let msg = [];
    
          if (!selectedColor) {
            msg[0] = "please select a color";
          }
          if (!size) {
            msg[1] = "please select a size";
          }
    
          return setErrormsg(msg);
        }
    
        const quantity = qty >= stockLeft() ?( stockLeft()===0?1:stockLeft()) :  qty + 1 ;
    
        return setcartProp((prev)=>{return {...prev,[name]:quantity}})
    
      };

  return (
    <Wrapper >
                <motion.button ref={btnref} name="qty" onClick={decrease}>
                  <FaAngleLeft />
                </motion.button>
                <input
                  type="text"
                  name="quantity"
                  className="qty_displace"
                  disabled
                  value={qty}
                />
                <motion.button ref={btnref} name="qty" onClick={increase}>
                  <FaAngleRight />
                </motion.button>
    </Wrapper>
  )
}


const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 5rem;

.qty_displace {
  font-size: max(12px, calc(7px + 0.6vw));
  width:3rem;
  text-align:center;
  background:transparent;
  border:none;
  line-height: 1rem;
}

button {
  background: transparent;
  display: grid;
  font-size: max(12px, calc(7px + 0.6vw));
  color: #453f39;
  cursor: pointer;
  border: none;
  padding: 0;
}
`