import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const ProductNavDisplay = ({obj}) => {
  return (
        <Wrapper
      initial={{ opacity: 1, y: -120 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{y:-200}}
      transition={{ type: "tween",ease:[0.1, 0.17, 0.67, 0.7],duration:.4 }}
      id="nav_display"
    >
      <article>
        <div className="img_wrapper">
          <img src={obj.image} alt="" />
          {/* <h3>* * * * *</h3> */}
          <div className="prop_name">
            <h2>{obj.name} </h2>
            <h3 className="h3">NGN {obj.price}</h3>
          </div>
        </div>
      </article>
    </Wrapper>
    
  );
};
const Wrapper = styled(motion.div)`
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 5;
  background: #b6ee56;
  background: #f0f0f0;
  background:transparent;
  // height:11.1vh;
  // height: 100px;
  overflow:hidden;
  color: #242424;
  width: 100%;
  // box-shadow: 0 0 20px 2px grey;
  
  article {
    display: flex;
    justify-content: space-between;
    align-items:center;
    width: 90%;
    // background: red;
    margin: 0 auto;
    height: 100%;

    .img_wrapper {
      backdrop-filter:blur(4px);
      position:relative;
      display: flex;
      background:red;
      background: #f0f0f0;
      background:rgb(240, 240, 240,0.8);
      width:20rem;
      border-left:solid 3px #DB9836;
      padding:0 2vw 0 0;
      gap: 0.5rem;
      height:max(7.8vw,3rem);


      @media (max-width:750px){
        width:10rem;
      }


      img {
        width:10.41vw;
        object-fit:cover;
      }
      .prop_name {
        padding:0.8vw 0;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        h2 {
          font-family: "poppins", sans-serif;
          text-transform:uppercase;
          font-size: clamp(9px,calc(.5vw + 8px),18px);
          letter-spacing: 2.5px;
          font-weight: 400;
            // margin-bottom: 1rem;
        }
        h3 {
          //   margin-bottom: 2rem;
          font-size: 1.3rem;
          font-size:calc(9px + 1vw);
          font-size:clamp(12px,calc(.9vw + 9px),20px);
          color:green;
        }
      }
    }

    .product_props {
        // background: blue;
      width: 25%;

      @media (max-width:780px){
        // display:none;
      }

      .props_wrapper {
        display: flex;
        justify-content: space-between;
        margin: 0.3rem 0 0.3rem;

        h4 {
          font-size: 1rem;
          font-size:calc(2px + 1vw);
          font-size:calc(3.2px + 0.889vw);
          letter-spacing: 1px;
          letter-spacing:0.069vw;
          font-weight: 500;
        }

        .prop_value {
          width: 7.55vw;
          display: flex;
          justify-content: space-between;

          span {
            font-size: 1rem;
            font-size:calc(5px + 1vw);
            font-weight: 400;
          }

          .span {
            width: 1.5rem;
            height: 1.5rem;
            width:1.667vw;
            height:1.667vw;


            &:nth-of-type(1) {
              background: red;
            }
            &:nth-of-type(2) {
              background: blue;
            }
            &:nth-of-type(3) {
              background: green;
            }
            &:nth-of-type(4) {
              background: #242424;
            }
          }
        }
        .quantity_btn {
          display: flex;
          justify-content: space-between;
          padding: 0;
          width: 5rem;
          width: 7.55vw;
          font-size:calc(5px + 1vw);
          height: fit-content;
          align-items: center;
          align-self: center;

          button {
            cursor: pointer;
            display: grid;
            align-items: center;
            background: transparent;
            border: none;
            font-size:calc(5px + 1vw);

            padding: 0;
          }
        }
      }
    }
  }
`;
