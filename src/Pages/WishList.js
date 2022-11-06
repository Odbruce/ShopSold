import React,{useEffect} from "react";
import styled from "styled-components";
import { WishProduct } from "../components/WishProduct";
import { Advertise } from "../Utilities/styled";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { CartModal } from "../Utilities/CartModal";



const WishList = () => {

  const wishProducts = useSelector((state)=>state.productCate.savedProducts)

  useEffect(()=>{
    localStorage.setItem("wishlist",JSON.stringify(wishProducts))
  },[wishProducts])


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
        {wishProducts.length>0&&<p>{wishProducts.length} item{wishProducts.length>1?"s":""}</p>}
      </div>
      <div className="wished">

        {wishProducts.length===0?<p>no wishlist available at the moment</p>:wishProducts.map((item)=>{
          const {image, cate, name, color, price, ratings, stock, type,id} = item;
          console.log(stock);
          return <WishProduct key={id} wishProp={{name,id,price,color,stock,cate,type,image}}/>
        })}
      </div>
      <CartModal/>

      <Advertise>
        <article>
        <h2>
          New to <span>Shop</span>
          <span>Sold</span> ? Sign up to enjoy 10% off your first order
          (excluding sale styles).
        </h2>
        </article>
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
