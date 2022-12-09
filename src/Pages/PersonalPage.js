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
  const [product, setProduct] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [errormsg , setErrormsg] = useState(null);
  // const product = useSelector((state)=>state.product.product)
  // const loading = useSelector((state)=>state.product.loading)
  // const errormsg = useSelector((state)=>state.product.errormsg)


  // console.log(loading,product);
  // const dispatch = useDispatch();

  //recently added
  
  console.log(id,"personal id")
  
  useEffect(async() => {
    setisLoading(true)
    try {
      const product = await axios.get(`/api/products?id=${id}&cate=${cate}`);
      const { data } = product;
      setProduct(data);
      return setisLoading(false);
    } catch (error) {

      let loaderror;
      if(error.response.data.toLowerCase().includes("timeout")){
          loaderror={msg:"TimeOut Error, please check your connection",
                      img:require("../Media/server_error.png")}
        }
        else if(error.response.data.toLowerCase().includes("server error")){
          loaderror={msg:error.response.data,
                      img:require("../Media/server_error.png")}
        }
        else{ loaderror={msg:error.response.data,
                        img:require("../Media/page_not_found.png")}
        }
      
          setErrormsg(loaderror);
          setisLoading(false);
     return;
    }
    
    // dispatch(getProduct({id,cate}))
  }, []);
  // console.log(loading,product,"after ");
  
   
  
  const display = {
    initial:{opacity:0},
    animate:{opacity:1,
     transition:{
       duration:0.7,
       type:"tween"
     }}    
   }


  if (isLoading) {
    return (
      <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
        <div className="ldio-4axryukh3c">
          <div></div>
        </div>
      </div>
    );
  }
else if(errormsg){
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
else{ return (  
    <>
      <motion.section variants={display} initial="initial" animate="animate" className="wrapper" 
      >
        <IndividualProductComponent  {...product} cate={cate} id={id} />
        <WhatYouMightLike  />
        <RecentlyVisited id={id} />
        <CartModal   />
      </motion.section>
    </>
  )};
};

export default PersonalPage;
