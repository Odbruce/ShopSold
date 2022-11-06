import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { BsTwitter } from "react-icons/bs";
import { useFireContext } from "../components/FirebaseContext";

const Form = () => {
  const { formType } = useParams();
  const { login, signUp, googleSignIn, User } = useFireContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, [User]);

  const submit = async (e) => {
    e.preventDefault();
    if (formType === "register") {
      try {
        await signUp(email, pswrd);
      } catch (error) {
        console.log(error.code.replace("auth/", "").replace("-", " "));
      }
      return;
    }
    if (formType === "signin") {
      try {
        await login(email, pswrd);
      } catch (error) {
        console.log(error.code.replace("auth/", "").replace("-", " "));
      }
    }

    console.log("yes");
  };

  console.log(formType);

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
      {/* <div className="navigate">
        <div className="active">
          <button type="button">Register </button>
        </div>
        <div>
          <button type="button">Sign-in</button>
        </div>
      </div> */}

      <div className="socials">
        <button onClick={() => googleSignIn()}>
          <div>
            <FcGoogle />
            <span>google</span>
          </div>
        </button>
        {/* <button>
          <div>
            <RiAppleFill />
            <span>apple</span>
          </div>
        </button> */}
        {/* <button>
          <div>
            <BsTwitter className="ts" />
            <span>twitter</span>
          </div>
        </button> */}
      </div>

      <p>
        Signing up with social is super quick. No extra passwords to remember -
        no brain fail. Don't worry, we'd never share any of your data or post
        anything on your behalf
      </p>
      <h4>OR SIGN UP WITH EMAIL</h4>

      <form action="" onClick={submit}>
        {formType === "register" && (
          <div className="name_cont">
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.6, 0.15, 0.59, 0.9],
              }}
              exit={{ y: "-100%" }}
              className="name"
            >
              <div className="lab">
                <label htmlFor="firstname">firstname:</label>
                <input
                  type="text"
                  value={f_name}
                  onChange={handleInputs}
                  name="f_name"
                  id="firstname"
                />
              </div>
              <div className="lab">
                <label className="last" htmlFor="lastname">
                  lastname:
                </label>
                <input
                  type="text"
                  value={l_name}
                  onChange={handleInputs}
                  name="l_name"
                  id="lastname"
                />
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
            <label htmlFor="email">
              email:
              <input
                type="email"
                value={email}
                onChange={handleInputs}
                name="email"
                id="email"
              />
            </label>
          </div>
          <div className="wrap_input">
            <label htmlFor="password">
              password:
              <input
                type="password"
                value={pswrd}
                onChange={handleInputs}
                name="pswrd"
                id="password"
              />
            </label>
          </div>
        </motion.div>
        <input
          className="join"
          onClick={submit}
          type="submit"
          value={formType === "register" ? "sign up" : "sign in"}
        />
      </form>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  width: min(100vw, 650px);
  padding: max(2vw, 40px);
  height: fit-content;
  background: grey;
  background: #a8a98e;
  box-sizing: border-box;
  position: relative;

  .socials {
    display: flex;
    justify-content: space-between;
    justify-content:center;
    padding: 0.5rem;
    margin-bottom: 1rem;

    button {
      cursor: pointer;
      border: 2px solid #565656;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.7px;
      background: transparent;
      background: whitesmoke;
      height: 3rem;
      width: 8.5rem;
      color: #565656;
      display: grid;
      place-items: center;

      div {
        display: flex;
        gap: 0.6rem;

        .ts {
          color: #1da1f2;
        }
      }

      &:hover {
        transition: 0.5s ease-in all;
        color: #272727;
        border-color: #272727;
      }
    }
  }
  p {
    font-size: 14px;
    margin-bottom: 1rem;
  }
  h4 {
    text-align: center;
    position: relative;
    color: #272727;
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

  // .navigate {
  //   height: 50px;
  //   display: flex;
  //   margin-bottom: 1rem;
  //   div {
  //     width: 50%;
  //     display: grid;
  //     place-items: center;
  //     position: relative;
  //     border-bottom: 1px solid transparent;

  //     button {
  //       border: none;
  //       background: transparent;
  //       font-size: 16px;
  //     }

  //     &:nth-of-type(1)::after {
  //       content: "";
  //       position: absolute;
  //       background: pink;
  //       width: 1px;
  //       right: 0;
  //       height: 30px;
  //     }
  //   }
  //   .active {
  //     border-bottom: 1px solid pink;
  //   }
  // }

  form {
    padding: 1rem 1.5rem 0rem ;
    display:grid;
    gap:1rem;
    label {
      display: block;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.9px;
      color: #e8ebee;
      // position: absolute;
      // top: -50%;
    }
    input {
      width: 100%;
      padding: 0.3rem;
      height: 2.5rem;
      background: whitesmoke;
      letter-spacing: 1px;
      border: 1px solid #565656;
      outline: none;

      &:focus {
        box-shadow: inset 0px 0px 1px 1px #9fd4f4;
        border: 2px solid #6abdf0;
        border: 2px solid #1da1f2;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
      }
    }
    .name_cont {
      overflow: hidden;


      .name {
        display: flex;
        // background:red;
        gap: 2px;
        .lab {
          width: 100%;
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
    width: 100%;
    background: black;
    color: whitesmoke;
    height: 2.5rem;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.5px;
  }
`;
