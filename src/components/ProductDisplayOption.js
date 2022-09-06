import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";

const ProductDisplayOption = ({ cate, real, idd, product }) => {
  const filtered = product.filter((items) => {
    const { id } = items;
    return id === idd;
  });

  const { url, images, id, price, products: name } = filtered[0];
  console.log(images);
  const refWrapper = useRef(null);
  useEffect(() => {
    refWrapper.current.style[real.pos] = 0;
  }, []);
  const [img, setimage] = useState("0");
  const select = (index) => {
    return setimage(`${index}`);
  };

  return (
    <Wrapper ref={refWrapper}>
      <img className="main_img " src={images[img].url} alt="" />
      <div>
        <div className="sub_img ">
          <div className="img">
            {images.map((item, index) => {
              const { url } = item;
              const active = img === `${index}` ? "active" : "";

              return (
                <img
                  onMouseEnter={() => {
                    select(index);
                  }}
                  className={`cursor ${active}`}
                  src={url}
                  alt={name}
                />
              );
            })}
          </div>
          <div className="display_option star">
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
            <ImStarHalf />
            <ImStarEmpty />
          </div>
        </div>
        <div className="pricing">
          <Link to={`/productpersonal/${cate}/${id}`} className="name">
            {name}
          </Link>
          <p>NGN {price}</p>
        </div>
        <div className="H cursor">
          <FaRegHeart />
        </div>
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
  z-index: 1;
  background: whitesmoke;

  .cursor {
    cursor: pointer;
  }

  .H {
    position: absolute;
    top: 2%;
    color: #453f39;
    right: 3%;
  }

  .main_img {
    width: 100%;
    position: relative;
    object-position: 50% 50%;
    object-fit: cover;
    height: 350px;
    background: #e8ebee;
  }
  .sub_img {
    // z-index: 200;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: fit-content;
    margin-bottom: 0.5rem;

    .star {
      // align-self: end;
      justify-content: flex-end;
      display: flex;
      gap: 0.4rem;
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
        background: #c2ccbe;
      }

      .active {
        border-bottom: solid 2px #db9836;
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
