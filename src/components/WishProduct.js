import React from "react";
import styled from "styled-components";
import { BsChevronCompactDown } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
// import { AnimatePresence } from "framer-motion";
import { useState } from "react";
export const WishProduct = () => {
  const [display, setDisplay] = useState(false);
  return (
    <Wrapper>
      <div className="img_container">
        <div className="H">
          <RiDeleteBin5Line />
        </div>
        <img className="img" src="" alt="" />
      </div>
      {/* {display && (
        <motion.button
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="contain"
        >
          <p>NGN 20000</p>
          <p>add to cart</p>
        </motion.button>
      )} */}

      {
        <motion.button
          initial={{ height: "0px", opacity: 0 }}
          animate={{
            height: display ? `calc(2vw + 16px)` : "0px",
            opacity: display ? 1 : 0,
          }}
          transition={{
            type: "tween",
            ease: [0.6, 0.15, 0.59, 0.9],
            duration: 0.2,
          }}
          className="contain"
        >
          <p>NGN 20000</p>
          <p>add to cart</p>
        </motion.button>
      }

      <div className="header">
        <h4>worst behaviour</h4>
        <BsChevronCompactDown
          onClick={() => {
            setDisplay(!display);
          }}
          className={display ? "arrow active" : "arrow"}
        ></BsChevronCompactDown>
      </div>
      {
        <motion.div
          initial={{ height: "0px" }}
          animate={{ height: display ? "calc(3rem + 3.2vw)" : "0px" }}
          transition={{
            type: "tween",
            ease: [0.6, 0.15, 0.59, 0.9],
            duration: 0.1,
          }}
          className="props"
        >
          <div className="prop">
            <div className="sizes">
              <span className={`${true ? "" : ""}`}>S</span>
              <span className={`${true ? "" : ""}`}> M</span>
              <span className={`${true ? "active" : ""}`}> L</span>
              <span className={`${true ? "" : ""}`}> XL</span>
            </div>
            <p></p>
          </div>
          <div className="prop">
            <div className="quantity_btn">
              <motion.button>
                <FaAngleLeft />
              </motion.button>
              <p>1</p>
              <motion.button>
                <FaAngleRight />
              </motion.button>
            </div>
            <div className="color">
              <span
                style={{ background: "red" }}
                className={false ? "span active" : "span"}
              >
                {" "}
              </span>
              <span
                style={{ background: "blue" }}
                className={true ? "span active" : "span"}
              >
                {" "}
              </span>
            </div>
          </div>
        </motion.div>
      }
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin-bottom: clamp(20px, 5vw, 40px);
  width: 100%;
  text-align: start;
  position: relative;
  font-size: 0.9em;
  font-size: clamp(12px, calc(7px + 0.6vw), 16px);
  letter-spacing: 1px;
  width: clamp(170px, 30vw, 280px);

  .img_container {
    position: relative;

    .H {
      position: absolute;
      cursor: pointer;
      z-index: 2;
      top: 2%;
      border-radius: 50%;
      background: white;
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      color: #453f39;
      right: 3%;
    }

    img {
      // max-width:300px;
      height: 307px;
      height: clamp(250px, 36vw, 307px);
      // height:21.3vw;
      // min-height:250px;
      object-fit: cover;
      width: 20.8vw;
      width: 100%;

      background: #c2ccbe;
      margin-bottom: 1em;
    }
  }
  .contain {
    position: relative;
    z-index: -1;
    display: flex;
    color: black;
    font-size: clamp(12px, calc(7px + 0.6vw), 16px);
    justify-content: space-between;
    border: 2px solid grey;
    color: grey;
    width: 100%;
    // padding: 1vw 0.5rem;
    padding: 0 0.5rem;

    text-transform: capitalize;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1vw;
    height: calc(2vw + 16px);
    overflow: hidden;
    // padding: 0;
  }
  .props {
    transition: 1s ease;
    overflow: hidden;
    transform: translateY(-200%);
    transform: translateY(0);
    height: 0;
    // background: red;

    .prop {
      //   width: 100%;
      padding: 0.8vw 0.5rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid grey;

      .sizes {
        width: 7rem;
        display: flex;
        // justify-content: space-between;
        gap: 0.5vw;

        span {
          // padding: 0.2vw 0.4vw;
          width: 20px;
          height: 20px;
          width: max(1.4vw, 15px);
          height: max(1.4vw, 15px);
          place-items: center;
          display: grid;
          color: grey;
          transition: border 0.4s ease-in-out;
        }
        .active {
          border: solid 1px black;
          font-weight: 500;
          color: #453f39;
        }
      }
      .color {
        display: flex;
        gap: 0.5vw;
        .span {
          width: 1.2rem;
          height: 1.2rem;
          width: max(1.4vw, 10px);
          height: max(1.4vw, 10px);
          border: solid 2px transparent;
        }
        .active {
          border-color: white;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgb(0, 0, 0, 0.2);
        }
      }

      .quantity_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 5rem;

        p {
          font-size: max(12px, calc(7px + 0.6vw));
          line-height: 1rem;
        }

        button {
          background: transparent;
          display: grid;
          font-size: max(12px, calc(7px + 0.6vw));
          color: #453f39;
          cursor: pointer;
          border: none;
          padding: 0;
        }
      }
    }
  }
  .active {
    height: 100%;
  }
  .header {
    text-transform: capitalize;
    justify-content: space-between;
    font-size: clamp(12px, calc(7px + 0.6vw), 16px);
    display: flex;

    h4 {
      font-weight: 400;
    }
    .arrow {
      transition: 0.7s ease;
      cursor: pointer;
    }

    .active {
      transform: rotate(-180deg);
    }
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
