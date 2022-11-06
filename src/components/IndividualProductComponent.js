import React from "react";
import styled from "styled-components";
import { Next } from "../Utilities/Next";
import { Prev } from "../Utilities/Prev";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ProductNavDisplay } from "./ProductNavDisplay";
import { Stars } from "../Utilities/Stars";
import {
  FaAngleLeft,
  FaAngleUp,
  FaAngleRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import { GrPrevious, GrNext } from "react-icons/gr";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Link, useMatch, useParams } from "react-router-dom";
import { arrange } from "../Utilities/arrange";
import { useSelector, useDispatch } from "react-redux";
import { cartAction, productAction } from "../store";
import { getUniqueValue } from "../Utilities/getUniqueValue";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";
import { PrevAndNext } from "../Utilities/PrevAndNext";
import { QuantityButton } from "../Utilities/QuantityButton";
import Heart from "./Heart";

const IndividualProductComponent = ({ pictures, name, color, price, ratings, stock, type, cate,  id }) => {

  const {savedProducts:favourite,allProducts:allproducts} = useSelector((state) => state.productCate);

  const [errormsg, setErrormsg] = useState([]);

  const [displayColor, setdisplayColor] = useState(false);
 
  const [cartProp,setcartProp] = useState({color:"",size:"",qty:1});

  const [display,setdisplay] = useState(false)
  
  const cart = useSelector((state) => state.cart.cart);
  
  const sizes = getUniqueValue(allproducts, "size", true);
  
  const dispatch = useDispatch();
  
  const {color:selectedColor,size,qty} = cartProp;

 

  const stockLeft = () => {
    let remainingstock = Number(stock);

    const isAvailable = cart.find(
      (item) => item.id === selectedColor + size + id
    );
    if (isAvailable) {
      remainingstock = Number(stock) -  Number(isAvailable.quantity);

      return remainingstock;
    }

    return remainingstock;
  };




  const favorite = {
    image:pictures["0"].url,
    cate,
    name,
    color,
    price,
    ratings,
    stock,
    type,
    id,}
 
  const handleInput = (e) => {
    const { name, textContent, dataset } = e.target;
    let prop = textContent;
    if (name === "color") {
      optionsDisplay();
      prop = dataset.color;
    }
    setcartProp({...cartProp,[name]:prop})
  };


console.log(price)  
console.log(favorite)
  useEffect(()=>{
    console.log(price)
    console.log(favorite)
    dispatch(
      productAction.addToRecentlyViewed({...favorite})
    );
    
  },[])

  const updateCart = () => {

    dispatch(
      cartAction.updateCart({
        name,
        cate,
        type,
        price,
        id,
        image: pictures["0"].url,
        color:selectedColor,
        size,
        quantity:qty,
      })
    );
    setcartProp({...cartProp,qty:1});
    dispatch(cartAction.cartOpen(true));
  };


  const refOfProp = useRef(null);

  const match = useMatch("productpersonal/*")

  useEffect(()=>{
    
    let prevScrollY=window.scrollY;

  const scrollLog = () => {
    if (window.scrollY > prevScrollY) {
      let propBottom = refOfProp.current.getBoundingClientRect().bottom;
      const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top = "-72px";

      return window.scrollY > propBottom + window.scrollY
        ? ( prevScrollY=window.scrollY,setdisplay(true) )
        : (setdisplay(false));
    }
   else {
      const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top = "0";
      prevScrollY=window.scrollY;
      return setdisplay(false)
    }
  };



    window.onscroll = match?scrollLog:null;
})


  const optionsDisplay = () => {
    return setdisplayColor(!displayColor);
  };

  const quantityProps = {qty ,setcartProp ,stockLeft ,selectedColor ,size ,setErrormsg}


  return (
    <Wrapper>
      <AnimatePresence>
        {display && (
          <ProductNavDisplay obj={{ image: pictures["0"].url, name, price }} />
        )}
      </AnimatePresence>
      <div className="head_single_product">
        <div className="links">
          <Link className="link" to={`/shop/${cate}`}>
            {cate}/
          </Link>
          <Link className="link" to={`/products/${cate + "/" + type}`}>
            {type}/
          </Link>
          <p className="paa">{name}</p>
        </div>

          <PrevAndNext cate={cate} type={type} id={id}/>
          
      </div>
      <section className="page_data">
        <div className="img">
          <div className="sub_img">
            {pictures.map((items, index) => {
              const { url } = items;
              return (
                <img
                  key={index}
                  className={`${index === 1 ? "" : "inactive"}`}
                  src={url}
                  alt={name}
                />
              );
            })}
          </div>
          <div className="main_img">
            <img src={pictures["1"].url} alt="" />
          </div>
        </div>
        <section className="product_props">
          <div className="prop_contain">
            <div className="prop_head">
              <h2>{name}</h2>
              <div>
                <h3 className="h3">{priceToLocaleCurrrency(price)}</h3>
                <div className="star">
                  <Stars num={ratings} />
                </div>
              </div>
            </div>

            <div className="props">
              <h3>Color</h3>
              <div className="color">
                {selectedColor && (
                  <div
                    className="spaned"
                    style={{ background: !displayColor && selectedColor }}
                  ></div>
                )}

                {
                  <motion.div
                    initial={{ opacity: 1, scaleX: 0, scaleY: 0 }}
                    animate={{
                      scaleX: displayColor ? 1 : 0,
                      scaleY: displayColor ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      damping: 15,
                    }}
                    className="props_modal"
                  >
                    {color.map((items, index) => {
                      return (
                        <button
                          onClick={handleInput}
                          name="color"
                          data-color={items}
                          key={index}
                          style={{ background: items }}
                          className={
                            selectedColor === items ? "span active" : "span"
                          }
                        >
                          {" "}
                        </button>
                      );
                    })}
                  </motion.div>
                }
                <motion.button
                  animate={{ rotateZ: displayColor ? -90 : 0 }}
                  onClick={optionsDisplay}
                >
                  <FaAngleLeft />
                </motion.button>
                {!selectedColor && <p className="errormsg">{errormsg[0]}</p>}
              </div>
            </div>

            <div className="quantity props">
              <h3>Quatity</h3>
             { 
            stockLeft()===0?<p className="errormsg">product currently out of stock,please check-in later</p>:
            <QuantityButton {...quantityProps}/>
            }
            </div>
            <div className="props">
              <h3>Size</h3>
              <div className="sizes">
                {sizes.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={handleInput}
                      name="size"
                      className={`${size === item ? "active span" : "span"}`}
                    >
                      {item}
                    </button>
                  );
                })}
                {!size && <p className="errormsg">{errormsg[1]}</p>}
              </div>
            </div>
            <button
              ref={refOfProp}
              onClick={updateCart}
              className={
                selectedColor && size ? "add_cart" : "add_cart inactive"
              }
              disabled={selectedColor && size && stockLeft()!== 0 ? false : true}
            >
              ADD TO CART{" "}
              <span>
                <RiShoppingBag3Fill />
              </span>
            </button>
            {/* <div onClick={addToFavourite} className="wishlist">
              {isIt ? <FaHeart /> : <FaRegHeart />}
            </div> */}
            <Heart {...favorite} />
          </div>
        </section>
      </section>

      <div className="product_info">
        <h2>PRODUCT DESCRIPTION</h2>
        <div className="product_info_contain">
          <div>
            <p>
              A skull in the sun - this new print is hand-drawn. The Undertown
              is relaxed fitting. The cotton base showcases the printed graphic
              on the front and back. Summer vibes.
            </p>
            <ul>
              <li>Pullover</li>
              <li>Crew neck</li>
              <li>Hand-drawn palm tree and skull graphic</li>
              <li>Screen printed</li>
              <li>Model is 6'1"/186cm and is wearing size Medium</li>
            </ul>
          </div>
          <div>
            <h3>PRODUCT DETAILS</h3>
            <ul>
              <li>Relaxed fit</li>
              <li>100% cotton</li>
              <li>Machine wash inside out</li>
            </ul>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit esse
              soluta doloribus deleniti nulla id. Iste accusamus eius, illum
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default IndividualProductComponent;

