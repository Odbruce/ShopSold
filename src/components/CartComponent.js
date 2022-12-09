import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../store";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";

const CartComponent = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  const clearCart = () => {
    return dispatch(cartAction.clearCart());
  };

  const deleteitem = (a) => {
    dispatch(cartAction.deleteCartItem(a));
  };

  return (
    <Wrapper>
      {cart.map((item) => {
        const { price, image, name, cate, size, quantity, color, id } = item;
        let productId = id.replace(color, "").replace(size, "");
        return (
          <li key={id}>
            <RiDeleteBin5Line
              onClick={() => {
                deleteitem(id);
              }}
              className="cart_delete"
            />
            <div className="img">
              <img src={image} alt="" />
              <h2 className="center h2">
                {priceToLocaleCurrrency(price * quantity)}
              </h2>
            </div>
            <div className="desc">
              <Link
                to={`/productpersonal/${cate}/${productId}`}
                className="link"
              >
                {" "}
                <h4>{name}</h4>
              </Link>
              <div className="proplist">
                <div className="order_color">
                  <p>color :</p> <div style={{ background: color }}></div>
                </div>
                <p className="center">Size : {size}</p>
                <p className="center">Qty : {quantity}</p>
              </div>
            </div>
          </li>
        );
      })}

      <div className="cart_footer">
        <button onClick={clearCart}>clear</button>
        <div className="sub_total">
          <h4>sub-total</h4>
          <p>{priceToLocaleCurrrency(totalPrice)}</p>
        </div>
      </div>

      <div className="shipping">
        <FiTruck className="truck" />
        <div className="words">
          <h3>FREE STANDARD DELIVERY</h3>
          {cart.length >= 5 ? null : (
            <p>
              {5 - cart.length} more product{5 - cart.length > 1 ? "s" : ""} and
              you get a free delivery
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default CartComponent;

const Wrapper = styled.section`
  width: 100%;
  min-width: 300px;

  li {
    position: relative;
    background: var(--bg_pri);
    cursor: inherit;
    display: flex;
    margin-bottom: 2vw;

    .cart_delete {
      position: absolute;
      cursor: pointer;
      top: 5%;
      font-size: clamp(16px, calc(1.11vw + 4px), 20px);
      color: #453f39;
      right: 3%;
    }

    .img {
      width: min(18.89vw, 100px);

      img {
        height: min(12.5vw, 100px);
        object-fit: cover;
        width: 100%;
        margin-bottom: 0.3em;
      }

      h2 {
        font-size: clamp(14px, calc(1.11vw + 4px), 20px);
        text-align: start;
        padding-left: 0.2em;
        margin-bottom: 0.3em;
      }
    }
    .desc {
      font-family: Arial, sans-serif;
      font-size: clamp(12px, calc(9.6px + 0.667vw), 0.812rem);
      font-weight: 400;
      display: flex;
      min-width: 100px;
      width: 100%;
      max-width: 400px;
      flex-direction: column;
      padding: 2vw;

      .link {
        color: #30281e;
        text-decoration: none;
        font-weight: 400;
        text-transform: capitalize;
        padding-left: 0.5vw;
        font-size: clamp(14px, calc(1.338vw + 2px), 20px);
      }

      .proplist {
        display: flex;
        margin-top: 2em;
        color: #767879;
        align-items: center;
        width: 100%;
        min-width: 200px;

        p {
          padding: 0 0.5vw;
          font-size: clamp(12px, calc(7px + 0.8vw), 16px);
        }

        .order_color {
          text-transform: capitalize;
          display: flex;
          align-items: center;

          div {
            display: inline-block;
            width: max(10px, 0.9vw);
            padding: 0.2vw;
            height: max(10px, 0.9vw);
          }
        }
      }
    }
  }
  .cart_footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2vw 3%;
    text-transform: uppercase;
    box-sizing: border-box;
    gap: max(2vw, 1rem);
    font-size: clamp(14px, calc(7px + 0.8vw), 16px);
    font-weight: 500;
    margin-bottom: 2vw;
    background: var(--bg_pri);

    .sub_total {
      display: flex;
      gap: 1em;
    }
    button {
      border: none;
      background: transparent;
      font-size: 16px;
      font-size: clamp(9px, calc(10px + 0.5vw), 16px);

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .shipping {
    background: var(--bg_pri);
    display: flex;
    padding: 2vw;
    align-items: center;
    gap: 3vw;

    .words p {
      font-size: clamp(12px, calc(7px + 0.8vw), 16px);
    }
    .word h3 {
      font-size: clamp(15px, calc(7px + 1vw), 18px);
    }
    .truck {
      font-size: clamp(20px, calc(9px + 2vw), 32px);
    }
  }
`;
