import React, { useEffect } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartAction } from "../store";
import { priceToLocaleCurrrency } from "./priceToLocaleCurrrency";
import { useFireContext } from "../components/FirebaseContext";

export const CartModal = () => {

  const dispatch = useDispatch();

  const isCartOpen = useSelector((state)=>state.cart.isCartOpen)

  const cart = useSelector((state)=>state.cart.cart)
  const totalPrice = useSelector((state)=>state.cart.totalPrice)
  const totalProducts = useSelector((state)=>state.cart.totalProducts)
  const {User} = useFireContext()

  const close = ()=>{
    dispatch(cartAction.cartOpen(false));
  }

  useEffect(()=>{
    if(cart.length<1){
      return close()}
  },[cart])
  
  


  const deleteCart = (a)=>{
    dispatch(cartAction.deleteCartItem(a))
  }

  // useEffect(()=>{

  //   let clear = setTimeout(()=>{dispatch(cartAction.cartOpen(false))},4000);

  //   // clear();

  //   return ()=>clearTimeout(clear)
  // },[cart,isCartOpen])

  return (
    <Wrapper animate={{ x: isCartOpen ? "0%" : "100%" }}>
      <div className="cart_head">
        <h1>your picks({totalProducts})</h1>
        <GrClose onClick={close} className="cart_close" />
      </div>
      <div className="cart_products">

        {cart.map((item)=>{
          const {name,id,cate,price,image,quantity,color,size} = item;
          console.log(image,color);
          return (
            <div key={id} className="cart_product">
              <div className="product_details">
                <div className="product_name">
                  <p className="name">{name}</p>
                  <p>{priceToLocaleCurrrency(price)}</p>
                </div>
                <div className="props">
                  <p>Size : {size}</p>
                  <span style={{background:color}}></span>
                  <p>Quatity : {quantity}</p>
                </div>
                <button onClick={()=>{deleteCart(id)}} className="cursor deletebtn">REMOVE</button>
              </div>
              <div className="product_img">
                <img src={image} alt="" />
              </div>
            </div>

          )

        })}
        
      </div>
      <div className="cart_checkout">
        <div className="cart_total">
          <h3>Total</h3>
          <p>{priceToLocaleCurrrency(totalPrice)}</p>
        </div>
        <Link to={User?"/checkout":"/identity/signin"} onClick={close} className="cartbtn">{User?"CHECK OUT":"LOGIN TO PROCEED"}</Link>
        <Link to="/"  onClick={close} className="cartbtn">CONTINUE SHOPPING</Link>
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
            text-transform: uppercase;
            font-weight:500;
            margin-bottom: 0.4rem;
          }
        }
        .props {
          font-size: max(9px, 0.76vw);
          font-size: 11px;
          gap: 0.2vw;
          display: grid;
          letter-spacing: 1px;

         span{
            width: max(1.4vw, 10px);
          height: max(1.4vw, 10px);
          display:block;
          }         
          }

          .deletebtn{
            color:grey;
            font-size:clamp(9px, calc(7px + 0.5vw), 16px);
            padding:0.5vw;
            width:fit-content;
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

        img{
          object-fit:cover;
          width:100%;
          height:100%;
        }
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

      p{
        color:green;
        font-weight:500;
      }
    }
    .cartbtn {
      text-decoration:none;
      background: black;
      padding: 1vw 0;
      text-align:center;
      letter-spacing:1px;
      cursor: pointer;
      color: whitesmoke;
    }
  }
`;
