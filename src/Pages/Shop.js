import "../Shop.css";
import Nav from "../components/Nav";
import Categories from "../components/Categories";
// import Modal from "./components/Modal";
// import Hero from "./components/Hero";
import { useState } from "react";
import WhatYouMightLike from "../components/WhatYouMightLike";

function Shop() {
  const [value, setValue] = useState(true);
  const cate = () => {
    return setValue(!value);
  };
  return (
    <section className="nav_home">
        <Nav cate={cate} />
    </section>
  );
}

export default Shop;
