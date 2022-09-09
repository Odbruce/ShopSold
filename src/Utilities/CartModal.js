import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { motion } from "framer-motion";

export const CartModal = () => {
  return (
    <Wrapper animate={{ x: false ? "0%" : "100%" }}>
      <div className="cart_head">
        <h1>your picks(3)</h1>
        <GrClose className="cart_close" />
      </div>
      <div className="cart_products">
        <div className="cart_product">
          <div className="product_details">
            <div className="product_name">
              <p className="name">Lorem ipsum dolo bsgfiv figuir</p>
              <p>NGN 2400</p>
            </div>
            <div className="props">
              <p>Size : L</p>
              <p>Quatity : 1</p>
            </div>
            <p className="cursor">REMOVE</p>
          </div>
          <div className="product_img">
            <img src="" alt="" />
          </div>
        </div>
        <div className="cart_product">
          <div className="product_details">
            <div className="product_name">
              <p className="name">Lorem ipsum dolor </p>
              <p>NGN 2400</p>
            </div>
            <div className="props">
              <p>Size : L</p>
              <p>Quatity : 1</p>
            </div>
            <p className="cursor">REMOVE</p>
          </div>
          <div className="product_img">
            <img src="" alt="" />
          </div>
        </div>
        <div className="cart_product">
          <div className="product_details">
            <div className="product_name">
              <p className="name">Lorem ipsum dolor </p>
              <p>NGN 2400</p>
            </div>
            <div className="props">
              <p>Size : L</p>
              <p>Quatity : 1</p>
            </div>
            <p className="cursor">REMOVE</p>
          </div>
          <div className="product_img">
            <img src="" alt="" />
          </div>
        </div>
        <div className="cart_product">
          <div className="product_details">
            <div className="product_name">
              <p className="name">Lorem ipsum dolor </p>
              <p>NGN 2400</p>
            </div>
            <div className="props">
              <p>Size : L</p>
              <p>Quatity : 1</p>
            </div>
            <p className="cursor">REMOVE</p>
          </div>
          <div className="product_img">
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="cart_checkout">
        <div className="cart_total">
          <h3>Total</h3>
          <p>NGN 7200</p>
        </div>
        <button>CHECKOUT</button>
        <button>CONTINUE SHOPPING</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  z-index: 3;
  background: whitesmoke;
  border: solid 1px grey;
  height: 100%;
  flex-direction: column;
  transition: ease-in 0.5s all;
  transform: translateX(100%);
  padding: 1.5rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100%;
  }

  .cart_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5vw;
    border-bottom: 1px black solid;

    h1 {
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 24px;
    }

    .cart_close {
      cursor: pointer;
    }
  }

  .cart_products {
    display: grid;
    gap: 2vw;
    height: calc(100vh - 14rem);
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .cart_product {
      display: flex;
      justify-content: space-between;
      gap: 1vw;
      padding: 2vw 0 0 0;
      height: fit-content;
      box-sizing: border-box;
      border-top: 1px solid grey;
      margin-bottom: 0.5vw;

      &:nth-of-type(1) {
        border: none;
      }

      .product_details {
        display: grid;
        gap: 1vw;
        text-transform: uppercase;
        width: 50%;

        .product_name {
          .name {
            letter-spacing: 1px;
            text-transform: capitalize;
            margin-bottom: 0.4rem;
          }
        }
        .props {
          font-size: max(9px, 0.76vw);
          font-size: 11px;
          gap: 0.2vw;
          display: grid;
          letter-spacing: 1px;
          }

          .cursor {
            cursor: pointer;
          }
        }
      }

      .product_img {
        width: 120px;
        background: grey;
        height: 150px;
      }
    }
  }

  .cart_checkout {
    position: relative;
    display: grid;
    gap: 10%;
    height: 128px;
    width: 100%;
    border-top: 1px solid black;

    .cart_total {
      padding: 5px 0 0 0;
      box-sizing: border-box;

      display: flex;
      justify-content: space-between;
    }
    button {
      border: none;
      background: black;
      padding: 1vw 0;
      cursor: pointer;
      justify-content: center;
      color: whitesmoke;
      align-items: center;
    }
  }
`;
