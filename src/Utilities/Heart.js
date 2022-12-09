import { HeartIcon } from "./styled";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../store";
import { useFireContext } from "../components/FirebaseContext";
const Heart = ({display,image,
    cate,
    name,
    color,
    price,
    ratings,
    stock,
    type,
    id,}) => {
      
    const {addWishList,del,User} = useFireContext();

    const wished = useSelector((state) => state.productCate.savedProducts);
    
    
    const isAvailable = () => {
        let isAvailable = wished.find((item) => item.id === id);
 
        return isAvailable;
    };
    let isIt = isAvailable();

      const addToFavourite = () => {

        if (!isIt) {  
          
          return addWishList({
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
        }
        del(isIt.delId);
      };

  return (
            <HeartIcon display={display}  onClick={addToFavourite}>
                    {isIt ? <FaHeart /> : <FaRegHeart />}
            </HeartIcon>
  )
}

export default Heart