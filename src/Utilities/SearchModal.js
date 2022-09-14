import React, { useEffect } from "react";
import { BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import { GrClose } from "react-icons/gr";

import { motion } from "framer-motion";
import styled from "styled-components";

export const SearchModal = ({ Focused }) => {
  const { isFocused, setIsfocused } = Focused;

  const closeSearch = (e) => {
    // if (
    //   !e.target.classList.contains("search_product") &&
    //   !e.target.classList.contains("open")
    // ) {
    //   setIsfocused(false);
    //   document.body.style.overflow = "initial";
    // }
    setIsfocused(false);
    document.body.style.overflow = "initial";
    return;
  };

  useEffect(() => {
    document.getElementById("input").focus();
  }, []);

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="search_shade"
    >
      <button className="close_search">
        <GrClose onClick={closeSearch} />
      </button>
      <button className={isFocused ? "active search" : "search"}>
        <div className="drop_display"></div>
        <GrClose className="close_me" />
        <div className="search_icon ">
          <BsSearch />
        </div>
        <input
          type="text"
          placeholder="search for products"
          className="input_text open"
          id="input"
          onFocus={() => {
            setIsfocused(true);
            document.body.style.overflow = "hidden";
            console.log(document.getElementById("inputed"));
          }}
        />
      </button>

      <div className="search_products">
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
        <Link to="/" className="search_product">
          <div className="search_img"></div>
          <div className="search_name">
            <p>Lorem ipsum dolor .</p>
          </div>
        </Link>
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
  place-content: center;

  .close_search {
    position: absolute;
    top: 2vw;
    right: 5vw;
    font-size: 24px;
    border: none;
  }

  .search {
    position: relative;
    // background:red;
    height: fit-content;
    // width: 10rem;
    width: fit-content;

    .input_text {
      font-family: futura-pt, sans-serif;
      background: transparent;
      width: 20rem;
      transition: 0.3s ease-in-out width;
      padding: 0.4rem 4rem 0.4rem 0.4rem;
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

      &:focus {
        background: whitesmoke;
        border: 2px solid #78aaff;
        transition: 0.4s ease-in-out all;
        width: 35rem;
      }
      &::placeholder {
        font-family: futura-pt, sans-serif;
        font-size: 12px;
        letter-spacing: 1px;
        // color: red;
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
      // font-size: clamp(0.5rem, calc(1.3vw + 3px), 1rem);
      font-size: 0.9rem;
      z-index: 80000;
      opacity: 1;
      right: 2.1rem;
      top: 25%;
    }
    .search_icon {
      right: 0;
      // top:25%;
      z-index: 10;
      position: absolute;
      // font-size: clamp(0.5rem, calc(1.3vw + 3px), 1rem);
      font-size: 0.9rem;
      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;
      color: #30281e;
      background: #0770cf;
      border-radius: 50%;
    }
  }

  form {
    position: fixed;
    top: 0;
  }

  .search_products {
    // background: red;
    height: 70%;
    position: relative;
    top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
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
        border-radius: 50%;
      }
      .search_name {
        width: 100%;
        margin-left: 0.4rem;
        border-bottom: solid 1px black;
        padding: 0 0.4rem;
        height: 50px;
        color: #db9836;
        color: black;
        font-weight: 500;
        letter-spacing: 1px;
        display: grid;

        p {
          align-self: center;
          font-size: 1rem;
        }
      }
    }
  }
`;
