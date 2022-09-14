import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Navmodal = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [i, setindex] = useState(0);

  // const { videoUrl } = products[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(false);
        const data = await axios.get(`/api/products?cate=${name}`);
        setProducts(data.data);
        // setUrl({ index: 0, videoUrl: data.data[0].videoUrl });
        setisLoading(true);
        console.log(products);
        setindex(0);
        // document.getElementById("vid1").play();
      } catch (error) {}
    };
    fetchData();
  }, [name]);

  useEffect(() => {
    // i && document.getElementById("vid1").play();
  }, [i]);

  // useEffect(() => {
  //   isloading && document.getElementById("vid1").play();
  // }, [Url, name]);

  if (!isloading) {
    return (
      <Wrapper>
        <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
          <div className="ldio-4axryukh3c">
            <div></div>
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper id="navmodal">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="nav_modal"
      >
        <h1>{name}</h1>
        <div className="modal_picks">
          <ul>
            {products.map((items, index) => {
              const { name: cate, videoUrl } = items;
              console.log(items, index);

              return (
                <li
                  className={`${i === index ? "active" : ""}`}
                  onMouseOver={() => {
                    return setindex(index);
                  }}
                  key={index}
                >
                  <span></span>
                  <Link
                    key={index}
                    className="linked"
                    to={`/products/${name + "/" + cate}`}
                  >
                    {cate}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav_vid">
            {/* <video id="vid1" autoplay muted loop>
              {" "}
              <source type="video/mp4" src={products[i].videoUrl} />
              your brower doesnt support html video
            </video> */}

            <img src={products[i].featuredUrl} alt="" />
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  box-sizing: border-box;
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 1rem 1rem;
  justify-content: center;
  font-size: 1rem;
  background: whitesmoke;
  position: fixed;
  top: 12rem;
  left: 5rem;
  display: none;
  z-index: 200;
  width: 50vw;
  height: 325px;
  width: 650px;

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background: whitesmoke;
    position: absolute;
    top: -14px;
    z-index: 6;
    left: 14px;
    transform-origin: top left;
    transform: rotate(45deg);
  }

  .nav_modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    font-size: 1rem;

    h1 {
      text-align: center;
      position: relative;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: fit-content;
      color: #353b43;
      font-size: 1.5rem;

      &::after {
        height: 2px;
        width: 60%;
        background: #db9836;
        bottom: 0;
        right: 0;
        left: 0;
        // transform: translateX(-50%);
        position: absolute;
        content: "";
      }
    }

    .modal_picks {
      display: flex;
      justify-content: space-between;
      // background: orange;

      ul {
        // background: blue;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        li {
          position: relative;
          letter-spacing: 1px;
          text-transform: capitalize;
          color: black;

          .linked {
            display: block;
            color: black;
            padding: 0.5rem;
            text-decoration: none;
          }
          span {
            transition: 0.5s ease all;
            position: absolute;
            z-index: -2;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            border-left: 2px solid transparent;
            transform: scaleY(0.2);
            transform-origin: top right;
          }
        }
        .active {
          .linked {
            color: #db9836;
          }

          span {
            border-left: 2px solid #db9836;
            background: rgb(0, 0, 0, 0.1);
            transform: scaleY(1);
            width: 100%;
          }
        }
      }

      .nav_vid {
        width: 470px;
        height: 250px;

        img {
          background: #353b43;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 20% 70%;
        }
      }
    }
  }
`;
