import React from "react";
import styled from "styled-components";

const Filter = () => {
  return (
    <Wrapper>
      <section className="aside_categories">
        <div className="filter ">
          <h2>Filter</h2>
          <input
            className="rotate-bar"
            min="12000"
            max="50000"
            // value=""
            type="range"
            name=""
            id=""
          />
          <p>
            <b>Price:</b> N12,000 - N50,000
          </p>
          <p>
            <b>Size:</b>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </p>
          <button className="cursor">Filter</button>
        </div>
        <hr />

        {/* <h2 className="product_cate_head">Product Categories</h2>
        <h3 className="cursor">What's New?</h3>
        <div className="aside_cate">
          <h3>WOMEN</h3>
          <ul>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
          </ul>
        </div> */}
      </section>
    </Wrapper>
  );
};

export default Filter;

const Wrapper = styled.aside`
  height: fit-content;
  border: solid #353B43 2px;
  border:solid #94A48E 2px;
  display: grid;
  grid-template-rows: 1fr 10%;
  margin-right: 2em;
  gap: 2em;
  position: sticky;
  top: 90px;
  transition: all 0.4s ease-in-out;


  &:hover{
  border: solid #353B43 2px;


  }

  @media screen and (max-width: 900px) {
    display: none;
  }

  .aside_categories {
    padding: 1em;
    padding: clamp(10px, 1em, 1.11vw);
    height: 350px;
    color: #30281e;
    // -ms-overflow-style: none;
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    h3 {
      margin-bottom: 1rem;
      white-space: nowrap;
      font-size: 1em;
      font-size: calc(0.2rem + 0.889vw);
      font-weight: 400;
    }

    h2 {
      font-size: calc(0.3rem + 1.2vw);
      white-space: nowrap;
      font-weight: 400;
    }

    .filter {
      display: grid;
      place-items: center;
      gap: 2em;
      letter-spacing: 1px;
      margin-bottom: 1em;

      .rotate-bar {
        height: 0;
        outline: none;
        border: solid grey 1px;
        margin-bottom: 0.6em;
        appearance: none;
        width: 130px;
        width: 9.02vw;

        &::-webkit-slider-thumb {
          appearance: none;
          background: rgb(19, 18, 18, 0.7);
          width: 10px;
          height: 10px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
        }
        &::-moz-range-thumb {
          appearance: none;
          background: rgb(19, 18, 18, 0.7);
          width: 10px;
          height: 10px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
        }
      }

      p {
        font-size: 0.7em;
        font-size: clamp(12px, calc(7px + 0.6vw), 16px);
        letter-spacing: 0.208vw;
        letter-spacing: 2px;

        button {
          border: none;
          padding: 0.1rem;
          padding: 0.1vw;
          margin: 0 0.4rem;
          margin: 0 0.24vw;
          font-size: inherit;
          font-family: inherit;
          color: inherit;
          cursor: pointer;
        }
      }

      button {
        width: fit-content;
        height: auto;
        padding: 1em;
        background: transparent;
        border: solid #d2d7dd 2px;
        border-radius: 2px;
        letter-spacing: 1px;
        color: #767879;
        transition: all 0.4s ease-in-out;

        &:hover {
          border-color: #30281e;
          color: #30281e;
        }
      }
    }

    .product_cate_head {
      margin-bottom: 1em;
      text-align: center;
    }

    .aside_cate {
      ul li {
        margin-bottom: 1em;
        border: 0;
        cursor: pointer;
        background: transparent;
        font-size: calc(0.16rem + 0.71vw);
        display: block;
        width: fit-content;
        margin-left: 4%;
        color: #767879;
      }

      h3 {
        font-size: 1em;
        font-size: calc(0.2rem + 0.889vw);
        font-weight: 400;
      }
    }
  }
`;
