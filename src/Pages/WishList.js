import React from "react";
import styled from "styled-components";
import { WishProduct } from "../components/WishProduct";
import { Advertise } from "../Utilities/styled";
import { motion } from "framer-motion";

const WishList = () => {
  return (
    <Wrapper>
      <div className="wishlist">
        <div className="wish_heading">
          <h1>wishlist</h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: [0.1, 0.17, 0.67, 0.7],
            }}
          ></motion.div>
        </div>
        <p>2 items</p>
      </div>
      <div className="wished">
        <WishProduct />
        <WishProduct />
        <WishProduct />
        <WishProduct />
      </div>
      {/* <Wrapper1>
        <div className="para">
          <p>
            Your wishlist will be lost at the end of your browsing session.
            Please
            <span> sign in</span> or <span>register</span> in order to save your
            wishlist.
          </p>

          <p>There are currently no items in your wishlist</p>
        </div>
      </Wrapper1> */}

      <Advertise>
        <h2>
          New to <span>Shop</span>
          <span>Sold</span> ? Sign up to enjoy 10% off your first order
          (excluding sale styles).
        </h2>
        <form className="newletter">
          <p>
            Sign up to receive exclusive updates on our new collections and
            special offers. To improve your experience we may; profile, segment,
            test, analyse and model your details. You can unsubscribe at any
            time via the link in your emails. Please refer to our Privacy Policy
            for further details.
          </p>
          <input placeholder="newsletter" type="text" name="" id="" />
        </form>
      </Advertise>
    </Wrapper>
  );
};

export default WishList;

const Wrapper1 = styled.section`
  text-align: center;
  p {
    font-size: clamp(12px, calc(7px + 0.8vw), 16px);
  }
  .para {
    margin-top: 5vw;
    p {
      margin-top: 1vw;
    }
  }
`;

const Wrapper = styled.section`
  min-height: 80vh;
  // background: red;
  padding: 2vw;
  .wishlist {
    display: flex;
    justify-content: space-between;
    padding: 0 2vw;
    margin-bottom: 1vw;
    align-items: center;

    .wish_heading {
      h1 {
        font-size: clamp(24px, calc(2.22vw + 8px), 32px);
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      div {
        background: #db9224;
        transform-origin: right;
        height: 2px;
        width: 50%;
      }
    }
    p {
      font-size: clamp(12px, calc(9px + 1vw), 20px);
    }
  }
  .wished {
    width: 100%;
    gap: 1vw;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
`;
