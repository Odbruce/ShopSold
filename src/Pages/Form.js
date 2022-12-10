import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useFireContext } from "../components/FirebaseContext";

const Form = () => {
  const { formType } = useParams();
  const { login, signUp, googleSignIn} = useFireContext();

  const submit = (e) => {
    e.preventDefault();
    if (formType === "register") {
      return signUp(email, pswrd);
    }
    if (formType === "signin") {
    return login(email, pswrd);
    }
  };

  const [inputs, setInputs] = useState({
    f_name: "",
    l_name: "",
    email: "",
    pswrd: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    return setInputs({ ...inputs, [name]: value });
  };

  const { f_name, l_name, email, pswrd } = inputs;

  return (
    <Wrapper>
      <div className="socials">
        <button onClick={googleSignIn}>
          <div>
            <FcGoogle className="Fc" />
            <span>sign {formType==="signin"?"IN":"UP"} with google</span>
          </div>
        </button>
      </div>

      <p>
        Signing up with social is super quick. No extra passwords to remember -
        no brain fail. Don't worry, we'd never share any of your data or post
        anything on your behalf
      </p>
      <h4>OR SIGN {formType==="signin"?"IN":"UP"} WITH EMAIL</h4>

      <form action="" onSubmit={submit}>
        {formType === "register" && (
          <div className="name_cont">
            <motion.div
              initial={{ y: "-150%" }}
              animate={{ y: "0%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.6, 0.15, 0.59, 0.9],
              }}
              exit={{ y: "-150%" }}
              className="name"
            >
              <div className="lab wrap_input" >
                <input
                  type="text"
                  value={f_name}
                  onChange={handleInputs}
                  name="f_name"
                  id="firstname"
                  required
                />
                <label htmlFor="firstname">firstname</label>
              </div>
              <div className="lab wrap_input">
                <input
                  type="text"
                  value={l_name}
                  onChange={handleInputs}
                  name="l_name"
                  id="lastname"
                  required
                />
                <label className="last" htmlFor="lastname">
                  lastname
                </label>
              </div>
            </motion.div>
          </div>
        )}
        <motion.div
          initial={{ y: formType === "register" ? "-50%" : "50%" }}
          animate={{ y: "0%" }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.6, 0.15, 0.59, 0.9],
          }}
          className="login_cont"
        >
          <div className="wrap_input">
              <input
                type="email"
                value={email}
                onChange={handleInputs}
                name="email"
                id="email"
                required
              />
            <label htmlFor="email">
              email
              </label>
          </div>
          <div className="wrap_input">
              <input
                type="password"
                value={pswrd}
                onChange={handleInputs}
                name="pswrd"
                id="password"
                minLength={6}
                required
              />
            <label htmlFor="password">
              password
              </label>
          </div>
        </motion.div>
        <button
          className="join"
        >{formType === "register" ? "sign up" : "sign in"}</button>
      </form>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  width: min(100vw, 650px);
  padding: max(2vw, 30px);
  height: fit-content;
  background: grey;
  background: #a8a98e;
  box-sizing: border-box;
  position: relative;

  .socials {
    display: flex;
    justify-content:center;
    padding: 0.5rem;
    margin-bottom: 1rem;

    button {
      cursor: pointer;
      border: 2px solid #565656;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.7px;
      background: whitesmoke;
      height: max(3.33vw,30px);
      font-family:Segoe UI;
      padding:0 1vw;
      color: #565656;
      font-size:clamp(9px, calc(7px + 0.5vw), 16px);


      div {
        display: flex;
        gap: 0.6rem;
        align-items:center;

        .Fc{
          font-size:clamp(12px,calc(8px + 2vw),24px);  
        }

        .ts {
          color: #1da1f2;
        }
      }

      &:hover {
        transition: 0.5s ease-in all;
        color: var(--font_pri);
        border-color: var(--font_pri);
      }
    }
  }
  p {
    font-size: 14px;
    font-size:clamp(9px, calc(7px + 0.5vw), 16px);

    margin-bottom: 1rem;
  }
  h4 {
    text-align: center;
    position: relative;
    color: var(--font_pri);
    margin: 0 auto;
    width: 35%;
    font-size:clamp(9px, calc(7px + 0.5vw), 16px);

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
      right:100%;
    }
    &:after{
      left:100%;
    }
  }


  form {
    padding: 2rem max(1.1vw,10px) 0rem ;
    display:grid;
    gap:max(1.11vw,10px);

    .wrap_input{
      position:relative;

      label {
        display: block;
        font-size:clamp(9px, calc(7px + 0.5vw), 16px);
        pointer-events: none;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.9px;
        color:grey;
        position: relative;
        margin-left:0.3rem;
        top:-50%;
       transition:0.3s;
      }
      input {
        width: 100%;
        padding: 0.3rem;
        height: max(2.78vw,28px);
        background: whitesmoke;
        letter-spacing: 1px;
        border: 1px solid #565656;
        outline: none;
  
        &:focus {
          box-shadow: inset 0px 0px 1px 1px #9fd4f4;
          border: 2px solid #1da1f2;
          border-radius: 5px;
        }

        &:is(
          :focus,
          :valid
        )~label{
          top:-100%;
          color:var(--font_pri);
        }
       
      }


    }

    .name_cont {
      overflow: hidden;
      padding-top:1rem;
      .name {
        display: flex;
        gap: 2px;

        .lab {
          width: 100%;
        }
        }
      }
    }
    .login_cont {
      display: grid;
      gap: 1rem;
     margin-bottom:1rem;
      }
    }
  }
  .join {
    font-family: Segoe UI;
    width: 100%;
    background: black;
    color: whitesmoke;
    height: 2.5rem;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.5px;
    cursor:pointer;
    border:none;
  }
`;
