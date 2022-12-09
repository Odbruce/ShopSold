import React, { useEffect } from "react";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Heart from "../Utilities/Heart";
import { productAction } from "../store";

const RecentlyVisited = ({id}) => {

  const visited = useSelector(state=>state.productCate.recentlyVisited).filter(item=>item.id!==id);

  const dispatch = useDispatch();

if(visited.length<1){
  return <></>;
}

const clear = ()=>{
  dispatch(productAction.clearRecentlyViewed());
}


  return (
    <Wrapper>
      <div className="heading">
        <h2>RECENTLY VISITED</h2>
        <button className="cancel" onClick={clear}>
          <span>clear all</span>
          <ImCancelCircle />
        </button>
      </div>
      <section className="recently">
        {visited.map((item)=>{
          const { products: name, image,id,type,cate,color,price,ratings,stock,} = item;

          let favorite = {image,cate,name,color,price,ratings,stock,type,id,}

          return (
        <div  key={id} className="visited">
          <Heart {...favorite} />
          <Link to={`/productpersonal/${cate}/${id}`}>
          <img src={image}/>
          </Link>
        </div>)
        })}
      
      </section>
    </Wrapper>
  );
};

export default RecentlyVisited;

const Wrapper = styled.section`
  margin: 1vw 0 10vw;
  padding: 0 7.5vw 0 7.5vw;
  position: relative;

  &:hover .heading .cancel {
    opacity: 1;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 1px;

    h2{
      font-size: clamp(1.2rem, calc(1.389vw + 4px), 1.6rem);
      text-transform :uppercase;
    }

    .cancel {
      background: #a8a98e;
      color: rgb(0, 0, 0, 0.8);
      cursor: pointer;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: #2d2d2d;
      font-size: clamp(9px, calc(7px + 0.5vw), 16px);
      padding: 0.2rem 0.7rem;
      padding:0.3vw 0.5vw;
      border:2px var(--font_pri) solid;

      &:hover {
        background: #eeeeee;
        span {
          color: var(--font_pri);
        }
      }

      span {
        transition: all 0.5s ease-in-out;
        color: whitesmoke;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
  .recently {
    overflow-x:scroll;
    overflow-y:hidden;
    display:flex;
    gap:0.4rem;
    margin: 2vw 0;
    scrollbar-width: none;
    width: min(75vw, 950px);

    &::-webkit-scrollbar {
      display: none;
    }


    .visited {
      height: min(48.3vw, 300px);
      position:relative;
      aspect-ratio: 3/4;
      background: #94a48e;


      img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
  }
`;
