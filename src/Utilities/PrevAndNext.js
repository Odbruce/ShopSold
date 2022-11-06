import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Next } from './Next';
import { Prev } from './Prev';
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

export const PrevAndNext = ({cate,type,id}) => {

  // const switch_product = useRef({minus:{id:""},plus:{id:""}});
  const [switch_product,setSwitch] = useState({minus:{id:""},plus:{id:""}});
  console.log(id,cate,type);

  const [direction, setdirection] = useState("leave");

  const prevnext = (a) => {
    console.log(a);
    if (a === "prev") {
      return setdirection("prev");
    } else if (a === "next") {
      return setdirection("next");
    }
    return setdirection(a);
  };

  const cateData = useSelector(state=>state.productCate[cate]);
  console.log(cateData);


  const getProduct = (items, id) => {
    const previndex = items.findIndex(findId);

    function findId(item) {
      return item.id === id;
    }
    const plus = items[`${previndex === items.length - 1 ? 0 : previndex + 1}`];
    const minus = items[`${previndex === 0 ? items.length - 1 : previndex - 1}`];

  setSwitch({ plus, minus })
    console.log(plus,minus);

    return;
  };

  console.log(switch_product);


  useEffect(() => {
    console.log("effect")
    const filtered = cateData.find((items) => {
      const { name } = items;
      if (type === "beach") {
        return name === type + "?please";
      }
      return name === type;
    });
    console.log(filtered);

   getProduct(filtered.values, id);

  }, []);
  console.log(switch_product.minus.id);


 




  return (
    <Wrapper>
           <Prev prev={switch_product.minus} direction={direction} />
            <Next next={switch_product.plus} direction={direction} /> 
      
      <Link
    to={`/productpersonal/${cate}/${switch_product.minus.id}`}
    className="btn_contain"
  >
    <button>prev</button>
    <GrPrevious
      onMouseEnter={() => {
        prevnext("prev");
      }}
      onMouseLeave={() => {
        prevnext("leave");
      }}
      className="nav_icon"
    />
  </Link>
  <Link
    to={`/productpersonal/${cate}/${switch_product.plus.id}`}
    className="btn_contain"
  >
    <button>next</button>
    <GrNext
      onMouseEnter={() => {
        prevnext("next");
      }}
      onMouseLeave={() => {
        prevnext("leave");
      }}
      className="nav_icon"
    />
  </Link> </Wrapper>
  )
}


const Wrapper = styled.div`
      display: flex;
      justify-content: space-between;
      gap: 5vw;
      position:relative;

.btn_contain {
  cursor: pointer;
  position:relative;
  display:grid;
  justify-items:center;
  text-decoration:none;


  button {
    color: grey;
    border: none;
    font-size: clamp(10px, 1.5vw, 1rem);
    margin-bottom:.4vw;
    background: none;
  }
  .nav_icon {
    font-size: clamp(10px, 1.5vw, 1.2rem);
  }
}`