import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Next } from "../Utilities/Next";
import { Prev } from "../Utilities/Prev";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ProductNavDisplay } from "./ProductNavDisplay";
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

const IndividualProductComponent = ({ products, cate, id }) => {
  const [displayOpt, setdisplayOpt] = useState({
    display: false,
    prevScrollY: 0,
  });

  // start
  const [isLoading, setisLoading] = useState(false);
  const [newproduct, setnewProducts] = useState("");
  const getProduct = (items, id) => {
    const previndex = items.findIndex(findId);
    function findId(item) {
      return item.id === id;
    }
    console.log(items.length, previndex);
    const plus = items[`${previndex === items.length - 1 ? 0 : previndex + 1}`];
    const minus =
      items[`${previndex === 0 ? items.length - 1 : previndex - 1}`];

    setnewProducts({ plus, minus });
    //  setnewProducts({name:products,price,url});
  };

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(false);
      try {
        const product = await axios.get(`/api/products?cate=${cate}`);
        const { data } = product;
        const filtered = data.filter((items) => {
          const { name } = items;
          if (type === "beach") {
            return name === type + "?please";
          }
          return name === type;
        });
        console.log(data, type, cate);
        const { values } = filtered[0];
        getProduct(values, id);
        setisLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // stop
  const refOfProp = useRef(null);
  const { display, prevScrollY } = displayOpt;
  const scrollLog = () => {
    console.log("work....");
    if (window.pageYOffset > prevScrollY) {
      let propBottom = refOfProp.current.getBoundingClientRect().bottom;
      let scroll = window.pageYOffset;
      const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top = "-72px";

      return scroll > propBottom + scroll
        ? setdisplayOpt({ display: true, prevScrollY: scroll })
        : (nav_cont.style.top = "-72px");
    }
    if (window.pageYOffset < prevScrollY) {
      let scroll = window.pageYOffset;
      const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top = "0";

      return setdisplayOpt({ display: false, prevScrollY: scroll });
    }
  };
  const match = useMatch("/productpersonal");
  const [direction, setdirection] = useState("leave");
  const prevnext = (a) => {
    console.log(a);
    if (a === "prev") {
      return setdirection("prev");
    } else if (a === "next") {
      return setdirection("next");
    }
    return setdirection(a);
  };
  useEffect(() => {
    // document.body.style.overflow = "hidden";
    window.onscroll = scrollLog;
  });
  // window.onscroll = match ? scrollLog : null;

  const [modalDisplay, setModalDisplay] = useState(false);
  const optionsDisplay = () => {
    return setModalDisplay(!modalDisplay);
  };

  const { pictures, name, color, price, ratings, stock, type } = products;
  console.log(pictures);

  return (
    isLoading && (
      <Wrapper>
        <AnimatePresence>
          {display && (
            <ProductNavDisplay
              obj={{ image: pictures["0"].url, name, price }}
            />
          )}
        </AnimatePresence>
        <div className="head_single_product">
          {/* <p className="links">{cate + "/" + type + "/" + name}</p> */}
          <div className="links">
            <Link className="link" to={`/shop/${cate}`}>
              {cate}/
            </Link>
            <Link className="link" to={`/products/${cate + "/" + type}`}>
              {type}/
            </Link>
            <p className="paa">{name}</p>
          </div>
          <div className="switch_product">
            <Prev prev={newproduct.minus} direction={direction} />
            <Next next={newproduct.plus} direction={direction} />

            <Link
              to={`/productpersonal/${cate}/${newproduct.minus.id}`}
              className="btn_contain"
            >
              <button>prev</button>
              <GrPrevious
                onMouseEnter={() => {
                  prevnext("prev");
                }}
                onMouseLeave={() => {
                  prevnext("leave");
                }}
                className="nav_icon"
              />
            </Link>
            <Link
              to={`/productpersonal/${cate}/${newproduct.plus.id}`}
              className="btn_contain"
            >
              <button>next</button>
              <GrNext
                onMouseEnter={() => {
                  prevnext("next");
                }}
                onMouseLeave={() => {
                  prevnext("leave");
                }}
                className="nav_icon"
              />
            </Link>
          </div>
        </div>
        <section className="page_data">
          <div className="img">
            <div className="sub_img">
              {pictures.map((items, index) => {
                const { url } = items;
                return (
                  <img
                    className={`${index === 1 ? "" : "inactive"}`}
                    src={url}
                    alt=""
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
                  <h3 className="h3">NGN {price}</h3>
                  <div className="star">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarEmpty />
                  </div>
                </div>
              </div>

              <div className="props">
                <h3>Color</h3>
                <div className="color">
                  {
                    <motion.div
                      initial={{ opacity: 1, scaleX: 0, scaleY: 0 }}
                      animate={{
                        scaleX: modalDisplay ? 1 : 0,
                        scaleY: modalDisplay ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        damping: 15,
                      }}
                      className="props_modal"
                    >
                      {color.map((items, index) => {
                        return (
                          <span
                            style={{ background: items }}
                            className={index === 1 ? "span active" : "span"}
                          >
                            {" "}
                          </span>
                        );
                      })}
                    </motion.div>
                  }
                  {/* <span>RED</span>{" "} */}
                  <motion.button
                    animate={{ rotateZ: modalDisplay ? 180 : 0 }}
                    onClick={optionsDisplay}
                  >
                    <FaAngleUp />
                  </motion.button>
                </div>
              </div>

              <div className="quantity props">
                <h3>Quatity</h3>
                <div className="quantity_btn">
                  <motion.button>
                    <FaAngleLeft />
                  </motion.button>
                  <p>1</p>
                  <motion.button>
                    <FaAngleRight />
                  </motion.button>
                </div>
              </div>
              <div className="props">
                <h3>Size</h3>
                <div className="sizes">
                  <span className={`${true ? "active" : ""}`}>S</span>
                  <span className={`${true ? "" : ""}`}> M</span>
                  <span className={`${true ? "" : ""}`}> L</span>
                  <span className={`${true ? "" : ""}`}> XL</span>
                </div>
              </div>
              <button ref={refOfProp} className="add_cart">
                ADD TO CART{" "}
                <span>
                  <RiShoppingBag3Fill />
                </span>
              </button>
              <div className="wishlist">
                <FaRegHeart />
              </div>
            </div>
          </section>
        </section>

        <div className="product_info">
          <h2>PRODUCT DESCRIPTION</h2>
          <div className="product_info_contain">
            <div>
              <p>
                A skull in the sun - this new print is hand-drawn. The Undertown
                is relaxed fitting. The cotton base showcases the printed
                graphic on the front and back. Summer vibes.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                esse soluta doloribus deleniti nulla id. Iste accusamus eius,
                illum
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  );
};

export default IndividualProductComponent;

const Wrapper = styled.div`

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

            .props_modal {
              display: flex;
              gap: 0.6rem;
              position: absolute;
              transform-origin:right bottom;
              top:-180%;
              transition:0.3s all ease-in-out;
              right:0;
          
              .span {
                width: max(1.3vw,13px);
                height: max(1.3vw,13px);
                border:solid 2px transparent;
          
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

            span {
              padding: 0.2vw 0.4vw;
              color: gray;
              transition: border 0.4s ease-in-out;
            }
            .active {
              border: solid 1px black;
              font-weight: 500;
              color: #453f39;
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
