import {Cart,CheckOut,PersonalPage,Product,Shop,ShopHome,Register,Identity,Form,WishList} from "./Pages";
import { Route,Routes, useLocation,useMatch ,Navigate} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction,cartAction, getShopProducts } from "./store";
import PrivateRoute from "./Utilities/PrivateRoute";
import { IsUserAvailable } from "./Utilities/IsUserAvailable";
import {useFireContext } from "./components/FirebaseContext";


const App = ()=>{
    const location = useLocation();
  const checkout = useMatch("/checkout");
  const matchshop = useMatch("/");
  // const [loading , setLoading] = useState(true);
  // const [errormsg , setErrormsg] = useState("");
  const {allProducts,errormsg,loading} = useSelector(state=>state.productCate)
  const dispatch = useDispatch();
  const {User} = useFireContext();
console.log("app",allProducts);

const closeNav = (e)=>{
if(!e.target.closest(".men")){return document.getElementById("navmodal").style.display="none"}

}


  useEffect(()=>{
    // const fetchData =  async()=>{  
    //   try{
    //     console.log("calling")
    //     setLoading(true);
    //     setErrormsg("")
    //     const {data:dataM} =  await axios.get(`/api/products?cate=men`);
    //     const {data:dataW} =  await axios.get(`/api/products?cate=women`);
    //     dispatch(productAction.getproductCate({dataM,dataW}));
    //     setLoading(false);

    //   }catch(error){
    //     // console.log(error.response)
    //     let loaderror = error.response.data.toLowerCase().includes("timeout")?"TimeOut Error, please check your connection":error.response.data;
    //     setErrormsg(loaderror)
    //   }
    // }
    //   return fetchData()

    dispatch(getShopProducts());
  },[])

return (<>
{
   loading?<div className="app_loading">
                <div className="load_head">
               <h1 className={`${errormsg?"head_move":""}`}>shop<span>sold</span></h1>
              {errormsg? <img src={require("./Utilities/server_error.png")} />:null}
                </div>
                <div className="load_footer">
                  <p className={`${errormsg?"footer_exit":""}`}>let's help make here your home...</p>
                  <p className={`p_error ${errormsg?"entry":""}`}>{errormsg}</p>
                </div>
            </div>: <section onMouseOver={closeNav} >
                {!checkout&&<Navbar/>}
                <AnimatePresence initial={false}  exitBeforeEnter>
                <Routes location={location} key={location.key}>
                <Route path="/" element={<Shop/>} />
                <Route path="/identity" element={<PrivateRoute type="form"><Identity/></PrivateRoute>}>
                  <Route path=":formType" element={<Form/>}/>
                </Route>
                <Route path="/wishlist" element={<WishList/>}/>
                <Route path="shop/:cate" element={<ShopHome/>}/>
                <Route path="/cart" element={<Cart/> }/>
                <Route path="/checkout" element={<PrivateRoute type="checkout"> <CheckOut/></PrivateRoute> }/>
                <Route path="/products/:cate/:type" element={<Product/>}/>
                <Route path="/productpersonal/:cate/:id" element={<PersonalPage/>}/>
                {/* <Route path="" element={<Error/>}/> */}
            </Routes>
        {!checkout&&<Footer/>}
                </AnimatePresence>
    </section>
    
}    </>
    )
}
export default App;