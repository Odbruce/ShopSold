// import { Link } from "react-router-dom";
import { useMatch, Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useEffect, useState} from "react";

const Categories = () => {
  const {cate} = useParams();
  const matchshop = cate==="men"||"women";
  
  const [products,setProducts] = useState([]);
  const [isloading,setisLoading] = useState(false)

  const displayproduct = (a,b=2,)=>{
    let str=[];
    for (let i = a; i < products.length/b ; i++){
      const {name,featuredUrl} = products[i];
       str.push(<Link key={i} to={`/products/${cate + "/" + name}`} className="product-category">
          <div className="div">
            <img
              src={featuredUrl}
              alt={name}
            />
          </div>

          <article className="category-name">
            <h3 className="cate_block">{name}</h3>
            {/* <p className="cate_block">{name}</p> */}
          </article>
      </Link>)
  }
      return str;
}
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setisLoading(false);
        console.log(cate);
        const data = await axios.get(`/api/products?cate=${cate}`);
        setProducts(data.data);
        setisLoading(true);
      }catch(error){}
    }
    fetchData();
  },[])

  if(!isloading){
    return <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
    <div className="ldio-4axryukh3c">
      <div></div>
    </div>
  </div>
  }


  return (
    <>
      <Wrapper
        initial={{ opacity: matchshop ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <h1>{cate}'s Wear</h1>
        <div className="card1">

        {
    
            displayproduct(0)
             
             }

        </div>
        <div className="ad">
          <h2>PROMO 20% discount!</h2>
          <h4>on first five purchases</h4>
          <button classname="">
            <div></div> SHOP NOW
          </button>
        </div>
        <div className="card2">

          {
            displayproduct(3,1)

          }
      
        </div>
      </Wrapper>
    </>
  );
};
export default Categories;

const Wrapper = styled(motion.section)`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  width: 100%;

  h1 {
    text-align: center;
    font-size: 1.5rem;
    text-transform:capitalize;
    text-transform:capitalize;
    color:#353B43;
    line-height: 1.2em;
    font-weight: 500, medium;
    position:relative;

    &::after{
      content:"";
      background:#DB9224;
      position:absolute;
      bottom:-10%;
      left:25%;
      height:2px;
      width:50%
    }
  }
  .card1 {
    display: grid;
    grid-template-columns: repeat(3, max(350px));
    grid-template-columns: repeat(3, 24.3vw);
    gap: 1.67vw;
    margin: 1.5rem 0 2.25rem 0;

    .product-category {
      position: relative;
      text-decoration:none;
      height: 22.22vw;
      padding:2.25rem;
      overflow: hidden;
      cursor: pointer;
      border:2px solid #94A48E;
      transition: all 0.4s ease-in-out;
      
      &:hover{
      border:2px solid #353B43;

      }

     
      
      div {
        position: absolute;
        top:0;
        left:0;
        height:calc(22.2vw + 4.5rem);
        width: 30vw;
        overflow:hidden;
               
        
        
        img {
          transition: all ease-in-out 0.4s;
          object-fit:cover;
          height:100%;
          width:100%;
          object-position: 0% 20%;

          
          &:hover  {
            transform: scale(1.02);
    
          }
        }
      }
      .category-name {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        color: black;
        color:#30281E;



        h3{
          text-decoration:none;

        }

        .cate_block{
        background:white;
        letter-spacing:2px;
        padding:0 1rem 0 0.2rem;
        text-transform:capitalize;
        }
      }

      &:nth-of-type(1) {
        border-radius: 200% 0 0 10%;
        

        .category-name {
          bottom: 2.25rem;
          right: 2.25rem;
        }
      }

      &:nth-of-type(2) {
        .category-name {
          left: 50%;
          transform: translatex(-50%);
          bottom: 2.25rem;
        }
      }

      &:nth-of-type(3) {
        border-radius: 0 200% 10% 0;
        
        .category-name {
          left: 2.25rem;
          bottom: 2.25rem;
        }
      }
    }
  }

  .card2 {
    display: grid;
    grid-template-columns: repeat(3, max(350px));
    grid-template-columns: repeat(3, 24.3vw);
    gap: 1.67vw;
    margin: 2.25rem 0;

    .product-category {
      position: relative;
      text-decoration:none;
      height: 22.22vw;
      overflow: hidden;
      padding: 2.25rem;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      border:2px solid #94A48E;

      &:hover{
        border:2px solid #353B43;
      }
            
      div {
        position: absolute;
        top: 0;
        left: 0;
        height:calc(22.2vw + 4.5rem);
        width: 30vw;
        overflow:hidden;

        &:hover img {
          transform: scale(1.02);
        }

        img {
          height:100%;
          width:100%;
          transition: transform ease-in 0.4s;
          object-fit:cover;
          object-position: 0% 20%;

        }
      }

      .category-name {
        position: absolute;
        color: black;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .cate_block{
        background:white;
        text-transform:capitalize;
        padding:0 1rem 0 0.2rem;
      }
      }

      &:nth-of-type(1) {
        border-radius: 10% 0 0 200%;

        .category-name {
          top: 2.25rem;
          right: 2.25rem;
        }
      }

      &:nth-of-type(2) {
        .category-name {
          left: 50%;
          transform: translatex(-50%);
          top: 2.25rem;
        }
      }

      &:nth-of-type(3) {
        border-radius: 0 10% 200% 0;

        .category-name {
          left: 2.25rem;
          top: 2.25rem;
        }
      }
    }
  }
  @media (max-width: 780px) {
    .card2,
    .card1 {  
      grid-template-rows: repeat(3, 1fr);
      grid-template-columns:minmax(10rem,100vw);
      gap: 1.67vw;
      margin: 1.5rem 0 2.25rem 0;
      
      .product-category {
        border-radius: 0;
        background:rgb(210, 215, 221,.4);
        display:flex;
        justify-content:flex-end;

        &:nth-of-type(1) {
          border-radius:0;
        }
        &:nth-of-type(2){

          .category-name{
            transform:translatex(0);
          }
        }
        &:nth-of-type(3) {
        border-radius:0;
        }
        .category-name {
          position:initial;
        }
        div{
          // overflow:hidden;
          img{
         object-fit:cover;
        }}
    }
  }
  }
`;
