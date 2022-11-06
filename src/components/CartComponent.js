import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector ,useDispatch} from "react-redux";
import { cartAction } from "../store";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";

const CartComponent = () => {
  const [value, setValue] = useState(true);

  const cart = useSelector((state)=>state.cart.cart)
  const totalPrice = useSelector((state)=>state.cart.totalPrice)

  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   dispatch(cartAction.total());
  //   console.log(cart);
  // }, [cart]);


  const deleteitem = (a)=>{
    dispatch(cartAction.deleteCartItem(a));
    console.log(a);

  }

  return (
    <section className="cartitems">

    {  cart.map((item)=>{
      const {price,image,name,cate,type,size,quantity,color,id} = item;
      console.log(item);
      let productId = id.replace(color,"").replace(size,"");
      return (
      <li key={id}>
      <RiDeleteBin5Line onClick={()=>{deleteitem(id)}} className="cart_delete" />
      <div className="img">
        <img src={image} alt="" />
        <h2 className="center h2">{priceToLocaleCurrrency(price*quantity)}</h2>
      </div>
      <div className="desc">
        <Link to={`/productpersonal/${cate}/${productId}`} className="link">
          {" "}
          <h4>{name}</h4>
        </Link>
        <div>
          <div className="proplist">
            <div className="order_color">
              <p>color :</p> <div style={{background:color}}></div>
            </div>
            <p className="center">Size : {size}</p>
            <p className="center">Qty : {quantity}</p>
          </div>
        </div>
      </div>
    </li>)
    })}

      <div className="sub_total">
        <h4>sub-total</h4>
        <p>{priceToLocaleCurrrency(totalPrice)}</p>
      </div>

      <div className="shipping">
        <FiTruck className="truck" />
        <div className="words">
          <h3>FREE* STANDARD DELIVERY</h3>
          <p>1 more product and you get a free delivery</p>
          <p>More info</p>
        </div>
      </div>

      {/* <h4>
        come on! 2 more items and you're rewarded with 20% discount and a free
        delivery. <b>Let's get it</b>
      </h4> */}
    </section>
  );
};
export default CartComponent;
