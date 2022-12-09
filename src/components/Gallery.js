import Filter from "./Filter";
import { useEffect } from "react";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { BsChevronCompactUp } from "react-icons/bs";
import {  motion } from "framer-motion";
import { useSelector, useDispatch} from "react-redux";
import { galleryAction} from "../store";
import { getGalleryProducts} from "../store/GalleryStore";
import styled from "styled-components";


const Gallery = () => {
  const sortList = ["name a-z",
                    "name z-a",
                    "price low to high",
                    "price high to low",
                    "most popular"];
  const { cate, type } = useParams();

 const products = useSelector((state)=>{return state.gallery.filteredProducts});
 const sortName = useSelector((state)=>{return state.gallery.sort});
 const isSortOpen = useSelector((state)=>{return state.gallery.isSortOpen});
 const loading = useSelector((state)=>{return state.gallery.loading});
 const errormsg = useSelector((state)=>{return state.gallery.errormsg});
 const dispatch = useDispatch();


  useEffect(() => {
  dispatch(getGalleryProducts({cate,type}));

    // eslint-disable-next-line
  }, []);



  const { videoUrl, values, name } = products;

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
       return (
         <div className="app_loading">
           <div className="load_head">
            <img src={require("../Media/server_error.png")} alt="error"/>
           </div>
           <div className="load_footer">
             <p className={`p_error ${errormsg?"entry":""}`}>{errormsg}</p>
           </div>
         </div>
       )
     }

  else if (loading) {

    return (
      <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
        <div className="ldio-4axryukh3c">
          <div></div>
        </div>
      </div>
    );
  }
  else{ return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.7 }}
    >
      <div className="video_house">
        <div className="video">
          <video id="vid" autoPlay playsInline loop muted>
            {" "}
            <source type="video/mp4" src={videoUrl} />
            your brower doesnt support html video
          </video>
        </div>
        <div className="category_name">
          <h2>
          {cate}: <span>{name}</span>
          </h2>
          <p>
            Something random to fill space ,I really hope you guys are enjoying your experience with the site.
            Do you think time would matter if you couldn't die?
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
            }}>Filter
          </button>
         <Filter display="grid"/>
        </div>
      </div>
      <section className="gallery">
        <Filter  />

        <div className="products">
          {values.map((items) => {
            const { id, products, url, price,images,stock,type,color,ratings } = items;
            const prop = { id, products, url, price,images,stock,type,color,ratings };
            return (
              <Product
                key={id}
                cate={cate}
                {...prop}
              />
            );
          })}
          
        </div>
      </section>
    </Wrapper>
  )
};
};

export default Gallery;


const Wrapper = styled(motion.div)`

.video_house {
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  margin:1em 1vw;
  gap:1vw;
  text-align: left;

  .video video{
    width:min(100vw,650px);
    background:#353B43;
  }
 
  .category_name{
    margin:1vw;
    width:min(500px,95vw);
    
    p{
      font-size:clamp(12px,calc(7px + 0.8vw),16px);
    }
    h2{
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size:clamp(16px,calc(9px + 2vw),32px);
      color: #353b43;

      span{
        color:var(--bg_org);
      }
    }
  }
}



.sort_length,
.sort{
  padding:0 4.5vw;
  margin:1vw 0 2vw;
  display:flex;
  justify-content: space-between;
  position: relative;
  color:#353B43;
  font-size:clamp(12px,calc(8px + 2vw),24px);  

  .sorted{
    position: relative;
    background:white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:clamp(5rem,calc(6.5rem + 3vw),10rem);
    padding:0 0.3em;
    border:solid 1px #353B43;

    h3{
      font-family:  'Segoe UI', "Roboto";
      color: #353b43;
    }

    .arrow{
      cursor:pointer;
      border: none;
      font-size: clamp(9px,calc(10px + 0.5vw),16px);
      display: grid;
      transition: all 0.4s ease-in-out;
    }
  }

  ul{
    display:flex;
    position:absolute;
    bottom:0;
    flex-direction: column;
    transition: 0.5s ease-in-out;
    transition-property:height opacity;
    overflow:hidden;
    border-top:1px solid #353B43;
    width:clamp(4rem,calc(5.6rem + 2vw),10rem);
    height:0;
    opacity:0;
    z-index:1;

    li{
      border:1px solid #353B43; 
      box-sizing:border-box;
      text-transform: capitalize;
      padding:.1rem .5rem;
      background:white;
      border-top: 0;                        
      font-size: clamp(9px,calc(7px + 0.4vw),0.8rem);
      line-height:2rem;
      height: 2rem;
    }
  }
  .visible{
    visibility:hidden;
    cursor: pointer;
  }
  button{
    border: none;
    background:none;
    width:100%;
    text-align:start;
    font-size:clamp(12px,calc(8px + 2vw),24px);  
    color: #353b43;
    font-weight: 600;
    font-family:  'Segoe UI', "Roboto";
  
  }

}
.sort_length{

  ul{
    height:10.1rem;
    opacity:1;

    .active{
      transition: all 0.4s ease;
      background:#2a2828;
      color:white;
    }

    li:hover{
      background:#2a2828;
      color:white;
      transition: all 0.4s ease;
    }
  }

 .sorted .arrow{
  transform: rotate(180deg);
  }
}


.gallery{
  display:grid;
  grid-template-columns: minmax(250px,25%) 1fr; 
  padding:0 4.5vw;
}

.products {
  height:auto;
  width:auto;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(250px ,1fr));
  justify-items: center;
  gap:.5em;
}

.products .prod_link{
  text-decoration: none;
}

@media (max-width:912px){
  .gallery{
    grid-template-columns:1fr;
    padding:0 0.3rem
  }
    .sort .visible, 
    .sort_length .visible {
      visibility:visible;

    .move_up,
    .filterr{
      top:100%;
      pointer-events: none;
      opacity: 0;
    }
    .move_up{
      pointer-events: auto;
      opacity:1;
    }
  }
  .products{grid-template-columns: repeat(2, minmax(150px , 1fr));}
}


`