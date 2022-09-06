import CartComponent from "../components/CartComponent";
import Order from "../components/Order";
import {useState,useEffect} from "react";
// import Scroll from "../components/Scroll";
import WhatYouMightLike from "../components/WhatYouMightLike";
import { Advertise } from "../Utilities/styled";
import react from "react";

const Cart = () => {
  const [displayOpt, setdisplayOpt] = useState({
    display: false,
    prevScrollY: 0,
  });
  const { display, prevScrollY } = displayOpt;

  const scrollLog = () => {
    console.log("work....");
    if (window.pageYOffset > prevScrollY) {
      const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top="-72px";
      let scroll = window.pageYOffset;

      return setdisplayOpt({ display: true, prevScrollY: scroll })
      
        
    }
    if (window.pageYOffset < prevScrollY) {
      let scroll = window.pageYOffset;

      const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top="0";
      
      
      return setdisplayOpt({ display: false, prevScrollY: scroll });
    }
  };
  useEffect(() => {
    // document.body.style.overflow = "hidden";
    window.onscroll = scrollLog;
  }, );
  return (
    <>
      <main>
        <section className="section">
          <div className="head">
            <h2>Your Picks</h2>
            <div className="head-desc">
              <p id="border">3 items</p>
              <p>NGN 2400.00</p>
            </div>
          </div>

          <section className="cart">
            <div className="cart_wrapper">
            <CartComponent />
            <Order />

            </div>
          </section>

          <WhatYouMightLike />
          <Advertise>
        <h2>
          New to <span>Shop</span>
          <span>Sold</span> ? Sign up to enjoy 10% off your first order
          (excluding sale styles).
        </h2>
        <form className="newletter">
          <p>
            Sign up to receive exclusive updates on our new collections and
            special offers. To improve your experience we may; profile, segment,
            test, analyse and model your details. You can unsubscribe at any
            time via the link in your emails. Please refer to our Privacy Policy
            for further details.
          </p>
          <input placeholder="newsletter" type="text" name="" id="" />
        </form>
      </Advertise>
        </section>
      </main>
    </>
  );
};

// const Cart =()=>{
//     return <h2>hello there</h2>
// }

export default Cart;







