import styled from "styled-components";
import { BsChevronCompactDown } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";
import { useDispatch,useSelector } from "react-redux";
import {cartAction} from "../store";
import { getUniqueValue } from "../Utilities/getUniqueValue";
import { Link } from "react-router-dom";
import { QuantityButton } from "../Utilities/QuantityButton";
import { useFireContext } from "./FirebaseContext";


export const WishProduct = ({wishProp}) => {

  const dispatch = useDispatch();

  const {name,id,color,price,image,cate,stock,delId,type} = wishProp;

  const [cartProp,setcartProp] = useState({color:"",size:"",qty:1});
  const [errormsg, setErrormsg] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const allproducts = useSelector((state) => state.productCate.allProducts);
  const sizes = getUniqueValue(allproducts, "size", true);
  const {color:selectedColor,size,qty} = cartProp;

  const {del} = useFireContext();


  const updateCart = () => {

    if (!selectedColor || !size) {
      let msg = [];

      if (!selectedColor) {
        msg[0] = "please select a color";
      }
      if (!size) {
        msg[1] = "please select a size";
      }

      return setErrormsg(msg);
    }

    dispatch(
      cartAction.updateCart({
        name,
        cate,
        type,
        price,
        id,
        image,
        color:selectedColor,
        size,
        quantity:qty,
      })
    );
    setcartProp({color:"",size:"",qty:1});
    dispatch(cartAction.cartOpen(true));
  };


  const [display, setDisplay] = useState(false);

  const deleteWish = ()=>{
    // dispatch(productAction.deleteWish(id));
    del(delId)
  }

  

  const dropDown = ()=>{
    console.log("click")
    if(display){
    setcartProp({color:"",size:"",qty:1});
    setErrormsg([]);
      return setDisplay(false)
    }
    return setDisplay(true);
  }

  const handleInput = (e) => {
    const { name, textContent, dataset } = e.target;
    let prop = textContent;
    if (name === "color") {
      prop = dataset.color;
    }
    setcartProp({...cartProp,[name]:prop})
  };

  const stockLeft = () => {
    let remainingstock = Number(stock);
    console.log(stock)

    const isAvailable = cart.find(
      (item) => item.id === selectedColor + size + id
    );
    if (isAvailable) {
      remainingstock = Number(stock) -  Number(isAvailable.quantity);

      return remainingstock;
    }


    return remainingstock;
  };


  const quantityProps = {qty ,setcartProp ,stockLeft ,selectedColor ,size ,setErrormsg};
  
  

  return (
    <Wrapper>
      <div className="img_container">
        <div onClick={deleteWish} className="H">
          <RiDeleteBin5Line />
        </div>
        <img className="img" src={image} alt="" />
      </div>
        {
        <motion.button
          initial={{ height: "0px", opacity:0}}
          animate={{
            height: display ? `calc(2vw + 16px)` : "0px",
            opacity:display?1:0,
          }}
          transition={{
            type: "tween",
            ease: [0.6, 0.15, 0.59, 0.9],
            duration: 0.2,
          }}
          className={selectedColor && size && stockLeft() ? "contain add":"contain"}
          // disabled={!(selectedColor && size && stockLeft())}
          onClick={updateCart}

        >
          <p>{priceToLocaleCurrrency(price)}</p>
          <p>add to cart</p>
        </motion.button>
      }

      <div className="header">
        <Link to={`/productpersonal/${cate}/${id}`} className="name">
        <h4>{name}</h4>
        </Link>
        <BsChevronCompactDown
          onClick={dropDown}
          className={display ? "arrow active" : "arrow"}
        ></BsChevronCompactDown>
      </div>
      {
        <motion.div
          initial={{ height: "0px" }}
          animate={{ height: display ? "calc(3rem + 3.2vw)" : "0px" }}
          transition={{
            type: "tween",
            ease: [0.6, 0.15, 0.59, 0.9],
            duration: 0.1,
          }}
          className="props"
        >
          <div className="prop">
            <div className="sizes">
            {sizes.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={handleInput}
                      name="size"
                      className={`${size === item ? "active span" : "span"}`}
                    >
                      {item}
                    </button>
                  );
                })}
            {!size && <p className="errormsg">{errormsg[1]}</p>}
            </div>

          </div>
          <div className="prop">
            { 
            stockLeft()===0?<p className="errormsg">product currently out of stock,please check-in later</p>:
            <QuantityButton {...quantityProps}/>}

            <div className="color">
            {color.map((items, index) => {
                      return (
                        <button
                          onClick={handleInput}
                          name="color"
                          data-color={items}
                          key={index}
                          style={{ background: items }}
                          className={
                            selectedColor === items ? "span active" : "span"
                          }
                        >
                          {" "}
                        </button>
                      );
                    })}

                {!selectedColor && <p className="errormsg">{errormsg[0]}</p>}
            
            </div>
          </div>
        </motion.div>
      }
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin-bottom: clamp(20px, 5vw, 40px);
  width: 100%;
  text-align: start;
  position: relative;
  font-size: 0.9em;
  font-size: clamp(12px, calc(7px + 0.6vw), 16px);
  letter-spacing: 1px;
  width: clamp(170px, 30vw, 280px);

  .errormsg{
    position:relative;
    bottom:-100%;
    font-size:9px;
    color:red;
  }


  .img_container {
    position: relative;


    .H {
      position: absolute;
      cursor: pointer;
      z-index: 2;
      top: 2%;
      border-radius: 50%;
      background: white;
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      color: #453f39;
      right: 3%;
      display:none;
    }

    img {
      height: clamp(250px, 36vw, 307px);
      object-fit: cover;
      width: 100%;
      background: #c2ccbe;
    }

    &:hover .H{
      display:grid;
    }
  }
  .contain {
    position: relative;
    display: flex;
    color: black;
    justify-content: space-between;
    border: 2px solid grey;
    width: 100%;
    padding: 0 0.5rem;
    text-transform: uppercase;
    align-items: center;
    margin-bottom: 1vw;
    height: calc(2vw + 16px);
    overflow: hidden;
    transition: border 0.4s ease-in-out;
    font-size: clamp(10px, calc(7px + 0.6vw), 15px);
    font-family:"Segoe UI";
    font-weight:600;
    cursor: pointer;
        
    p{
      font-size:clamp(9px, calc(7px + 0.5vw), 16px);
      whitespace:no-wrap;
      color: grey;
    }
  }
  .add{
    border:2px solid var(--font_pri);
    
    p{
      color:green;
      &:nth-of-type(2){
        color:var(--font_pri);
      }
    }    
  }
  .props {
    transition: 1s ease;
    overflow: hidden;
    transform: translateY(-200%);
    transform: translateY(0);
    height: 0;

    .prop {
      padding: 0.8vw 0.5rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid grey;
      position:relative;

      .sizes {
        width: 7rem;
        display: flex;
        justify-content: space-between;
        gap: 0.5vw;
        
        .errormsg{
          position:absolute;
          width:7rem;
          bottom:0;
          font-size:7px;
          color:red;
          text-align:center;
        }

        button {
          border: solid 2px transparent;
          background:transparent;
          text-transform:uppercase;
          width:22px;
          height:22px;
          place-items: center;
          display: grid;
          color: grey;
          transition: border 0.4s ease-in-out;
          cursor: pointer;
          font-size:clamp(9px, calc(7px + 0.5vw), 16px)

        }
        .active {
          border: solid 2px black;
          font-weight: 500;
          color: #453f39;
        }
      }
      .color {
        display: flex;
        align-self:center;
        gap: 0.5vw;


        .errormsg{
          position:absolute;
          width:7rem;
          font-size:7px;
          bottom:0px;
          color:red;
          right:0;
          text-align:end;
        }

        .span {
          width: max(1.4vw, 10px);
          height: max(1.4vw, 10px);
          border: solid 2px transparent;
          transition: border 0.4s ease-in-out;
          cursor: pointer;

        }
        .active {
          border-color: white;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgb(0, 0, 0, 0.2);
        }
      }

      .quantity_btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // width: 5rem; 

        .qty_displace {
          font-size: max(12px, calc(7px + 0.6vw));
          width:3rem;
          text-align:center;
          background:transparent;
          border:none;
          line-height: 1rem;
        }

        button {
          background: transparent;
          display: grid;
          font-size: max(12px, calc(7px + 0.6vw));
          color: #453f39;
          cursor: pointer;
          border: none;
          padding: 0;
        }
      }
    }
  }
  .active {
    height: 100%;
  }
  .header {
    text-transform: capitalize;
    justify-content: space-between;
    font-size: clamp(12px, calc(7px + 0.6vw), 16px);
    display: flex;

    .name {
      font-weight: 400;
      color: #453f39;
      text-decoration:none;
      
    }
    .arrow {
      transition: 0.7s ease;
      cursor: pointer;
    }

    .active {
      transform: rotate(-180deg);
    }
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
