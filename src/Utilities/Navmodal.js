import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";

export const Navmodal = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [Url, setUrl] = useState({ index: "", videoUrl: "" });

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
        document.getElementById("vid1").play();
      } catch (error) {}
    };
    fetchData();
  }, [name, Url]);

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
                  className={`${Url.index === index ? "active" : ""}`}
                  onMouseEnter={() => {
                    return setUrl({ index, videoUrl });
                  }}
                  key={index}
                >
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
            <video id="vid1" autoplay muted loop>
              {" "}
              <source type="video/mp4" src={Url.videoUrl} />
              your brower doesnt support html video
            </video>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  // box-sizing: border-box;
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  font-size: 1rem;
  //   align-items: start;
  background: whitesmoke;
  position: fixed;
  //   top: 50vh;
  top: 12rem;
  left: 5rem;
  display: none;
  z-index: 200;
  width: 50vw;
  height: 250px;
  // height: 0;
  //   overflow: hidden;
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
    // padding: 1rem;
    justify-content: center;
    font-size: 1rem;

    h1 {
      text-align: center;
      margin-bottom: 0.2rem;
      text-transform: uppercase;
      font-size: 1rem;
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
          // list-style: square inside;
          letter-spacing: 1px;
          // background: pink;
          text-transform: capitalize;
          width: fit-content;
          color: black;

          .linked {
            color: black;
            text-decoration: none;
          }
        }
        .active {
          color: #db9836;
        }
      }

      .nav_vid {
        width: 450px;
        height: 200px;

        video {
          background: #353b43;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 40% 30%;
        }
      }
    }
  }
`;
