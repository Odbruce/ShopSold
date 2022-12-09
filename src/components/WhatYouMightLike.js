import styled from "styled-components";
import { Link,  useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import Heart from "../Utilities/Heart";




const WhatYouMightLike = () => {

  
  const param = useParams().cate;
  const prop = !!param?param:"allProducts";
  const cate = useSelector((state) => state.productCate[prop]);
  const cateArray = !!param?cate?.map((item) => item.values).flat():cate;
  const [productsArray, setproductsArray] = useState([]);

  
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
    

  return (
    <Wrapper className="cover">
      <h2>what you may like</h2>
      <ul className="WhatYouMightLike">
        {productsArray.map((item) => {
          const { products: name, images,id,type,cate,color,price,ratings,stock,} = item;
          let favorite = {image:images[0],cate,name,color,price,ratings,stock,type,id,}

          return (
            <li  key={id} className="wed ">
                <Heart {...favorite} />
                <Link to={`/productpersonal/${type}/${id}`}>
                  <img src={images["0"]} alt={name} />
                  <div>
                    <h4>{name}</h4>
                  </div>
                </Link>
            </li >
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
    font-size:clamp(12px,calc(8px + 2vw),24px);  
    text-transform: uppercase;
  }

  .WhatYouMightLike {
    margin: 1em auto 0;
    position: relative;
    width: min(95vw, 950px);
    display: grid;
    grid-auto-columns: 35%;
    grid-auto-flow: column;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
    overflow: auto;
    scrollbar-width: none;    
    height:max-content;
    gap:2vw;

    @media (max-width: 680px){
      width:350px;
      gap:10px;
      grid-auto-columns:50%;
    }

    &::-webkit-scrollbar {
      display: none;
    }

 li {
    background: #94a48e;
    position: relative;
    border:1px solid var(--font_pri);
    height: clamp(200px, 50vw, 400px);
    scroll-snap-align: start;
    overflow:hidden;

    > div{
      display:none;
    }

    &:hover > div{
      display:initial;
    }

    

    @media (max-width: 680px){
      width:175px;
      scroll-snap-align: center;
    }
 
    img {
      width: 100%;
      height:100%;
      transition:ease-in-out 0.4s;
      transition-property:transform;
      object-fit: cover;
    }
    &:hover img{
      transform:scale(1.07);
    }

    h4 {
      position: absolute;
      font-size: clamp(9px,calc(10px + 0.5vw),16px);
      color: var(--font_pri);
      text-transform:uppercase;
      padding:2px 10px;
      bottom: 10%;
      text-align: start;
      background:whitesmoke;
      left:2%;
    }
  }
}
`;
