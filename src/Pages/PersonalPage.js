import axios from "axios";
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import IndividualProductComponent from "../components/IndividualProductComponent";
import RecentlyVisited from "../components/RecentlyVisited";
import { useMatch, useParams } from "react-router-dom";
import WhatYouMightLike from "../components/WhatYouMightLike";
import { CartModal } from "../Utilities/CartModal";

const PersonalPage = () => {

  const { cate, id } = useParams();


  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setisLoading(false);
      try {
        const product = await axios.get(`/api/products?id=${id}&cate=${cate}`);
        const { data } = product;
        console.log(cate);
        setProducts(data);
        setisLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [visited, setVisited] = useState(false);
  


  if (!isLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <>
      <section className="wrapper"
      >
        <IndividualProductComponent products={products} cate={cate} id={id} />
        {/* <WhatYouMightLike  /> */}
        {<RecentlyVisited />}
        <CartModal/>
      </section>
    </>
  );
};

export default PersonalPage;
