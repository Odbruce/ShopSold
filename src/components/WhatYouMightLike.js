import styled from "styled-components";
import { Link, useMatch, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState,useRef } from "react";
import Heart from "./Heart";


const WhatYouMightLike = () => {
  const matchshop = useMatch("/shop");
  const param = useParams().cate;
  console.log(param)
  const prop = param?param:"allProducts";
  console.log(prop);
  const cate = useSelector((state) => state.productCate[prop]);
  console.log(cate);
  const cateArray = param?cate.map((item) => item.values).flat():cate;
  console.log(cateArray)

  const [productsArray, setproductsArray] = useState([]);




  // const filtered = values.filter((items) => {
  //   // const { id } = items;
  //   return items.id === id;
  // });

  // console.log(filtered);

  // const {
  //   // url,
  //   images,
  //   // id,
  //   stock,
  //   type,
  //   color,
  //   // price,
  //   ratings,
  //   // products: name,
  // } = filtered[0];

  

 
  
  useEffect(() => {
    const indexArray = (count, max) => {
      const randomIndexValues = [];
      while (randomIndexValues.length < count) {
        const r = Math.floor(Math.random() * max);  //random numbers from 0  to the max number;
        if (randomIndexValues.indexOf(r) === -1) {
          randomIndexValues.push(r);
        }
      }
      return randomIndexValues;
    };
    
    setproductsArray(
      indexArray(6, cateArray.length).map((item) => cateArray[item])
      );
    }, []);
    
    console.log(productsArray);

  return (
    <Wrapper className="cover">
      <h2>what you may like</h2>
      <ul className="WhatYouMightLike">
        {productsArray.map((item) => {
          const { products: name, images,id,type,cate,color,price,ratings,stock,} = item;
          console.log(images[0],type);
          let favorite = {images,cate,name,color,price,ratings,stock,type,id,}

          return (
            <div  key={id} className="wed ">
                <Heart {...favorite} />
                <Link to={`/productpersonal/${type}/${id}`}>
                  <img src={images["0"]} alt={name} />
                  <div>
                    <h4>{name}</h4>
                  </div>
                </Link>
            </div >
          );
        })}
       
      </ul>
    </Wrapper>
  );
};

export default WhatYouMightLike;

const Wrapper = styled.section`
  text-align: start;
  width: fit-content;
  margin: 1em auto 2rem;

  h2 {
    font-size: clamp(1.2rem, calc(1.389vw + 4px), 1.6rem);
    text-transform :uppercase;
  }

  .WhatYouMightLike {
    margin: 1em auto 0;
    position: relative;
    width: min(75vw, 950px);
    height: clamp(320px, 50vw, 450px);
    display: grid;
    grid-auto-columns: 35%;
    grid-auto-flow: column;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    overflow: auto;
    scrollbar-width: none;    
    // border:1px solid black;
    // border-top:solid black 1px;
    // border-bottom:solid 1px black;
    height:max-content;
    gap:2vw;

    @media (max-width: 680px){
      width:350px;
      grid-auto-columns:50%;
    }

    &::-webkit-scrollbar {
      display: none;
    }

   
  

  .wed {
    width: 350px;
    width: min(30vw, 350px);
    background: #94a48e;
    // background:red;
    position: relative;
    height: max(34.44vh, 400px);
    transition: all ease-out 0.2s;
    // padding: 0.3rem;
    border:1px solid #272727;
    // border-top:none;
    // border-bottom:none;
    height: clamp(200px, 50vw, 400px);
    scroll-snap-align: start;
    overflow:hidden;
    text-decoration:none;


    &:hover > div{
      display:initial;
    }

    // &:first-of-type{
    //   border-left:none;
    // }
    &:last-child{
      border-right:solid 1px #272727;
    }

    @media (max-width: 680px){
      width:175px;
      scroll-snap-align: center;
    }
 
    &:hover img{
      transform:scale(1.07);
    }

    > div{
      display:none;
    }
    img {
      width: 100%;
      width: min(30vw, 350px);
      width:100%;
      // height: clamp(200px, 50vw, 400px);
      height:100%;
      transition: all ease-in-out 0.4s;
      object-fit: cover;
    }
    h4 {
      position: absolute;
      font-size: calc(5px + 1vw);
    font-size: clamp(0.7rem, calc(1.1vw + 4px), 1.3rem);

      color: #e8ebee;
      color: #272727;
      text-transform:uppercase;
      // padding: 0 0 0 5%;
      padding:2px 10px;
      bottom: 10%;
      text-align: start;
      background:whitesmoke;
      left:2%;
    }
  }
}
`;
