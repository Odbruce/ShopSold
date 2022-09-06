import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const CartComponent = () => {
  const [value, setValue] = useState(true);
  return (
    <section className="cartitems">
      <li>
        <RiDeleteBin5Line className="cart_delete" />
        <div className="img">
          <img src="" alt="" />
          <h2 className="center h2">NGN 2400.00 </h2>
        </div>
        <div className="desc">
          <Link to="/productpersonal" className="link">
            {" "}
            <h4>Lorem ipsum dolor sit amet</h4>
          </Link>
          <div>
            <div className="proplist">
              <div className="order_color">
                <p>color :</p> <div></div>
              </div>
              <p className="center">Size : XL</p>
              <p className="center">Qty : 4</p>
            </div>
          </div>
        </div>
      </li>

      <li>
        <RiDeleteBin5Line className="cart_delete" />
        <div className="img">
          <img src="" alt="" />
          <h2 className="center h2">NGN 2400.00 </h2>
        </div>
        <div className="desc">
          <Link to="/productpersonal" className="link">
            {" "}
            <h4>Lorem ipsum dolor sit amet</h4>
          </Link>
          <div>
            <div className="proplist">
              <div className="order_color">
                <p>color :</p> <div></div>
              </div>
              <p className="center">Size : XL</p>
              <p className="center">Qty : 4</p>
            </div>
          </div>
        </div>
      </li>

      <li>
        <RiDeleteBin5Line className="cart_delete" />
        <div className="img">
          <img src="" alt="" />
          <h2 className="center h2">NGN 2400.00 </h2>
        </div>
        <div className="desc">
          <Link to="/productpersonal" className="link">
            {" "}
            <h4>Lorem ipsum dolor sit amet</h4>
          </Link>
          <div>
            <div className="proplist">
              <div className="order_color">
                <p>color :</p> <div></div>
              </div>
              <p className="center">Size : XL</p>
              <p className="center">Qty : 4</p>
            </div>
          </div>
        </div>
      </li>

      <div className="sub_total">
        <h4>sub-total</h4>
        <p>NGN 7200.00</p>
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
