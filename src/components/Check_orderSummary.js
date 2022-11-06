import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";
import { cartAction } from "../store";

export const Check_orderSummary = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartAction.total());
  }, []);

  return (
    <Wrapper>
      <h2>order summary</h2>
      <ul>
        {cart.map((item) => {
          const { name, img, price, quantity, size, color, id } = item;
          return (
            <li key={id}>
              <div className="img">
                <img src={img} alt="" />
                <h2 className="">{priceToLocaleCurrrency(price)}</h2>
              </div>
              <div className="order_prop">
                <h4>{name}</h4>
                <div>
                  <div className="prop">
                    <div className="color" style={{ background: color }}></div>
                    <p className=""> {size}</p>
                    <p className="">Qty: {quantity}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <footer>
        <div className="footer_split">
          <p>subtotal</p>
          <p>{priceToLocaleCurrrency(totalPrice)}</p>
        </div>
        <div className="footer_split">
          <p>delivery</p>
          <p>N0.00</p>
        </div>
        <div className="footer_split">
          <h2>order total</h2>
          <h2>{priceToLocaleCurrrency(totalPrice)}</h2>
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 30rem;
  
  padding: 1rem;
  display: grid;
  gap: 1rem;

  h2 {
    text-transform: uppercase;
    color:#272727;

  }

  ul {
    height: 10rem;
    overflow: auto;
    display:grid
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      display: flex;
      gap: 1rem;
        margin-bottom:0.5rem;
      

      .img {
        img {
          height: 7.5vw;
          min-height: 70px;
          width: 13.89vw;
          object-fit: cover;
          width: 100%;
          width: 10.89vw;
          min-width: 100px;
        }
        h2 {
          font-size: 14px;
          color: #272727;
          color:grey;
          text-align: start;
        }
      }

      .order_prop{
        text-transform:capitalize;
        padding:1rem 0;
        color:#272727;
        color:grey;

        .prop{
            display:flex;
            margin-top:2rem;
            gap:1rem;

            .color{
                width:20px;
                height:20px;
                
            }
            
        }
      }
    }
  }

  footer {
    .footer_split {
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;

      p {
        text-transform: uppercase;
        font-weight:600;
        color:grey;
      }
      h2{
        font-size:20px;
      }
    }
  }
`;
