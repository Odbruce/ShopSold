import React from "react";
import "../Shop.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams} from "react-router-dom";
import Categories from "../components/Categories";
import WhatYouMightLike from "../components/WhatYouMightLike";

const ShopHome = () => {
  const {cate} = useParams();


 
  useEffect(()=>{
   
    document.getElementById("vid1").play();

  },[])
  const paste = cate==="men"?require("../Media/men_display1.mp4"):require("../Media/display_2.mp4");

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
         
          <video id="vid1"  autoPlay playsInline loop muted>
            <source type="video/mp4" src={paste} />
            your brower doesnt support html video
          </video>
        </div>
        <div
          className="navhome_open"
        >
          <div className="landing-write">
            <motion.h1 initial={{opacity:0}} animate={{opacity:1,y:"-100%"}} transition={{duration:0.5,type:"tween",ease: [0.1, 0.17, 0.67, 0.7]}} id = "header" className="shopsold_heading">
              SHOP<span>SOLD</span>
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <Categories />
      <WhatYouMightLike />
    </main>
  );
};

export default ShopHome;
