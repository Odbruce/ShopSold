import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { galleryAction } from "../store";
import { getUniqueValue } from "../Utilities/getUniqueValue";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";

const Filter = ({display}) => {
  const dispatch = useDispatch();

  const filterValues = useSelector((state) => {
    return state.gallery.filters;
  });
  const products = useSelector((state) => {
    return state.gallery.allProducts;
  });

  const { color, size, min_price, max_price, price } = filterValues;

  const colors = getUniqueValue(products.values, "color");
  const sizes = getUniqueValue(products.values, "size");

  useEffect(() => {
    dispatch(galleryAction.filterProduct());
  }, [products, filterValues]);

  const clearFilter = () => {
    dispatch(galleryAction.clearFilter());
  };

  const changed = (e) => {
    const { name, value, dataset } = e.target;
    let prop;
    if (name === "price") {
      prop = Number(value);
    }
    if (name === "color") {
      prop = dataset.color;
    }
    if (name === "size") {
      prop = e.target.textContent;
    }

    dispatch(galleryAction.updateFilter({ name, value: prop }));
  };

  return (
    <Wrapper id="filter" className="filterr"  display={display}>
      <section className="aside_categories">
        <div className="filter ">
          <h2>Filter</h2>
          <input
            className="rotate-bar"
            onChange={changed}
            min={min_price}
            max={max_price}
            value={price}
            type="range"
            name="price"
            id=""
          />
          <p>
            <b>PRICE: </b> {` ${priceToLocaleCurrrency(price)}-${priceToLocaleCurrrency(max_price)}`}
          </p>
          <p>
            <b>SIZE :</b>
            {sizes.map((item, index) => {
              return (
                <button
                  key={index}
                  className={size === item ? "active" : null}
                  name="size"
                  onClick={changed}
                >
                  {item}
                </button>
              );
            })}
          </p>
          <p>
            <b>COLOR:</b>{" "}
            {colors.map((item, index) => {
              return (
                <button
                  data-color={item === "all" ? "all" : item}
                  key={index}
                  className={color === item ? "active colors" : "colors"}
                  name="color"
                  onClick={changed}
                  style={{ background: `${item}` }}
                >
                  {item === "all" && item}
                </button>
              );
            })}
          </p>
          <button onClick={clearFilter} className="cursor">
            Clear 
          </button>
        </div>
      </section>
    </Wrapper>
  );
};

export default Filter;

const Wrapper = styled.div`
  height: fit-content;
  border: solid #94a48e 2px;
  display: grid;
  grid-template-rows: 1fr 10%;
  margin-right: 2em;
  gap: 2em;
  position: ${(prop)=>(prop.display==="grid"?"absolute":"sticky")};
  top: 90px;
  right:-${(prop)=>(prop.display==="grid"?"25%":null)};
  transition:  0.3s ease-in-out;
  transition-property:opacity, top,translate;

  &:hover {
    border: solid #353b43 2px;
  }

  @media screen and (max-width: 900px) {
    position:absolute;
    justify-content:center;
    width:250px;
    background:#E8EBEE;
    display:${(prop)=>(prop.display==="grid"?"grid":"none")};
    z-index:4;
    right:-25%;
    transform:translateY(5px);
  }

  .aside_categories {
    padding: clamp(10px, 1em, 1.11vw);
    color: #30281e;
  

    h3 {
      margin-bottom: 1rem;
      white-space: nowrap;
      font-size: 1em;
      font-size: calc(0.2rem + 0.889vw);
      font-weight: 400;
    }

    h2 {
      font-size:clamp(16px,calc(10px + 2vw),24px);  
      white-space: nowrap;
      font-weight: 400;
    }

    .filter {
      display: grid;
      place-items: flex-start;
      gap: 2em;
      letter-spacing: 1px;
      margin-bottom: 1em;

      .rotate-bar {
        height: 0;
        outline: none;
        border: solid grey 1px;
        margin-bottom: 0.2em;
        appearance: none;
        width: max(130px,9.02vw);

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
        font-size: clamp(9px, calc(6px + 0.4vw), 12px);
        letter-spacing: 2px;
        display: flex;
        align-items: center;

        button {
          border: transparent 2px solid;
          text-transform: uppercase;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 max(0.24vw,3px);
          font-size: inherit;
          font-family: inherit;
          color: #767879;
          cursor: pointer;
        }
        .active {
          border-color: #30281e;
          color: #30281e;
        }
      }

      button {
        width: fit-content;
        height: auto;
        padding: max(1vw,2px);
        background: transparent;
        border: solid #d2d7dd 2px;
        border-radius: 2px;
        letter-spacing: 1px;
        color: #767879;
        transition: all 0.4s ease-in-out;
        font-size: clamp(12px, calc(7px + 0.4vw), 16px);
        text-transform:uppercase;


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
