import React from 'react'
import { HeartIcon } from "./ProductDisplayOption";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../store";

const Heart = ({display,image,
    cate,
    name,
    color,
    price,
    ratings,
    stock,
    type,
    id,}) => {

    const wished = useSelector((state) => state.productCate.savedProducts);
    const dispatch = useDispatch();

    
    
    const isAvailable = (a) => {
        let isAvailable = wished.find((item) => item.id === id);
        
        if (!isAvailable) {
            return false;
        }
        return true;
    };
    let isIt = isAvailable(id);
    console.log(isIt);

    console.log(stock,"stock")
    
      const addToFavourite = () => {
        if (!isIt) {
          return dispatch(
            productAction.addToFavourite({
             image,
              cate,
              name,
              color,
              price,
              ratings,
              stock,
              type,
              id,
            })
          );
        }
        dispatch(productAction.deleteWish(id));
      };

  return (
            <HeartIcon display={display}  onClick={addToFavourite}>
                    {isIt ? <FaHeart /> : <FaRegHeart />}
            </HeartIcon>
  )
}

export default Heart