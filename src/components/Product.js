import React from "react";
import { useState } from "react";
import ProductDisplayOption from "./ProductDisplayOption";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Product = ({ url, name, id, price, sett, cate, values }) => {
  const us = (e) => {
    const displayOption = document.getElementsByClassName("display_option")[0];
    const { left, top } = e.target.getBoundingClientRect();

    sett(id, name);

    if (left > 0.5 * document.body.clientWidth) {
      displayOption.style.display = "block";
      displayOption.classList.add = "animate";

      displayOption.style.left = `${
        left - (displayOption.clientWidth - e.target.width)
      }px`;
      return (displayOption.style.top = `${top + window.pageYOffset}px`);
    }

    displayOption.style.top = `${top + window.pageYOffset}px`;
    displayOption.style.left = `${left}px`;
    displayOption.style.display = "block";
  };
  const hovered = (e) => {
    console.log(e);
    const { left } = e.target.getBoundingClientRect();

    if (left > 0.5 * document.body.clientWidth) {
      return setReal({ display: true, pos: "right" });
    }
    return setReal({ display: true, pos: "left" });
  };

  const [real, setReal] = useState({ display: false, pos: "" });
  console.log(real.display);

  return (
    <Wrapper
      onMouseOver={hovered}
      onMouseLeave={() => {
        console.log("leave");
        setReal({ display: false });
      }}
    >
      <div className="img_container">
        <img className="img" src={url} alt="" />
      </div>
      <Link to={`/productpersonal/${cate}/${id}`} className="prod_link">
        <div className="contain">
          <p>{name}</p>
          <p>NGN {price}</p>
        </div>
      </Link>
      {real.display && (
        <ProductDisplayOption
          idd={id}
          cate={cate}
          real={real}
          product={values}
        />
      )}
    </Wrapper>
  );
};

export default Product;

const Wrapper = styled.div`
  // height: 395px;
  margin-bottom: 5vw;
  margin-bottom: clamp(20px, 5vw, 40px);
  width: 100%;
  // background: red;
  text-align: start;
  position: relative;
  font-size: 0.9em;
  font-size: clamp(12px, calc(7px + 0.6vw), 16px);
  letter-spacing: 1px;

  .img_container {
    position: relative;

    img {
      height: clamp(250px, 36vw, 307px);
      object-fit: cover;
      width: 20.8vw;
      width: 100%;
      background: #c2ccbe;
      margin-bottom: 1em;
    }
  }
  .contain {
    display: flex;
    color: black;
    justify-content: space-between;
    padding: 0 0.5rem;
    text-transform: capitalize;
  }
  .blocked {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
  }
`;
