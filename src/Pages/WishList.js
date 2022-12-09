import React, { useEffect } from "react";
import styled from "styled-components";
import { WishProduct } from "../components/WishProduct";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { CartModal } from "../Utilities/CartModal";
import AdvertNewsLetter from "../components/AdvertNewsLetter";
import { useFireContext } from "../components/FirebaseContext";
import { Link } from "react-router-dom";

const WishList = () => {
  const wishProducts = useSelector((state) => state.productCate.savedProducts);
  const { getWishList, User } = useFireContext();

  useEffect(() => {
    try {
      User && getWishList();
    } catch (error) {
      alert(error);
    }
    // eslint-disable-next-line
  }, [User]);

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
        {wishProducts.length > 0 && (
          <p>
            {wishProducts.length} item{wishProducts.length > 1 ? "s" : ""}
          </p>
        )}
      </div>
      {!User ? (
        <div className="wished no_user">
          <p> you'll need to sigin-in to view saved products.</p>
          <Link to="/identity/signin" className="link">
            {" "}
            <button>sign in</button>
          </Link>
        </div>
      ) : (
        <div className="wished">
          {wishProducts.length === 0 ? (
            <p>no wishlist available at the moment</p>
          ) : (
            wishProducts.map((item) => {
              const {
                image,
                cate,
                name,
                color,
                price,
                stock,
                type,
                id,
                delId,
              } = item;
              return (
                <WishProduct
                  key={id}
                  wishProp={{
                    name,
                    id,
                    price,
                    color,
                    stock,
                    cate,
                    type,
                    delId,
                    image,
                  }}
                />
              );
            })
          )}
        </div>
      )}
      <CartModal />
      <AdvertNewsLetter />
    </Wrapper>
  );
};

export default WishList;

const Wrapper = styled.section`
  min-height: 80vh;
  padding: 2vw;

  .wishlist {
    display: flex;
    justify-content: space-between;
    padding: 0 2vw;
    margin-bottom: 1vw;
    align-items: center;

    .wish_heading {
      h1 {
        font-size: clamp(12px, calc(8px + 2vw), 24px);
        color: var(--font_pri);
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      div {
        background: var(--bg_org);
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

  .no_user {
    display: flex;
    flex-direction: column;
    align-items: center;

    .link button {
      font-size: clamp(9px, calc(10px + 0.5vw), 16px);
      background: none;
      cursor: pointer;
      color: var(--font_pri);
      border: 2px solid grey;
      padding: 0.2em 1em;
      transition: border-color 0.7s;

      &:hover {
        border-color: black;
      }
    }
  }
`;
