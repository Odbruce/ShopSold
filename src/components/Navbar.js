import { Link, useMatch, useParams,NavLink } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {  RiShoppingBag3Fill,RiShoppingBag3Line } from "react-icons/ri";
import { BsBookmarkHeart,BsBookmarkHeartFill, BsSearch } from "react-icons/bs";
import { Navmodal } from "../Utilities/Navmodal";
import { GrClose } from "react-icons/gr";
import {MdOutlineAccountCircle,MdAccountCircle,MdOutlineLogout} from "react-icons/md"
import { SearchModal } from "../Utilities/SearchModal";
import { BsFacebook, BsInstagram, BsTwitter, BsSnapchat } from "react-icons/bs";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { useFireContext } from "./FirebaseContext";
import { cartAction } from "../store";

const Navbar = () => {
  const matchome = useMatch("/");
 
  const matchshop = useMatch("/shop/*");
  const { cate } = useParams();
  console.log(cate);

  const {User,logOut} = useFireContext();

  console.log(User);
  const [navmodal, setnavmodal] = useState("men");
  const dispatch = useDispatch();
  const numberOfProducts = useSelector((state)=>state.cart.totalProducts)
  const cart = useSelector((state)=>state.cart.cart)
  const men =  useSelector((state)=>{return state.productCate.men})
  const women =  useSelector((state)=>{return state.productCate.women})


    
    useEffect(()=>{
    dispatch(cartAction.total());
    localStorage.setItem("cart", JSON.stringify(cart));

    },[cart])

  const navfunc = (e) => {
    const { top, bottom, left, width, height, right } =
      e.target.getBoundingClientRect();
    setnavmodal(e.target.textContent.toLowerCase());
    const modal = document.getElementById("navmodal");
    const { height: modalheight } = modal.getBoundingClientRect();
    modal.style.top = `${top + height}px`;
    modal.style.left = `${left - 10 + width / 2}px`;
    modal.style.display = "flex";
  };

  const closeSubmenu = (e) => {
    if (!e.target.classList.contains("men")) {
      const modal = document.getElementById("navmodal");
      modal.style.display = "none";
    }
  };

  const [enter, setEnter] = useState("women");
  const [bar, setbar] = useState(false);
  const [isFocused, setIsfocused] = useState(false);

  const closed = ()=>{
    const modal = document.getElementById("navmodal");
     modal.style.display="none";
  }

  const scrollLog = () => {
    console.log("ok...");
    const heading = document.getElementById("header");
    const nav = document.getElementById("nav_id");
    const move = document.getElementById("move_header")
    const nav_bottom = nav.getBoundingClientRect().bottom;
    const scrollY = heading.getBoundingClientRect().top;
    const scrollYY = heading.getBoundingClientRect().bottom;

    console.log(scrollY, window.pageYOffset);
    if (nav_bottom > scrollY) {
      heading.style.opacity = 0;
      console.log("hide");
      return move.style.transform="translateY(0)"
    } else {
      heading.style.opacity = 1;
     return move.style.transform="translateY(50px)"
    }
  };

  console.log(matchshop)
     window.onscroll = matchshop?scrollLog:null;




  return (
    <>
      {<Navmodal name={navmodal} />}

      <div id="discount" className="product-heading">
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
          <button onClick={()=>document.getElementById("discount").style.display="none"} className="discount-close">
            <GrClose />
          </button>
        </div>
      </div>
      <NavWrapper
        initial={{ x: "-100%" }}
        animate={{ x: bar ? 0 : "-100%"}}
        transition={{
          duration: 0.4,
          type: "tween",
          ease: [0.6,0.01,-0.05,0.95],
        }}
      >
        <div className="header">
          <button
          name="women"
            onClick={(e) => {
              return setEnter(e.target.name)
            }}
          >
            women {enter==="women" && <span></span>}
          </button>

          <button
          name="men"
            onClick={(e) => {
              return setEnter(e.target.name)
            }}
          >
            men {enter==="men" && <span></span>}
          </button>
        </div>
        <ul className="ul_nav">
        {  enter==="men"?men.map((item,index)=>{
          const {name,imageUrl,values:[obj]} = item;
          console.log(obj.type)
            return <li key={index} >
            <Link className="link_nav" onClick={()=>{setbar(false);return document.body.style.overflow = "initial" }} to={`/products/${obj.type + "/" + name}`}>

              <p>{name}</p>
              <img src={imageUrl} alt={name} />
            </Link>
          </li>}):
          women.map((item,index)=>{
            const {name,imageUrl,values:[obj]} = item;
            console.log(obj.type)
              return <li key={index}>
              <Link className="link_nav" onClick={()=>{setbar(false);return document.body.style.overflow = "initial" }} to={`/products/${obj.type + "/" + name}`}>
  
                <p>{name}</p>
                <img src={imageUrl} alt={name} />
              </Link>
            </li>})
          }
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
          className={bar?"nav_wrap blur_active":"nav_wrap"}
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

        <div className="nav_button">
          <button onMouseOver={navfunc} onClick={closed}>
            <NavLink className={({isActive})=>isActive?"active men": "men"} to="/shop/men">
              MEN
            </NavLink>
          </button>
          <button onMouseOver={navfunc} onClick={closed}>
            <NavLink
              className={({isActive})=>isActive?"active men": "men"}
              to="/shop/women"
            >
              WOMEN
            </NavLink>
          </button>
          <button onClick={()=>{
            document.getElementById("contact").scrollIntoView();
          }} className="contact">CONTACT</button>
        </div>
        <div aria-disabled className="shopsold" >
          <motion.h3
            initial={{ y: matchshop ? 50 : 0 }}
            animate={{ y: matchshop ? 50 : 0 }}
            transition={{
              duration: 0.4,
              type: "tween",
              ease: [0.6, 0.15, 0.59, 0.9],
            }}

            id="move_header"
            
          >
            <Link  className="link" to="/">
            SHOP<span>SOLD</span>
            </Link>
          </motion.h3>
        </div>
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
            <NavLink  className={({ isActive }) =>
              isActive ?`active_nav cart_nav` :"cart_nav"} to="/cart">
                {numberOfProducts>0&&<div><p>{numberOfProducts}</p></div>}
                <RiShoppingBag3Fill />
            </NavLink>
          </button>
          <button>
            <NavLink className={({ isActive }) =>
              isActive ? `active_nav wishlist` :"wishlist"} to="/wishlist">
              {({isActive})=>isActive?<BsBookmarkHeartFill/>:<BsBookmarkHeart />}
            </NavLink>

          </button>

          {!User?(
          <button>
            <NavLink  className={({ isActive }) =>
              isActive ? `signin active_nav` :"signin"} to="/identity/signin">
              {({isActive})=>isActive?<MdAccountCircle/>:<MdOutlineAccountCircle/>}
          </NavLink>
          </button>):(
          <button onClick={logOut}>
            <MdOutlineLogout className="signout" />
          </button>)}
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
    transition: 0.6s ease all;
    opacity:0
  }

  .blur_active {
    backdrop-filter: blur(3px);
    opacity:1;
    z-index: -1;
    width: 100vw;
  }

  .header {
    display: flex;
    gap: 0.2rem;
    margin-bottom: 0.6rem;

    button {
      width: 100%;
      height: 48px;
      border: none;
      cursor: pointer;
      position: relative;
      border-bottom: solid 1px transparent;
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
          object-fit:cover;
        }
        p {
          font-size: 14px;
          text-transform:uppercase;
          width: 200px;
          color:#272727;
          font-weight:500;
          letter-spacing:1px;
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
    // margin-bottom: 1rem;
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
        transition: all ease-in-out 0.7s;
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

  .nav_button,
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
    
    .signout,
    .signin,
    .wishlist,
    .search,
    .cart_nav {
      color: #767879;
      font-size: clamp(0.9rem, calc(1.3vw + 4px), 1.5rem);
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
      font-size: clamp(0.8rem, calc(1.3vw + 3px), 1.1rem);
      
      right: 0;
      width: 2rem;
      height: 2rem;
      display: grid;
        place-items: center;
        // color: #30281e;
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
      
      .active_nav{
        color: #30281e;
        transition: ease-in 0.3s;
      }

      .signout{
        color:#dd4040;
        &:hover{
          color:#dd4040;
        }
      }
      
      .cart_nav {
        
        div {
          position: absolute;
          background: #dd4040;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: clamp(15px, calc(1.51vw + 2px), 40px);
          height: clamp(15px, calc(1.51vw + 2px), 40px);
          right: -50%;
          top: -50%;
          font-size:max(8px,0.933vw);
        }
      }
    }
    .hmm {
      height: fit-content;
      align-self: center;
    }
  }
  .nav_button {
    gap: 0;
    font-family:"Segoe UI";

    @media (max-width: 780px) {
      display: none;
    }
    .contact,
    .men {
      font-family:"Segoe UI";
      text-decoration: none;
      color: #767879;
      letter-spacing:1px;
      padding: 1rem;

    }
    .active {
      color: #30281e;
      font-size:clamp(12px,calc(7px + 0.6vw),16px);
      font-weight:600;
    }
  }
  .shopsold {
    position: absolute;
    letter-spacing: 2px;
    // font-size: 32px;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    cursor: initial;
    overflow: hidden;

    #move_header{
      transition:transform 0.4s cubic-bezier(0.5, 1, 0.89, 1);
      display:grid;
      // justify-content:center;
      // align-items:center;
      place-content:center;
    }
    
    .link {
      text-decoration: none;
      font-size: clamp(18px, calc(2.22vw + 8px), 32px);
      font-weight: 500;
      cursor: pointer;
      letter-spacing:2px;
      color: #353b43;
      color: #db9224;  
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;

      span {
        background: #a8a98e;
        padding:0 5px;
        color: #94a48e;
        color: whitesmoke;
      }
    }
  }
`;
