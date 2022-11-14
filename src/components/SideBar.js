import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsSnapchat } from "react-icons/bs";
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SideBar = ({bar,setbar,women,men,enter,setEnter}) => {

    return (
    <NavWrapper
    style={{transform:`translateX(${bar?"0":"-320px"})`}}
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
        return <li key={index} >
        <Link className="link_nav" onClick={()=>{setbar(false);return document.body.style.overflow = "initial" }} to={`/products/${obj.type}"/"${name}`}>
          <p>{name}</p>
          <img src={imageUrl} alt={name} />
        </Link>
      </li>}):
      women.map((item,index)=>{
        const {name,imageUrl,values:[obj]} = item;
          return <li key={index}>
          <Link className="link_nav" onClick={()=>{setbar(false);return document.body.style.overflow = "initial" }} to={`/products/${obj.type}"/"${name}`}>
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
        console.log("click")
        document.body.style.overflow = "initial";
          return setbar(false);

        
      }}
      className={bar?"nav_wrap blur_active":"nav_wrap"}
    ></div>
  </NavWrapper>
  )
}

export default SideBar

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 320px;
  height: 100vh;
  background: whitesmoke;
  box-sizing: border-box;
  z-index: 7;
  transform: translateX(-320px);
  transition: 0.3s ease-in-out transform;

  @media (min-width: 780px) {
    display: none;
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
      color:#272727;
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
  .nav_wrap {
    position: absolute;
    top: 0;
    height: 100%;
    // opacity:0
}

.blur_active {
    transition: 0.6s  ease ;
    transition-property:backdrop-filter;
    backdrop-filter: blur(3px);
    opacity:1;
    z-index: -1;
    width: 100vw;
  }
`;