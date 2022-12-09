import CartComponent from "../components/CartComponent";
import Order from "../components/Order";
import WhatYouMightLike from "../components/WhatYouMightLike";
import { useSelector } from "react-redux";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";
import AdvertNewsLetter from "../components/AdvertNewsLetter";
import styled from "styled-components";

const Cart = () => {

  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalProducts = useSelector((state) => state.cart.totalProducts);

  let prevY = window.scrollY;
  const nav_cont = document.getElementById("nav_id");

  const scrollLog = () => {
console.log(window.scrollY>=72);
    window.scrollY>=72?document.getElementById("shadow").classList.add("shadow"):document.getElementById("shadow").classList.remove("shadow");
    if (window.scrollY > prevY) {
      nav_cont.style.top = "-72px";
     
    } else {
      nav_cont.style.top = "0";
    }

    prevY = window.scrollY;
  };
  window.onscroll = scrollLog;

  return (
    <>
      <main>
        <Wrapper  className="section">
          <div id="shadow" className="head">
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
                <img src={require("../Media/empty_cart.png")} alt="" />
              </div>
            ) : (
              <div className="cart_wrapper">
                <CartComponent />
                <Order />
              </div>
            )}
          </section>

          <WhatYouMightLike />
          <AdvertNewsLetter/>
        </Wrapper>
      </main>
    </>
  );
};


export default Cart;



const Wrapper = styled.section`


.head{
  min-width:200px;
  position:sticky;
  top:0;
  background:whitesmoke;
  z-index:2;
  display:flex;
  justify-content: flex-start;
  gap:2rem;
  padding:0.6em 10%;
  transition:0.8s;
  
  @media(max-width:480px){
    padding:0.6em 0.5em;
  }

  h2{
    font-family: "Segoe UI", Roboto;
    color:#30281e;
    font-size:clamp(16px,calc(10px + 2vw),30px);
  
  }

   .head-desc{
    display:inherit;
    align-items: flex-end;
    
    #border{
      border-right:solid 1px;
    }
    
    p{
      height:fit-content;
      padding:0 .8em ;
      font-size:clamp(14px,calc(12px + 1vw),20px);
      color:#30281e;
    }
  }
}
 .shadow{
   box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
 }

 .cart{
  position:relative;
  background:var(--bg_pri);
  box-sizing:border-box;
  padding:1vw;

  .cart_wrapper{
    padding:2vw;
    justify-items: center;
    justify-content: center;
    margin:0 auto;
    display:grid;
    background:whitesmoke;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap:5vw;
  }

  .empty_wrapper{
    display: grid;
    place-items:center;
    padding:2vw;
    margin:0 auto;
    background:whitesmoke;
    gap:2vw;

    p{
      font-size:clamp(12px,calc(7px + 0.6vw),16px);
      color:grey;
    }

    img{
      width:min(50%,400px);
      object-fit: contain;
      aspect-ratio: 1/1;
    }

  }
}

 `