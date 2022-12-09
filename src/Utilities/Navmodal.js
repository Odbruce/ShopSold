import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";



export const Navmodal = ({ name }) => {
  const [i, setindex] = useState(0);
  const menCate = useSelector((state)=>{return state.productCate.men});
  const womenCate = useSelector((state)=>{return state.productCate.women})

  let products = name === "men"?menCate:womenCate;
  const vid = document.getElementById("vid2");


  useEffect(()=>{
    setindex(0);
       if(vid){
        return vid.src=products[0].videoUrl
      };
  },[name,products,vid])


  const onHovered=(num)=>{
    setindex(num);
    if(vid.src !== products[num].videoUrl){
      return vid.src=products[num].videoUrl;
    }
    return;
  }
 

  const closed = ()=>{
    const modal = document.getElementById("navmodal");
     modal.style.display="none";
  }
 
  return (
    <Wrapper className="men" id="navmodal">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="nav_modal"
      >
        <h1>{name}</h1>
        <div className="modal_picks">
          <ul>
            {products.map((items, index) => {
              const { name: cate} = items;

              if(cate!=="suit yourself"){
                return (
                <li
                  className={`${i === index ? "active" : ""}`}
                  onMouseOver={() => { onHovered(index);
                  }}
                  key={index}
                  onClick={closed}
                >
                  <span></span>
                  <Link
                    key={index}
                    className="linked"
                    to={`/products/${name}/${cate}`}
                  >
                    {cate}
                  </Link>
                </li>
              )}else {return null};
            })}
          </ul>
          <div className="nav_vid">
            <video id="vid2" autoPlay loop playsInline muted>
              <source type="video/mp4"  src={products[i].videoUrl} />
              your brower doesnt support html video
            </video>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  box-sizing: border-box;
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 1rem 1rem;
  justify-content: center;
  font-size: 1rem;
  background: whitesmoke;
  position: fixed;
  top: 12rem;
  left: 5rem;
  display: none;
  z-index: 5;
  height: 325px;
  width: 650px;
  border-radius:10px;
  border-top-left-radius:0;

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background: whitesmoke;
    position: absolute;
    top: -14px;
    z-index: 6;
    left: 14px;
    transform-origin: top left;
    transform: rotate(45deg);
  }

  .nav_modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    font-size: 1rem;

    h1 {
      text-align: center;
      position: relative;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: fit-content;
      color: #353b43;
      font-size: 1.5rem;

      &::after {
        height: 2px;
        width: 60%;
        background: var(--bg_org);
        bottom: 0;
        right: 0;
        left: 0;
        position: absolute;
        content: "";
      }
    }

    .modal_picks {
      display: flex;
      justify-content: space-between;

      ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        li {
          position: relative;
          letter-spacing: 1px;
          text-transform: capitalize;
          color: black;

        

          .linked {
            display: block;
            color: black;
            padding: 0.5rem;
            text-decoration: none;
          }
          span {
            transition: 0.5s ease all;
            position: absolute;
            z-index: -2;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            border-left: 2px solid transparent;
            transform: scaleY(0.2);
            transform-origin: top right;
          }
        }
        .active {
          .linked {
            color: var(--bg_org);
          }

          span {
            border-left: 2px solid var(--bg_org);
            background: rgb(0, 0, 0, 0.1);
            transform: scaleY(1);
            width: 100%;
          }
        }
      }

      .nav_vid {
        width: 470px;
        height: 250px;

        video {
          background: #353b43;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 20% 70%;
          transition:0.5s;
        }
        
      }
    }
  }
`;
