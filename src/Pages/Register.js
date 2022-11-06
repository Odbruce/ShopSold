import React from "react";
import styled from "styled-components";

const Register = () => {
  const submit = () => {};
  return (
    <Wrapper>
      <div className="navigate">
        <div className="active">
          <button type="button">Register </button>
        </div>
        <div>
          <button type="button">Sign-in</button>
        </div>
      </div>

      <div className="socials">
        <button>google</button>
        <button>apple</button>
        <button>twitter</button>
      </div>

      <p>
        Signing up with social is super quick. No extra passwords to remember -
        no brain fail. Don't worry, we'd never share any of your data or post
        anything on your behalf
      </p>
      <h4>OR SIGN UP WITH EMAIL</h4>

      <form action="" onSubmit={submit}>
        <div className="name">
          <div className="lab">
            <label htmlFor="firstname">firstname</label>
            <input type="text" name="firstname" id="" />
          </div>
          <div className="lab">
            <label className="last" htmlFor="lastname">
              lastname
            </label>
            <input type="text" name="lastname" id="" />
          </div>
        </div>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="" />
        <button className="join" type="button">
          join
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  width: min(100vw, 650px);
  padding: max(2vw, 40px);
  height: fit-content;
  background: grey;
  box-sizing: border-box;
  position: relative;
  top: 5rem;

  .socials {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    button {
      border: 1px solid black;
      text-transform: uppercase;
      background: transparent;
      height: 3rem;
      width: 8.5rem;
    }
  }
  p {
    font-size: 14px;
    margin-bottom: 1rem;
  }
  h4 {
    text-align: center;
    position: relative;
    margin: 0 auto;
    width: 35%;

    &:before,
    &:after {
      content: "";
      width: 100%;
      height: 1px;
      background: whitesmoke;
      top: 50%;
      position: absolute;
      transform: rotate(180deg);
    }
    &:before {
      right: 100%;
    }
  }

  .navigate {
    height: 50px;
    display: flex;
    margin-bottom: 1rem;
    div {
      width: 50%;
      display: grid;
      place-items: center;
      position: relative;
      border-bottom: 1px solid transparent;

      button {
        border: none;
        background: transparent;
        font-size: 16px;
      }

      &:nth-of-type(1)::after {
        content: "";
        position: absolute;
        background: pink;
        width: 1px;
        right: 0;
        height: 30px;
      }
    }
    .active {
      border-bottom: 1px solid pink;
    }
  }

  form {
    padding: 1rem;
    label {
      display: block;
      font-size: 14px;
      text-transform: capitalize;
    }
    input {
      width: 100%;
      height: 2.5rem;
      background: whitesmoke;
      border: 1px solid black;
      margin-bottom: 1rem;
    }
    .name {
      display: flex;
      gap: 2px;
      .lab {
        width: 100%;
      }
    }
  }
  .join {
    width: 100%;
    height: 2.5rem;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.5px;
    background: black;
    color: whitesmoke;
  }
`;