const Wrapper = styled.div`
.errormsg{
  position:relative;
  bottom:-100%;
  font-size:9px;
  color:red;
}

  .head_single_product {
    display: flex;
    padding: 0 6vw;
    margin: 3.5vw auto 3vw;
    box-sizing:border-box;
    background: linear-gradient(to bottom, #e8ebee, #e9e9e9);

    .links {
      font-size: clamp(12px, calc(9.6px + 0.667vw), 1.2rem);
      align-self: center;
      width: 100%;
      
      .link{
        cursor:pointer;
        text-decoration:none;
        color:grey;
      }
      .paa{
        color:black;
        display:inline;
      }
    }
    .switch_product {
      display: flex;
      justify-content: space-between;
      gap: 5vw;
      position:relative;
      
      
      
      .btn_contain {
        cursor: pointer;
        position:relative;
        display:grid;
        justify-items:center;
        text-decoration:none;


        button {
          color: grey;
          border: none;
          font-size: clamp(10px, 1.5vw, 1rem);
          margin-bottom:.4vw;
          background: none;
        }
        .nav_icon {
          font-size: clamp(10px, 1.5vw, 1.2rem);
        }
      }

    }
  }

  .page_data {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
    gap: 2rem;
    background: rgb(148, 164, 142, 0.4);
    background: #e9e9e9;
    background: #f6f5f3;

    .img {
      position: relative;
      padding-bottom: 50px;

      .main_img img {
        width: 100%;
        background: #e8ebee;
        object-fit: cover;
        aspect-ratio: 1/1;
      }
      .sub_img {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 2vw;
        left: 1vw;

        img {
          border: solid 2px #2a2828;
          width: min(100px, 10vw);
          height: min(100px, 10vw);
          object-fit: cover;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }
        .inactive {
          filter: brightness(90%) grayscale(50%);
          border: solid 2px gray;
        }
      }
      @media (max-width: 768px) {
      }
    }

    .product_props {
      display: grid;
      place-items: center;
      margin: 0 auto;
      padding-bottom: 8vw;
      position: relative;

      .prop_contain {
        width: min(25rem, 90vw);
        position: relative;

        .prop_head {
          margin-bottom: 2rem;

          h2 {
            font-family: "poppins", sans-serif;
            font-size: 1.7rem;
            font-size: clamp(20px, calc(2vw + 9px), 32px);
            letter-spacing: 2.5px;
            font-weight: 400;
            text-transform: uppercase;
            margin-bottom: 1rem;
          }

          div {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .h3 {
              font-size: clamp(16px, calc(9px + 2vw), 24px);
              color:green;
            }
            .star {
              align-self: end;
              font-size: max(12px, calc(7px + 0.6vw));
              color: #ffd700;
              width: 5rem;
            }
          }
        }

        .quantity {
          .quantity_btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 5rem;

            .qty_displace {
              font-size: max(12px, calc(7px + 0.6vw));
              width:3rem;
              text-align:center;
              background:transparent;
              border:none;
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
        .props {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          .color {
            position: relative;
            height: 100%;
            width: 3.2rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .spaned{
              width: max(1.3vw,13px);
              height: max(1.3vw,13px);
              transition:0.2s 0.6s ease;
            }

            .errormsg{
              position:absolute;
              width:7rem;
              bottom:-100%;
              font-size:8px;
              color:red;
              text-align:end;
            }

            .props_modal {
              display: flex;
              gap: 0.6rem;
              position: absolute;
              transform-origin:right bottom;
              // top:-180%;
              transition:0.3s all ease-in-out;
              right:40%;
          
              
              .span {
                width: max(1.3vw,13px);
                height: max(1.3vw,13px);
                border:solid 2px transparent;
                transition: border 0.4s ease-in-out;

          
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
              .active{
                border-color:white;
                transform:scale(1.3);
                box-shadow: 0 0 8px  rgb(0,0,0,0.2);
              }
            }
            }

            span {
              line-height: 1rem;
              font-size: max(12px, calc(7px + 0.6vw));
            }

            button {
              background: transparent;
              font-size: max(12px, calc(7px + 0.6vw));
              text-align: center;
              border: none;
              color: #453f39;
              cursor: pointer;
              display: grid;
            }
          }

          .sizes {
            width: 7rem;
            display: flex;
            justify-content: space-between;
            position:relative;

          
              .errormsg{
                position:absolute;
                bottom:-8px;
                width:100%;
                text-align:center;
                font-size:8px;
                color:red;
                text-align:end;
              }

            .span {
              // padding: 0.2vw 0.4vw;
              width:22px;
              height:22px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-transform:uppercase;
              color: gray;
              font-size: clamp(11px, calc(7px + 0.4vw), 12px);
              font-family:inherit;
              transition: border 0.4s ease;
              border: solid 2px transparent;

            }
            .active {
              border-color: black;
              font-weight: 500;
              color: #453f39;
              border-color: #30281e;
              color: #30281e;
            }
          }

          h3 {
            font-size: 1rem;
            font-size: max(12px, calc(7px + 0.6vw));
            letter-spacing: 1px;
            font-weight: 500;

            span {
              font-size: 1rem;
              font-size: max(12px, calc(7px + 0.6vw));
              font-weight: 400;
            }
          }
        }
        .add_cart {
          position: relative;
          font-family: AdihausDIN, Helvetica, Arial, sans-serif;
          font-size: 1.2rem;
          font-size: max(12px, calc(7px + 0.6vw));
          font-size: clamp(12px, calc(9.6px + 0.667vw), 1.2rem);
          font-weight: 600;
          color: white;
          letter-spacing: 1px;
          width: 100%;
          cursor: pointer;
          padding: 0.8rem;
          background: #453f39;
          background: #353b43;
          border: none;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;

          span {
            font-size: 1.5rem;
          font-size: clamp(15px, calc(9.6px + 0.7vw), 1.4rem);
          }
        }

        .inactive{
          background: #453f39;
        }
        .wishlist {
          position: absolute;
          color: #453f39;
          cursor: pointer;
          top: -1.5rem;
          right: 0.9rem;
        }
      }
    }
  }
  .product_info {
    background: #f6f5f3;
    // padding-top:4vw;

    h2 {
      padding: 1.77vh 7.5vw 0;
      font-size: clamp(20px, calc(2vw + 9px), 32px);
    }

    .product_info_contain {
      width: 85vw;
      display: grid;
      font-size: min(12, calc(0.39rem + 1.2vw));
      font-size: clamp(12px, calc(7px + 0.6vw), 16px);

      // font-weight:300;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      margin: 0 auto;
      padding: 3.55vh 0;
      line-height: 1.9rem;
      text-align: left;
      gap: 2rem;

      div {
        justify-self: center;

        @media (max-width: 765px) {
          justify-self: start;
        }
        h3 {
          font-weight: 500;
          letter-spacing: 1px;
        }

        ul {
          li {
            list-style: inside square;
          }
        }
      }
    }
  }
`;
