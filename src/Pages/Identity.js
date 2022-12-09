import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Identity = () => {
  const { formType } = useParams();

  return (
    <Wrapper>
     
      <div className="contained">
        <div className="navigate">
          <div className={formType === "register" ? "active" : null}>
            <Link to="register" className="link" type="Link">
              Register{" "}
            </Link>
          </div>
          <div className={formType !== "register" ? "active" : null}>
            <Link to="signin" className="link" type="Link">
              Sign-in
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Identity;

const Wrapper = styled.section`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;


  

  .contained {
    margin-bottom: 6rem;
    top: 3rem;
    position: relative;
  }
  .navigate {
    height: 60px;
    display: flex;
    background: grey;
    background: #a8a98e;
    color: whitesmoke;
    // margin-bottom: 1rem;
    padding: 0.3rem 1.4em 0 1.4em;

    div {
      width: 50%;
      display: grid;
      place-items: center;
      position: relative;
      border-bottom: 2px solid whitesmoke;

      .link {
        border: none;
        background: transparent;
        text-transform: uppercase;
        font-family: futura-pt, sans-serif;
        text-decoration: none;
        color: inherit;
        color: #565656;
        font-weight: 600;
        letter-spacing: 0.8px;
        font-size: 14px;
      }

      &:nth-of-type(1)::after {
        content: "";
        position: absolute;
        background: var(--bg_org);
        background: whitesmoke;
        width: 0.8px;
        right: 0;
        height: 20px;
      }
    }
    .active {
      border-bottom: 2px solid var(--bg_org);
      border-color: var(--font_pri);
      .link {
        transition: 0.9s ease all;
        color: #565656;
        color: whitesmoke;
        color: black;
        color: var(--font_pri);
      }
    }
  }
`;
