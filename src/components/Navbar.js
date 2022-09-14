import { Link, useMatch, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiBodyScanFill, RiShoppingBag3Fill } from "react-icons/ri";
import { BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { Navmodal } from "../Utilities/Navmodal";
import { GrClose } from "react-icons/gr";
import { SearchModal } from "../Utilities/SearchModal";
import { BsFacebook, BsInstagram, BsTwitter, BsSnapchat } from "react-icons/bs";

import styled from "styled-components";

const Navbar = () => {
  const matchome = useMatch("/");
  const matchshop = useMatch("/shop/*");
  const { cate } = useParams();
  console.log(cate);

  const [navmodal, setnavmodal] = useState("");

  const navfunc = (e) => {
    const { top, bottom, left, width, height, right } =
      e.target.getBoundingClientRect();
    setnavmodal(e.target.textContent.toLowerCase());
    const modal = document.getElementById("navmodal");
    const { height: modalheight } = modal.getBoundingClientRect();
    modal.style.top = `${top + height}px`;
    modal.style.left = `${left - 10 + width / 2}px`;
    modal.style.display = "flex";
    // modal.style.height = "fit-content";
  };

  const closeSubmenu = (e) => {
    if (!e.target.classList.contains("men")) {
      const modal = document.getElementById("navmodal");
      modal.style.display = "none";
    }
  };
  // console.log(matchshop.params["*"]);

  const [hide, setHide] = useState(true);
  const [enter, setEnter] = useState({ btn1: true, btn2: false });
  const [bar, setbar] = useState(false);
  const [isFocused, setIsfocused] = useState(false);

  const scrollLog = () => {
    console.log("ok...");
    const heading = document.getElementById("header");
    const nav = document.getElementById("nav_id");
    const nav_bottom = nav.getBoundingClientRect().bottom;
    const scrollY = heading.getBoundingClientRect().top;
    const scrollYY = heading.getBoundingClientRect().bottom;

    console.log(scrollY, window.pageYOffset);
    if (nav_bottom > scrollY) {
      heading.style.opacity = 0;
      console.log("hide");
      return setHide(false);
    } else {
      heading.style.opacity = 1;
      return setHide(true);
    }
  };
  useEffect(() => {
     window.onscroll = matchshop&&scrollLog;
  });

  // window.onscroll();
  return (
    <>
      {<Navmodal name={navmodal} />}

      <div className="product-heading">
        <div className="discount">
          <p>
            <span>
              <b>Discount</b> :{" "}
            </span>
            Sign up and get a 10% discount on any of your first five purchases,
            along with other benefits.
          </p>
          <div className="button">
            <button>Sign-up now</button>
          </div>
          <button className="discount-close">
            <GrClose />
          </button>
        </div>
      </div>
      <NavWrapper
        initial={{ x: "-150%" }}
        animate={{ x: bar ? 0 : "-150%" }}
        transition={{
          duration: 0.4,
          type: "tween",
          ease: [0.6, 0.15, 0.59, 0.9],
        }}
      >
        <div className="header">
          <button
            onClick={() => {
              return setEnter({ ...enter, btn1: true, btn2: false });
            }}
          >
            women {enter.btn1 && <span></span>}
          </button>

          <button
            onClick={() => {
              return setEnter({ ...enter, btn2: !enter.btn2, btn1: false });
            }}
          >
            men {enter.btn2 && <span></span>}
          </button>
        </div>
        <ul className="ul_nav">
          <li>
            <Link className="link_nav" to="">
              <p>Lorem, ipsum</p>
              <img src="" alt="" />
            </Link>
          </li>
          <li>
            <Link className="link_nav" to="">
              <p>Lorem, ipsum.</p>
              <img src="" alt="" />
            </Link>
          </li>
          <li>
            <Link className="link_nav" to="">
              <p>Lorem, ipsum.</p>
              <img src="" alt="" />
            </Link>
          </li>
          <li>
            <Link className="link_nav" to="">
              <p>Lorem, ipsum.</p>
              <img src="" alt="" />
            </Link>
          </li>
          <li>
            <Link className="link_nav" to="">
              <p>Lorem, ipsum.</p>
              <img src="" alt="" />
            </Link>
          </li>
          <li>
            <Link className="link_nav" to="">
              <p>Lorem, ipsum.</p>
              <img src="" alt="" />
            </Link>
          </li>
        </ul>
        <ul className="footer">
          <li>
            <BsFacebook />
          </li>
          <li>
            <BsInstagram />
          </li>
          <li>
            <BsTwitter />
          </li>
          <li>
            <BsSnapchat />
          </li>
        </ul>
        <div
          onClick={(e) => {
            document.body.style.overflow = "initial";
              return setbar(false);

            
          }}
          className={bar ? "nav_wrap blur_active" : "nav_wrap"}
        ></div>
      </NavWrapper>
      <Wrapper
        onMouseOver={closeSubmenu}
        animate={{ opacity: !matchome ? 1 : 0 }}
        id="nav_id"
      >
        {isFocused && <SearchModal Focused={{isFocused,setIsfocused}} />}
          
        <div
          onClick={() => {
            setbar(!bar);
             document.body.style.overflow = "hidden";
            
          }}
          className="bars"
        >
          <div className={`${bar ? "bar_active" : ""}`}></div>
          <div className={`${bar ? "bar_active" : ""}`}></div>
          <div className={`${bar ? "bar_active" : ""}`}></div>
        </div>

        <div className="nav-buttons">
          <button onMouseOver={navfunc}>
            <Link className={cate === "men" ? "active" : "men"} to="/shop/men">
              MEN
            </Link>
          </button>
          <button onMouseOver={navfunc}>
            <Link
              className={cate === "women" ? "active" : "men"}
              to="/shop/women"
            >
              WOMEN {cate}
            </Link>
          </button>
          <button className="men">CONTACT</button>
        </div>
        <Link aria-disabled className="shopsold" to="/">
          <motion.h3
            initial={{ y: matchshop ? 50 : 0 }}
            animate={{ y: matchshop ? (hide ? 50 : 0) : 0 }}
            transition={{
              duration: 0.4,
              type: "tween",
              ease: [0.6, 0.15, 0.59, 0.9],
            }}
            className="link"
          >
            SHOP<span>SOLD</span>
          </motion.h3>
        </Link>
        <ul className="ul">
          <button className={isFocused ? "active search" : "search"}>
            {/* <div className="drop_display"></div> */}
            <GrClose className="close_me" />
            <div className="search_icon">
              <BsSearch onClick={() => {
                setIsfocused(true);
                document.body.style.overflow = "hidden";
              }} />
            </div>
            <input
              type="text"
              placeholder="search for products"
              className="input_text"
              id="inputed"
              onFocus={() => {
                setIsfocused(true);
                document.body.style.overflow = "hidden";
              }}
            />
          </button>
          <button className="hmm">
            <Link className="cart_nav" to="/cart">
              <RiShoppingBag3Fill />
              <p>3</p>
            </Link>
          </button>
          <button>
            <Link className="wishlist" to="/wishlist">
              {" "}
              <BsBookmarkHeart />
            </Link>
          </button>
          {/* <button><Link  className="signin" to="/signin"><BsSearch/></Link></button> */}
        </ul>
      </Wrapper>
    </>
  );
};

export default Navbar;

const NavWrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 320px;
  height: 100vh;
  background: whitesmoke;
  box-sizing: border-box;
  z-index: 7;
  transform: translateX(-150%);
  transition: 0.2s ease-in-out transform;

  @media (min-width: 780px) {
    display: none;
  }

  .nav_wrap {
    position: absolute;
    top: 0;
    height: 100%;
    // background: rgb(0, 0, 0, 0.2);
    // background: rgb(219, 152, 54, 0.1);
    transition: 0.2s ease all;
    width: 0vw;
  }

  .blur_active {
    backdrop-filter: blur(3px);
    z-index: -1;
    width: 100vw;
  }

  .header {
    display: flex;
    // justify-content: space-between;
    gap: 0.2rem;
    margin-bottom: 0.6rem;

    button {
      width: 100%;
      height: 48px;
      border: none;
      cursor: pointer;
      position: relative;
      // border-bottom: solid 1px transparent;
      text-transform: uppercase;
      transition: 0.4s ease all;

      span {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 2px;
        background: #db9836;
      }
    }
    .btn_active {
      border-bottom: solid 2px #db9836;
    }
  }

  .ul_nav {
    display: grid;
    box-sizing: border-box;
    padding: 0.2rem 0.4rem;
    height: calc(100vh - 130px);
    overflow: auto;
    scrollbar-width: none;
    // gap: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      height: fit-content;

      .link_nav {
        display: flex;
        background: grey;
        background: #bbb8b0;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.4rem;
        text-decoration: none;
        color: whitesmoke;
        img {
          width: 80px;
          height: 80px;
          background: #94a48e;
        }
        p {
          font-size: 12px;
          width: 200px;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.4rem;
    position: absolute;
    height: 50px;
    margin-bottom: 1rem;
    bottom: 0;
    width: 100%;
    background: #94a48e;
  }
`;

const Wrapper = styled(motion.section)`
  height: clamp(50px, 5vw, 72px);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  transition: ease-in 0.4s;
  align-items: center;
  padding: 0 5%;
  background: linear-gradient(to bottom, #c2ccbe, #e8ebee);
  color: #30281e;
  font-size: 3rem;
  position: sticky;
  top: 0px;
  z-index: 3;
  /* box-shadow:0px 9px 9px 0px rgb(0, 0, 0,.25); */
  // background:yellow;

  
  .bars {
    display: none;
    // background: red;
    @media (max-width: 780px) {
      display: flex;
      height: 0.9rem;
      width: 1.1rem;
      justify-content: space-around;
      flex-direction: column;
      transition: all ease-in-out 0.1;

      div {
        height: 0.104rem;
        width: 100%;
        transition: all ease-in-out 0.3s;
        background: #79b0b0;
      }

      .bar_active {
        &:nth-of-type(1) {
          transform: translateY(0.45rem) rotate(45deg);
        }

        &:nth-of-type(2) {
          transform: translateX(-100%);
          opacity: 0;
        }

        &:nth-of-type(3) {
          transform: translateY(-0.45rem) rotate(-45deg);
        }
      }
    }
  }

  .nav-buttons,
  .ul {
    display: flex;
    // justify-content: space-between;
    gap: 2vw;
  }
  button {
    font-size: clamp(12px, calc(0.9vw + 3px), 14px);
    border: none;
    color: #767879;
    background: transparent;
    cursor: pointer;
    transition: ease-in 0.3s;

    &:hover {
      color: #30281e;
    }
  }
  .ul {
    // background:blue;
    position: relative;

    .wishlist,
    .search,
    .cart_nav {
      color: #767879;
      font-size: clamp(0.7rem, calc(1.3vw + 4px), 1.5rem);
      display: grid;

      &:hover {
        color: #30281e;
        transition: ease-in 0.3s;
      }
    }
    .search {
      position: relative;
      

      .drop_display {
        // position: absolute;
        top: 0;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        z-index: 4;
        left: 0;
        background: whitesmoke;
        width: 100%;
      }

      .input_text {
        font-family: futura-pt, sans-serif;
        background: transparent;
        width: 10rem;
        transition: 0.3s ease-in-out width;
        padding: 0.4rem 4rem 0.4rem 0.4rem;
        box-sizing: border-box;
        border: 2px solid grey;
        border-top-left-radius: 1rem 50%;
        border-bottom-left-radius: 1rem 50%;
        border-top-right-radius: 1rem 50%;
        border-bottom-right-radius: 1rem 50%;
        dislay: flex;
        font-weight: lighter;
        color: #30281e;
        letter-spacing: 1px;
        font-size: clamp(0.5rem, calc(1.3vw + 3px), 0.9rem);
        outline: none;
        z-index: 5;

        &:focus {
          background: whitesmoke;
          border: 2px solid #78aaff;
          transition: 0.4s ease-in-out all;
          width: 35rem;
        }
        &::placeholder {
          font-family: futura-pt, sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          // color: red;
        }

        @media (max-width: 780px) {
          display:none;
        }
      }

      .close_me {
        position: absolute;
        font-size: clamp(0.5rem, calc(1.3vw + 3px), 1rem);
        top: 25%;
        // display: none;
        opacity: 0;
        right: 2.1rem;

        @media(max-width:780px){
          display:none;
        }
      }
      .search_icon {
        z-index: 10;
        position: absolute;
        font-size: clamp(0.5rem, calc(1.3vw + 3px), 1rem);
        right: 0;
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        color: #30281e;
        border-radius: 50%;

        @media(max-width:780px){
          width:fit-content;
          height:fit-content;
          position:relative;

        }

      }
    }

    .active {
      opacity:0;
        transition: 0.6s ease-in-out all;
        transform:translateX(-40vw);

    }

    button {
      position: relative;

      .cart_nav {
        color: #30281e;

        p {
          position: absolute;
          background: #dd4040;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: clamp(6px, calc(1.51vw + 2px), 20px);
          line-height: clamp(6px, calc(1.51vw + 2px), 20px);
          height: clamp(6px, calc(1.51vw + 2px), 20px);
          right: -50%;
          top: -50%;
          font-size: clamp(6px, calc(1vw + 2px), 1.5rem);
        }
      }
    }
    .hmm {
      height: fit-content;
      align-self: center;
    }
  }
  .nav-buttons {
    // background:purple;
    gap: 0;

    @media (max-width: 780px) {
      display: none;
    }

    .men {
      text-decoration: none;
      color: #767879;
      padding: 1rem;

      &:hover {
        color: #30281e;
        transition: ease-in 0.3s;
      }
    }
    .active {
      color: #30281e;
      text-decoration: none;
      background: red;
    }
  }
  .shopsold {
    position: absolute;
    letter-spacing: 2px;
    font-size: 32px;
    // background:red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: initial;
    text-decoration: none;
    overflow: hidden;

    .link {
      font-size: clamp(16px, calc(2.22vw + 8px), 32px);
      font-weight: 500;
      cursor: pointer;

      color: #353b43;
      color: #db9224;
    }
    span {
      background: #a8a98e;
      color: #94a48e;
      color: whitesmoke;
    }
  }
`;
