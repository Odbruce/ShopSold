import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useState } from "react";
import { Stars } from "../Utilities/Stars";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";
import Heart from "../Utilities/Heart";

const ProductDisplayOption = ({ real,image,images,cate,name,color, price,ratings,stock,type,id }) => {
  const favorite = { image,cate,name,color,price,ratings,stock,type,id } 

  const [img, setimage] = useState("0");
  const select = (index) => {
    return setimage(`${index}`);
  };
  return (
    <Wrapper pos={real.pos}>
      <Link className="main_img" to={`/productpersonal/${cate}/${id}`}>
        <img src={images[img]} alt={name} />
      </Link>
      <div>
        <div className="sub_img ">
          <div className="img">
            {images.map((item, index) => {
              const active = img === `${index}` ? "active" : "";

              return (
                <img
                  key={index}
                  onMouseEnter={() => {
                    select(index);
                  }}
                  className={`cursor ${active}`}
                  src={item}
                  alt={name}
                />
              );
            })}
          </div>
          <div className="display_option star">
            <Stars num={ratings} />
          </div>
        </div>
        <div className="pricing">
          <Link to={`/productpersonal/${cate}/${id}`} className="name">
            {name}
          </Link>
          <p>{priceToLocaleCurrrency(price)}</p>
        </div>
        <Heart {...favorite} />
      </div>
    </Wrapper>
  );
};

export default ProductDisplayOption;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: max(300px, 30vw);
  height: 450px;
  border: 1px solid black;
  z-index: 2;
  background: whitesmoke;
  ${(prop) => prop.pos}:0;

  .cursor {
    cursor: pointer;
  }

  .main_img img {
    width: 100%;
    position: relative;
    object-position: 50% 50%;
    object-fit: cover;
    height: 350px;
    background: #e8ebee;
    user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
  }
  .sub_img {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    width: 100%;
    height: fit-content;
    margin-bottom: 0.5rem;

    .star {
      justify-content: flex-end;
      display: flex;
      gap: 0.44vw;
      font-size: max(12px, calc(7px + 0.6vw));
      color: #ffd700;
      width: 6rem;
    }

    .img {
      display: flex;
      flex-direction: row;
      gap: 1vw;

      img {
        height: 60px;
        object-fit: cover;
        object-position: 0% 20%;
        width: 60px;
        border-bottom: solid 2px transparent;
        background: #c2ccbe;
      }

      .active {
        border-bottom: solid 2px var(--bg_org);
      }
    }
  }

  .pricing {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    letter-spacing: 1px;
    color: #453f39;

    .name {
      text-transform: capitalize;
      text-decoration: none;
      color: #453f39;
    }
  }
`;


