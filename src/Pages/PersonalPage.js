import axios from "axios";
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import IndividualProductComponent from "../components/IndividualProductComponent";
import RecentlyVisited from "../components/RecentlyVisited";
import { useMatch, useParams } from "react-router-dom";
import WhatYouMightLike from "../components/WhatYouMightLike";
import { CartModal } from "../Utilities/CartModal";
import { getProduct, productAction } from "../store";
import { useSelector,useDispatch } from "react-redux";

const PersonalPage = () => {

  const { cate, id } = useParams();
  // const [products, setProducts] = useState([]);
  // const [isLoading, setisLoading] = useState(true);
  // const [errormsg , setErrormsg] = useState(null);
  const {errormsg,loading,product} = useSelector((state)=>state.product)

  const dispatch = useDispatch();

  //recently added
  
  console.log(id,"personal id")
  
  useEffect(() => {
   
   
    dispatch(getProduct({id,cate}))
  }, []);
  


  if (loading) {
    return (
      <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
        <div className="ldio-4axryukh3c">
          <div></div>
        </div>
      </div>
    );
  }

  if(errormsg){
    return (
      <div className="app_loading">
        <div className="load_head">
          <img src={errormsg.img} />
        </div>
        <div className="load_footer">
          <p className={`p_error ${errormsg.msg?"entry":""}`}>{errormsg.msg}</p>
        </div>
      </div>
    )
  }

  

  const display = {
   initial:{opacity:0},
   animate:{opacity:1,
    transition:{
      duration:0.7,
      type:"tween"
    }}
    
  }
console.log(product,"personal")
  return (
    <>
      <motion.section variants={display} initial="initial" animate="animate" className="wrapper" 
      >
        <IndividualProductComponent  {...product} cate={cate} id={id} />
        <WhatYouMightLike  />
        <RecentlyVisited id={id} />
        <CartModal   />
      </motion.section>
    </>
  );
};

export default PersonalPage;
