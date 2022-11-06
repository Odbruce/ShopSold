import React from "react";
import "../Shop.css";
import { motion } from "framer-motion";
import { Link,useParams} from "react-router-dom";

// import Nav from "../components/Nav";
import Categories from "../components/Categories";
import WhatYouMightLike from "../components/WhatYouMightLike";
import { useEffect } from "react";

const ShopHome = () => {
  const {cate} = useParams();

  const main = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,

      transition: {
        // type: "spring",
        // stiffness: 100,
        // staggerChildren: 0.4,
        // when: "beforeChildren",
      },
    },
  };
  const btn = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 0,
      y: 0,
      transition: {
        type: "tween",
        ease: [0.6, 0.15, 0.59, 0.9],
        duration: 0.8,
      },
    },
  };
  useEffect(()=>{
    document.getElementById("vid").play();

  },[])
  const paste = cate==="men"?require("../Utilities/men_display1.mp4"):require("../Utilities/display_2.mp4");
  // console.log(paste);

  return (
    <main>
      <motion.div
        initial={{
          width: `${(window.innerWidth * 55.5) / 100}px`,
        }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.4, ease: [0.6, 0.15, 0.59, 0.9] }}
        className="container"
      >
        <div className="img-container">
         
          <video id="vid"  autoPlay muted loop>
            {" "}
            <source type="video/mp4" src={paste} />
            your brower doesnt support html video
          </video>
        </div>
        <motion.div
          variants={main}
          initial="initial"
          animate="animate"
          className={"navhome_open"}
        >
          <div className="landing-write">
            <motion.h1 initial={{opacity:0}} animate={{opacity:1,y:"-100%"}} transition={{duration:0.5,type:"tween",ease: [0.1, 0.17, 0.67, 0.7]}} id = "header" className="shopsold_heading">
              SHOP<span>SOLD</span>
            </motion.h1>
            {/* <div className="btn-group">
              <Link className=" btn-gender cursor" to="/shop/men">
                <motion.button variants={btn} className="button" >
                  <div></div> SHOP MEN
                </motion.button>
              </Link>

              <Link className=" btn-gender cursor" to="/shop/women">
                <motion.button variants={btn} className="button" >
                  <div></div> SHOP WOMEN
                </motion.button>
              </Link>
            </div> */}
          </div>
        </motion.div>
      </motion.div>

      <Categories />
      <WhatYouMightLike />
    </main>
  );
};

export default ShopHome;
