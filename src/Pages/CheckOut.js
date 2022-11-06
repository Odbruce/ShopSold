import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Order from "../components/Order";
import { Check_orderSummary } from "../components/Check_orderSummary";
import { PaystackButton } from "react-paystack";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFireContext } from "../components/FirebaseContext";
import { cartAction } from "../store";

const CheckOut = () => {
  const navigate = useNavigate();
  const { totalPrice } = useSelector((state) => state.cart);
  const { User } = useFireContext();

  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   const clear = setTimeout(() => {
  //     navigate("/");
  //   }, 3000);
  //   return () => clearTimeout(clear);
  // }, [success]);

  // if (success === true) {
  //   window.setTimeout(() => {
  //     navigate("/cart", { replace: true });
  //   }, 2000);
  // }

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  const componentProps = {
    email: User,
    amount: totalPrice * 100,
    metadata: {
      name: "john doe",
      phone: +234123457890,
    },
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    text: "Place Order",
    onSuccess: () => {
      dispatch(cartAction.clearCart());
      setSuccess(true);
    },
    onClose: () => {
      alert("Wait! Don't leave :(");
      navigate(-1);
    },
  };

  return (
    <Wrapper>
      <h1>
        shop<span>sold</span>
      </h1>
      <Check_orderSummary />
      <div className="payment">
        <h2 className="h2">Payment</h2>
        <div className="bill_address">
          <h2>Billing address</h2>
          <p>{User}</p>
          <p>plot 111,festac town </p>
          <p>+234 8078989833</p>
          <p>Nigeria</p>
        </div>
        <PaystackButton {...componentProps} />
        <p className="terms">
          By clicking Place Order, you agree to the eShopWorld Terms and
          Conditions.
        </p>
      </div>
    </Wrapper>
  );
};

export default CheckOut;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  gap: 1.2rem;

  .button {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  h1 {
    position: fixed;
    top: 2%;
    // width:100%;
    // text-align:start;
    left: 10%;
    font-size: clamp(16px, calc(2.22vw + 8px), 32px);
    font-weight: 500;
    letter-spacing: 2px;
    color: #db9224;
    span {
      padding: 0 5px;
      background: #a8a98e;
      color: whitesmoke;
    }
  }

  .payment {
    width: 30rem;
    background: #e8ebee;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: max-content;
    // gap: 1rem;
    padding: 1rem;
    text-align: start;
    color: grey;

    h2 {
      color: #272727;
      font-size: 18px;
      text-transform: uppercase;
    }
    .h2 {
      font-size: 24px;
    }

    button {
      width: 100%;
      background: black;
      color: whitesmoke;
      height: 2.5rem;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: bold;
      border: none;
      letter-spacing: 1.5px;
    }
    .terms {
      font-size: 12px;
      text-align: center;
    }
  }
`;
