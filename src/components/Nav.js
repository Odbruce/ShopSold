import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
const Nav = ({ cate }) => {
  const [prop, setProp] = useState(true);
  const match = useMatch("/shop/women");
  useEffect(() => {
    match && setProp(true);
  }, []);
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
    <motion.div
      variants={main}
      initial="initial"
      animate="animate"
      exit={{ y: 0, top: "initial", transition: { duration: 1 } }}
      className={"nav_container"}
    >
      {/* <img
        className="cover_img"
        src={require("../Utilities/cover_page1.jpg")}
        alt=""
      /> */}

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
        <motion.div
          variants={signIn}
          exit={{ opacity: 0 }}
          className="nav-bar "
        >
          <motion.button className="btn cursor">Sign-in</motion.button>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.5,
              type: "tween",
              ease: [0.1, 0.17, 0.67, 0.7],
            }}
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
          <h1 className="shopsold_heading">
            SHOP<span>SOLD</span>
          </h1>
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
                onClick={() => {
                  console.log("click");
                }}
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
                onClick={cate}
              >
                <div></div> SHOP WOMEN
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default Nav;
