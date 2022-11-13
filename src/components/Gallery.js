import Filter from "./Filter";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Product from "./Product";
import ProductDisplayOption from "./ProductDisplayOption";
import { Link, useParams } from "react-router-dom";
import { BsChevronCompactUp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch} from "react-redux";
import { galleryAction, getGalleryProducts } from "../store";

const Gallery = () => {
  const sortList = ["name a-z","name z-a","price low to high","price high to low","most popular"];

  // const [isLoading, setisLoading] = useState(true);
  // const [errormsg , setErrormsg] = useState(null);
  const [idd, setid] = useState("");
  const { cate, type } = useParams();
  const [sort, setSort] = useState(false);

 const products = useSelector((state)=>{return state.gallery.filteredProducts});
 const sortName = useSelector((state)=>{return state.gallery.sort});
 const {isSortOpen,isFilterOpen} = useSelector((state)=>{return state.gallery});
 const {errormsg,loading} = useSelector((state)=>{return state.gallery});
 const favourite = useSelector((state)=>state.productCate.savedProducts)
 const dispatch = useDispatch();

 useEffect(()=>{
  localStorage.setItem("wishlist",JSON.stringify(favourite))
},[favourite])

  useEffect(() => {

    dispatch(getGalleryProducts({cate,type}));
    // eslint-disable-next-line
  }, []);



  const { videoUrl, values, name } = products;
  console.log(products);

  console.log(loading)

   const sorted = (e)=>{
    dispatch(galleryAction.updateSort(e.target.textContent))
  }


  useEffect(()=>{

    dispatch(galleryAction.sortProduct());
// eslint-disable-next-line
  },[sortName])
  
  useEffect(()=>{
    dispatch(galleryAction.clearFilter())
   
    // eslint-disable-next-line
   },[])
  
   
     if(errormsg){
      console.log('error')
       return (
         <div className="app_loading">
           <div className="load_head">
            <img src={require("../Utilities/server_error.png")} />
           </div>
           <div className="load_footer">
             <p className={`p_error ${errormsg?"entry":""}`}>{errormsg}</p>
           </div>
         </div>
       )
     }

  if (loading) {
    console.log('loading')

    return (
      <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
        <div className="ldio-4axryukh3c">
          <div></div>
        </div>
      </div>
    );
  }

  if(!products  ){
    console.log('prod')

    return <h1>sorry list is empty</h1>
  }
  console.log('open')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.7 }}
    >
      <div className="video-house">
        <div className="video">
          <video id="vid" autoPlay playsinline loop muted>
            {" "}
            <source type="video/mp4" src={videoUrl} />
            your brower doesnt support html video
          </video>
        </div>
        <div className="category-name">
          <h2>
          {cate}: <span>{name}</span>
          </h2>
          <p>
            Something random to fill space ,I really hope you guys are enjoying your experience with the site.
            Quick one, do you think time would matter if you couldn't die?
          </p>
        </div>
      </div>
      <div className={isSortOpen ? "sort_length" : "sort"}>
        <div className="sorted">
          <button>Sort</button>
          <div
            onClick={() => {
              dispatch(galleryAction.openSort())
            }}
            className="arrow"
          >
            <BsChevronCompactUp />
          </div>
        </div>
        <ul>
          {sortList.map((item,index)=>{
            return <li key={index} onClick={sorted} className={item===sortName?"active":null} >{item}</li>
          })}
        </ul>
        <div  className="sorted visible">
          <button onClick={() => {
              document.getElementById("filter").classList.toggle("move_up")
            }}>Filter</button>
         
         <Filter display="grid"/>
        </div>
      </div>
      <section className="gallery">
        <Filter  />

        <div className="products">
          {values.map((items,index) => {
            const { id, products, url, price,images,stock,type,color,ratings } = items;
            const prop = { id, products, url, price,images,stock,type,color,ratings };
            return (
              <Product
                key={id}
                cate={cate}
                {...prop}
                // name={products}
                // id={id}
                // price={price}
                // url={url}
                // values={values}
                // i={index}
              />
            );
          })}
          
        </div>
      </section>
    </motion.div>
  );
};

export default Gallery;
