import React,{useState} from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsSnapchat } from "react-icons/bs";
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const SideBar = ({bar,setbar,women,men}) => {
  const [enter, setEnter] = useState("men");


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
      const {name,imageUrl,videoUrl} = item;

        return (
        <li key={index} >
        <Link className={`link_nav ${name==="suit yourself"&&"disabled"}`} onClick={()=>{setbar(false);return document.body.style.overflow = "initial" }}  to={`/products/${enter}/${name}`}>
            <p className={name==="suit yourself"?"coming_soon":null}>{name}</p>
            {name!=="suit yourself"?<img src={imageUrl} alt={name} />:<video  autoPlay playsInline loop muted>
            {" "}
            <source type="video/mp4" src={videoUrl} />
            your brower doesnt support html video
          </video>}
        </Link>
      </li>)
      }):
      women.map((item,index)=>{
        const {name,imageUrl} = item;
          return <li key={index}>
          <Link className="link_nav" onClick={()=>{setbar(false);return document.body.style.overflow = "initial" }} to={`/products/${enter}/${name}`}>
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
      onClick={() => {
        document.body.style.overflow = "initial";
          return setbar(false);

        
      }}
      className={bar?"nav_wrap blur_active":"nav_wrap"}
    ></div>
  </NavWrapper>
  )
}

export default SideBar

const after = keyframes`
0%,20%,30%{
  transform:translateY(-110%);
  opacity:0;
}
45%{
  transform:translate(-140%,0);
  opacity:0;
}
50%,60%,90%{
  transform :translate(0,0);
  opacity:1;
}
100%{
  transform:translateY(-110%);
}
`

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
      color:var(--font_pri);
      border-bottom: solid 1px transparent;
      text-transform: uppercase;
      transition: 0.4s ease all;

      span {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 2px;
        background: var(--bg_org);
      }
    }
    .btn_active {
      border-bottom: solid 2px var(--bg_org);
    }
  }

  .ul_nav {
    display: grid;
    box-sizing: border-box;
    padding: 0.2rem 0.4rem;
    height: calc(100vh - 130px);
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      height: fit-content;

      .link_nav {
        display: flex;
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

        video{
          object-fit:cover;
          filter:brightness(50%);
          width: 80px;
          height: 80px;
        }

        p {
          font-size: 14px;
          text-transform:uppercase;
          width: 100px;
          color:var(--font_pri);
          font-weight:500;
          letter-spacing:1px;
        }

        .coming_soon{
          position:relative;
          overflow:hidden;
          &:after{
            content:"coming soon!";
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:white;
            letter-spacing:2px;
            padding:0 1rem 0 0.2rem;
            text-transform:capitalize;
            animation: infinite  ${after} 7s;

          }
        }
      }

      .disabled{
        pointer-events:none;
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
    bottom: 0;
    width: 100%;
    background: #94a48e;
  }
  .nav_wrap {
    position: absolute;
    top: 0;
    height: 100%;
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