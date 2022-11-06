import react from "react";
import { useState, useEffect } from "react";
import CartComponent from "../components/CartComponent";
import Order from "../components/Order";
// import Scroll from "../components/Scroll";
import WhatYouMightLike from "../components/WhatYouMightLike";
import { useSelector } from "react-redux";
import { Advertise } from "../Utilities/styled";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";

const Cart = () => {
  const [displayOpt, setdisplayOpt] = useState({
    display: false,
    prevScrollY: 0,
  });
  const { display, prevScrollY } = displayOpt;

  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalProducts = useSelector((state) => state.cart.totalProducts);

  let prevY = window.scrollY;
  const nav_cont = document.getElementById("nav_id");

  const scrollLog = () => {
    if (window.scrollY > prevY) {
      nav_cont.style.top = "-72px";
      console.log(prevY, window.scrollY);
      // let scroll = window.pageYOffset;

      //  setdisplayOpt({ display: true, prevScrollY: scroll })
    } else {
      console.log(prevY, window.scrollY);

      // let scroll = window.pageYOffset;
      // const nav_cont = document.getElementById("nav_id");
      nav_cont.style.top = "0";
      // setdisplayOpt({ display: false, prevScrollY: scroll });
    }

    prevY = window.scrollY;
  };
  window.onscroll = scrollLog;
  return (
    <>
      <main>
        <section className="section">
          <div className="head">
            <h2>Your Picks</h2>
            <div className="head-desc">
              <p id="border">
                {totalProducts} item{totalProducts > 1 ? "s" : ""}
              </p>
              <p>{priceToLocaleCurrrency(totalPrice)}</p>
            </div>
          </div>

          <section className="cart">
            {totalProducts === 0 ? (
              <div className="empty_wrapper">
                <p>you currently have no item in your bag</p>
                <img src={require("../Utilities/empty_cart.png")} alt="" />
              </div>
            ) : (
              <div className="cart_wrapper">
                <CartComponent />
                <Order />
              </div>
            )}
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
                special offers. To improve your experience we may; profile,
                segment, test, analyse and model your details. You can
                unsubscribe at any time via the link in your emails. Please
                refer to our Privacy Policy for further details.
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
