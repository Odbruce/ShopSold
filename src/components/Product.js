import { useState } from "react";
import ProductDisplayOption from "./ProductDisplayOption";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";




const Product = ({ url, products:name, id, price, cate,images,stock,type,color,ratings  }) => {
  

  const [real, setReal] = useState({ display: false, pos: "" });
  
    
let favorite = {
  image:url,
  cate,
  name,
  color,
  price,
  ratings,
  stock,
  type,
  id,};


  const hovered = (e) => {
    const { left } = e.target.getBoundingClientRect();

    if (left > 0.5 * document.body.clientWidth) {
      return setReal({ display: true, pos: "right" });
    }
    return setReal({ display: true, pos: "left" });
  };

  return (
    <Wrapper
      onMouseEnter={hovered}
      onMouseLeave={() => {
        setReal({ display: false });
      }}
    >
      
      <div className="img_container">
        <img className="img" src={url} alt={name} />
      </div>
      <Link to={`/productpersonal/${cate}/${id}`} className="prod_link">
        <div className="contain">
          <p>{name}</p>
          <p>{priceToLocaleCurrrency(price)}</p>
        </div>
      </Link>
      {real.display && (
        <ProductDisplayOption
          real={real}
          {...favorite}
          images={images}
        />
      )}
    </Wrapper>
  );
};

export default Product;

const Wrapper = styled.div`
  margin-bottom: 5vw;
  margin-bottom: clamp(20px, 5vw, 40px);
  width: 100%;
  max-width:300px;
  text-align: start;
  position: relative;
  font-size: 0.9em;
  font-size: clamp(12px, calc(7px + 0.6vw), 16px);
  letter-spacing: 1px;

  .img_container {
    position: relative;

    img {
      height: clamp(250px, 36vw, 307px);
      object-fit: cover;
      width: 20.8vw;
      width: 100%;
      background: #c2ccbe;
      margin-bottom: 1em;
    }
  }
  .contain {
    display: flex;
    color: black;
    justify-content: space-between;
    padding: 0 0.5rem;
    text-transform: capitalize;
  }
  .blocked {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
  }
`;
