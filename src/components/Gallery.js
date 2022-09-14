import Filter from "./Filter";
import axios from "axios";
import { useState, useEffect } from "react";
import Product from "./Product";
import ProductDisplayOption from "./ProductDisplayOption";
import { Link, useParams } from "react-router-dom";
import { BsChevronCompactUp } from "react-icons/bs";
import { motion } from "framer-motion";

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [idd, setid] = useState("");
  const { cate, type } = useParams();
  const [sort, setSort] = useState(false);
  console.log(type, cate);

  const sett = (id, name) => {
    return setid({ id, name });
  };

  const { videoUrl, values, name } = products;
  console.log(videoUrl);

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(false);
      try {
        const product = await axios.get(`/api/products?cate=${cate}`);
        const { data } = product;
        console.log(data);
        const filtered = data.filter((items) => {
          const { name } = items;
          if (type === "beach") {
            return name === type + "?please";
          }
          return name === type;
        });
        console.log(filtered);
        setProducts(...filtered);
        setisLoading(true);
        document.getElementById("vid").play();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!isLoading) {
    return (
      <div className="loadingio-spinner-eclipse-54l7pcgkx2x">
        <div className="ldio-4axryukh3c">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.7 }}
    >
      <div className="video-house">
        <div className="video">
          <video id="vid" autoplay muted loop>
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
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt a
            facilis voluptatibus eaque id sit error cum ea saepe distinctio
            consec */}

            Something random to fill space ,I really hope you guys are enjoying your experience with the site.
            Quick one, do you think time would matter if you couldn't die?
          </p>
        </div>
      </div>
      <div className={sort ? "sort_length" : "sort"}>
        <div className="sorted">
          <h3>Sort</h3>
          <div
            onClick={() => {
              setSort(!sort);
            }}
            className="arrow"
          >
            <BsChevronCompactUp />
          </div>
        </div>
        <ul>
          <li>best matches</li>
          <li>price low to high</li>
          <li>price high to low</li>
          <li>most popular</li>
          <li>top sellers</li>
        </ul>
        <div className="sorted visible">
          <h3>Filter</h3>
          <div className="arrow">
            <BsChevronCompactUp />
          </div>
        </div>
      </div>
      <section className="gallery">
        <Filter />

        <div className="products">
          {values.map((items) => {
            const { id, products, url, price } = items;
            return (
              <Product
                key={id}
                id={id}
                price={price}
                sett={sett}
                url={url}
                name={products}
                values={values}
                cate={cate}
              />
            );
          })}

          {/* could be a Component */}
          {/* {idd && (
            <ProductDisplayOption
              idd={idd}
              cate={cate}
              product={values}
              us={"uo"}
            />
          )} */}
        </div>
      </section>
    </motion.div>
  );
};

export default Gallery;
