import {Link,useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { useSelector} from "react-redux";

const Categories = () => {
  const {cate} = useParams();
  const matchshop = cate==="men"||"women";
    
  
  const products =  useSelector((state)=>{return state.productCate[cate]})

  const displayproduct = (a,b=2,)=>{
    let str=[];
    for (let i = a; i < products.length/b ; i++){
      const {name,imageUrl,videoUrl} = products[i];

    str.push(<Link key={i} to={`/products/${cate}/${name}`} className={`product_category ${name==="suit yourself"?"coming_soon":""}`}>
          <div className="div">
           {name!=="suit yourself"?<img
              src={imageUrl}
              alt={name}
            />:<video  autoPlay playsInline loop muted>
            {" "}
            <source type="video/mp4" src={videoUrl} />
            your brower doesnt support html video
          </video>}
          </div>

          <article className="category_name">
            <h3 className={`cate_block ${name==="suit yourself"&&"cate_animate"}`}>{name}</h3>
          </article>
      </Link>)
  }
      return str;
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
          <h2>PROMO: 100% off on delivery fee </h2>
          <h4>claim your discount by signing up and purchasing more than 4 products</h4>
          <Link to="/identity/register" className="button" >
            <div></div> sign up
          </Link>
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


const after = keyframes`
0%,20%,40%{
  transform:translateY(-110%);
  opacity:0;
}
45%{
  transform:translate(-140%,0);
}
50%,60%,80%,90%{
  transform :translate(0,0);
  opacity:1;
}
100%{
  transform:translateY(-110%);
}

`

const Wrapper = styled(motion.section)`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  width: 100%;

  h1 {
    text-align: center;
    font-size: 1.5rem;
    text-transform:capitalize;
    color:#353B43;
    line-height: 1.2em;
    font-weight: 500, medium;
    position:relative;

    &::after{
      content:"";
      background:var(--bg_)224;
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

    .product_category {
      position: relative;
      text-decoration:none;
      height: 22.22vw;
      padding:2.25rem;
      box-sizing:initial;
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
          transition:ease-in-out 0.4s;
          transition-property:transform;
          object-fit:cover;
          height:100%;
          width:100%;
          object-position: 0% 20%;

          
          &:hover  {
            transform: scale(1.07);
    
          }
        }

        video{
          object-fit:cover;
          height:100%;
          filter:brightness(50%);
          width:100%;
        }
      }
      .category_name {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 1rem;
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

        .cate_animate{
          position:relative;
          overflow:hidden;
          &:after{
            content:"coming soon!";
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:white;
            letter-spacing:2px;
            padding:0 1rem 0 0.2rem;
            text-transform:capitalize;
            animation: infinite  ${after} 7s;

          }
        }
      }

      &:nth-of-type(1) {
        border-radius: 200% 0 0 10%;
        

        .category_name {
          bottom: 2.25rem;
          right: 2.25rem;
        }
      }

      &:nth-of-type(2) {
        .category_name {
          left: 50%;
          transform: translatex(-50%);
          bottom: 2.25rem;
        }
      }

      &:nth-of-type(3) {
        border-radius: 0 200% 10% 0;
        
        .category_name {
          left: 2.25rem;
          bottom: 2.25rem;
        }
      }
    }
    .coming_soon{
      pointer-events:none;
    }
  }

  .ad{
    height:clamp(100px,13vw,200px);
    background:black;
    color:white;
    width:100%;
    display:grid;
    place-items: center;
    padding:.7em 0;
    letter-spacing:.3em;

    h2{
      font-size: clamp(12px,calc(9px + .9vw),24px);
    }
    h4{
      font-size:clamp(12px,calc(7px + 0.6vw),16px);
    }
    .button{
      width:fit-content;
      height:auto;
      padding:.5em;
      font-family:Segoe UI;
      font-size:  clamp(16px,calc(1.71vw + 4px),20px);
      position:relative;
      background:transparent;
      border:solid #d2d7dd 2px ;
      border-radius:2px;
      letter-spacing:1px;
      color:white;
      z-index:2;
      font-weight: 600;
      overflow: hidden;

      &:hover div{
        width:100%;
        z-index:-1;
      }

      &:hover{
        color:#353b43;
        transition-delay: .2s;
      }

      div{
        background:#d2d7dd;
        position:absolute;
        top:0;left:0;
        height:100%;
        width:0;
        transition:ease-in .3s;
      }
    }
  }

  .card2 {
    display: grid;
    grid-template-columns: repeat(3, max(350px));
    grid-template-columns: repeat(3, 24.3vw);
    gap: 1.67vw;
    margin: 2.25rem 0;

    .product_category {
      position: relative;
      text-decoration:none;
      height: 22.22vw;
      overflow: hidden;
      padding: 2.25rem;
      box-sizing:initial;
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

        img {
          height:100%;
          width:100%;
          transition:ease-in-out 0.4s;
          transition-property:transform;
          object-fit:cover;
          // object-position: 0% 20%;

        }
        &:hover img {
          transform: scale(1.02);
        }

      }

      .category_name {
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

        .category_name {
          top: 2.25rem;
          right: 2.25rem;
        }
      }

      &:nth-of-type(2) {
        .category_name {
          left: 50%;
          transform: translatex(-50%);
          top: 2.25rem;
        }
      }

      &:nth-of-type(3) {
        border-radius: 0 10% 200% 0;

        .category_name {
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
      
      .product_category {
        border-radius: 0;
        background:rgb(210, 215, 221,.4);
        display:flex;
        justify-content:flex-end;

        &:nth-of-type(1) {
          border-radius:0;
        }
        &:nth-of-type(2){

          .category_name{
            transform:translatex(0);
          }
        }
        &:nth-of-type(3) {
        border-radius:0;
        }
        .category_name {
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
