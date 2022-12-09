import React, { useEffect } from "react";
import { BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { productAction } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";

import { motion } from "framer-motion";
import styled from "styled-components";

export const SearchModal = ({ Focused }) => {
  const {setIsfocused } = Focused;

  const dispatch = useDispatch();
  
  const { text, searched } = useSelector((state) => {
    return state.productCate.filter;
  });


  const search = (e) => {
    const { name, value } = e.target;

    document.getElementById("input").focus();
    dispatch(productAction.updateSearch({ name, value }));
  };

  const clearText = () => {
    document.getElementById("input").focus();
    return dispatch(productAction.clearText());
  };
  const closeSearch = () => {
      setIsfocused(false);
      document.body.style.overflow = "initial";

    return clearText();
  };
  useEffect(() => {
    dispatch(productAction.filterSearch());
  }, [text]);

  useEffect(() => {
    document.getElementById("input").focus();
  }, []);





  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="search_shade"
    >
      <div onClick={closeSearch} className="cover"></div>
    
      <button className= "search" >
        <GrClose onClick={clearText} className="close_me" />
        <div className="search_icon ">
          <BsSearch />
        </div>
        <input
          type="text"
          placeholder="search for products or categories"
          className="input_text open"
          name="text"
          value={text}
          id="input"
          onBlur={() => document.getElementById("input").focus()}
         
          onChange={search}
        />
      </button>

      <div  className="search_products">
        {!text ? (
          <p>search for products</p>
        ) : searched.length === 0 ? (
          <p>oops no match found</p>
        ) : (
          searched.map((item) => {
            const { products: name, id,url, type } = item;
            console.log(type)
            return (
              <div
                key={id}
              >
                <Link
                  to={`/productpersonal/${type}/${id}`}
                  onClick={closeSearch}
                  className="search_product"
                >
                  <img src={url} className="search_img"></img>
                  <div className="search_name">
                    <p>{name}</p>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s ease all;
  width: 100%;
  box-sizing: border-box;
  z-index: 4;
  backdrop-filter: blur(5px);
  background: rgb(219, 152, 54, 0.2);
  background: rgb(250, 250, 250, 0.2);
  background: rgb(0, 0, 0, 0.2);
  height: 100vh;
  padding: 2vw 2vw 2vw 2vw;
  display: grid;
  grid-template-rows:min-content 1fr;
  gap:2rem;
  justify-items: center;

  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .close_search {
    position: absolute;
    top: 2vw;
    right: 5vw;
    font-size: 24px;
    border: none;
  }

  .search {
    position: relative;
    margin-top:3rem;
    height: fit-content;
    background:red;
    background:transparent;
    border:none;
    width: fit-content;

    .input_text {
      font-family: futura-pt, sans-serif;
      width: 20rem;
      transition: 0.3s ease-in-out width;
      padding: 0.4rem 4rem 0.4rem 0.8rem;
      box-sizing: border-box;
      border: 2px solid grey;
      border-top-left-radius: 1rem 50%;
      border-bottom-left-radius: 1rem 50%;
      border-top-right-radius: 1rem 50%;
      border-bottom-right-radius: 1rem 50%;
      dislay: flex;
      font-weight: lighter;
      color: #30281e;
      letter-spacing: 1px;
      // font-size: clamp(0.5rem, calc(1.3vw + 3px), 0.9rem);
      font-size: 0.9rem;
      outline: none;
      z-index: 5;
      background: whitesmoke;

      &:focus {
        border: 2px solid #78aaff;
        transition: 0.4s ease-in-out all;
        width: 35rem;
      }
      &::placeholder {
        font-family: futura-pt, sans-serif;
        font-size: 12px;
        letter-spacing: 1px;
      }

      @media (max-width: 780px) {
        width: 10rem;

        &:focus {
          width: 20rem;
        }
      }
    }

    .close_me {
      position: absolute;
      font-size: 0.9rem;
      z-index: 2;
      right: 2.2rem;
      top:0;
      bottom:0;
      margin:auto 0;
    }
    .search_icon {
      right: 0;
      z-index: 2;
      position: absolute;
      font-size: 0.9rem;
      width: 2rem;
      height:100%;
      display: grid;
      place-items: center;
      color: #30281e;
      background: #0770cf;
      border-top-left-radius: 1rem 50%;
      border-bottom-left-radius: 1rem 50%;
      border-top-right-radius: 1rem 50%;
      border-bottom-right-radius: 1rem 50%;
    }
  }

  form {
    position: fixed;
    top: 0;
  }

  .search_products {
    height:fit-content;
    max-height:70vh;
    padding:1vw 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width:calc(250px + 1.5rem);
    align-items: center;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > p{
      font-size:clamp(12px,calc(9px + 2vw),24px);  
    }

    

    .search_product {
      display: grid;
      grid-template-columns: min-content 1fr;
      width: 250px;
      text-decoration: none;
      
      .search_img {
        height: 50px;
        width: 50px;
        background: grey;
        object-fit: cover;
        border-radius: 50%;
      }
      .search_name {
        width: 100%;
        // margin-left: 0.4rem;
        border-bottom: solid 1px whitesmoke;
        padding: 0 0.4rem;
        height: 50px;
        color: black;
        color: var(--bg_org);
        text-transform: capitalize;
        font-weight: 500;
        letter-spacing: 1px;
        display: grid;

        p {
          align-self: center;
          font-size: max(12px, 1.1vw);
        }
      }
    }
  }
`;
