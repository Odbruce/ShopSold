import { motion } from "framer-motion";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {cover_page2,cover_page3,cover_page4} from "../Media"
import {useFireContext} from "../components/FirebaseContext"




const Nav = () => {
  const {User} = useFireContext();

  const background=[cover_page2,cover_page3,cover_page4];
  const [imgIndex, setimgIndex] = useState(2);


  useEffect(() => {
    const add = setInterval(() => {
      
      if (imgIndex === background.length-1) {
        return setimgIndex(0);
      }
      return setimgIndex((prev)=>{return prev + 1});
    }, 6000);

    return () => {
      clearInterval(add);
    };
  }, [imgIndex]);

  const main = {
    animate: {
      top: 0,

      transition: {
        type: "tween",
        stiffness: 100,
        staggerChildren: 0.4,
        when: "beforeChildren",
      },
    },
    exit:{ y: 0, top: "initial", transition: { duration: 1 } }
  };
  const btn = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: [0.6, 0.15, 0.59, 0.9],
        duration: 0.8,
      },
    },
  };


  const underline = {
    initial:{ scaleX: 0 },
    animate:{ 
      scaleX: 1 ,
      transition:{
        delay: 1.2,
        duration: 0.5,
        type: "tween",
        ease: [0.1, 0.17, 0.67, 0.7],
      }
    },
  }

  const signIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.4,
        type: "tween",
        ease: [0.1, 0.17, 0.67, 0.7],
      },
    },
  };
  return (
    <section className="nav_home">

    <motion.div
      variants={main}
      initial="initial"
      animate="animate"
      exit="exit"
      className = "nav_container"
    >
    

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          width: `${(window.innerWidth * 55.5) / 100}px`,
          height: "350px",
          opacity: 0.9,
          transition: { duration: 1 },
        }}
        className="nav_open"
      >
         {background.map((item,index)=>{
      
      return(
       <img
        key={index}
        className={`${imgIndex === index?"cover_img":"null cover_img"}`}
        src={item}
        alt=""
        />)

     }) 
      }
        <motion.div
          variants={signIn}
          className="nav-bar "
        >
         <Link  to="/identity/signin"> <motion.button  exit={{
                opacity: 0,
                transition: {
                duration: 0.5,
                type: "tween",
                ease: [0.1, 0.17, 0.67, 0.7],
              },
            }}className="btn cursor">{!User?"Sign-in":null}</motion.button></Link>
          <motion.div
           variants={underline}
            exit={{
              scaleX: 0,
              transition: {
              duration: 0.5,
              type: "tween",
              ease: [0.1, 0.17, 0.67, 0.7],
              },
            }}
            className="div_bar"
          ></motion.div>
        </motion.div>
        <motion.div className="landing-write">
          <motion.h1  exit={{
                        opacity:0,
                        transition:{
                          duration:0.5,
                          ease: [0.1, 0.17, 0.67, 0.7],
                          type:"tween"
                        }
                      }} className="shopsold_heading">
            SHOP<span>SOLD</span>
          </motion.h1>
          <div className="btn-group">
            <Link className=" btn-gender cursor" to="shop/men">
              <motion.button
                variants={btn}
                exit={{
                  y: 20,
                  opacity: 0,
                  transition: {
                    type: "spring",
                  },
                }}
                className="button"
              
              >
                SHOP MEN
                <div></div>
              </motion.button>
            </Link>

            <Link className=" btn-gender cursor" to="shop/women">
              <motion.button
                variants={btn}
                exit={{
                  y: 20,
                  opacity: 0,
                  transition: {
                    type: "spring",
                  },
                }}
                className="button"
              >
                <div></div> SHOP WOMEN
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
    </section>
  );
};
export default Nav;
