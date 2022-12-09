import {Cart,CheckOut,PersonalPage,Shop,ShopHome,Identity,Form,WishList, Error_page, ProductsPage} from "./Pages";
import { Route,Routes, useLocation,useMatch} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getShopProducts } from "./store/ProductsStore";
import PrivateRoute from "./Utilities/PrivateRoute";
import { ErrorMsg } from "./Utilities/ErrorMsg";
import RouteOrRedirect from "./Utilities/RouteOrRedirect";

const App = ()=>{
  const location = useLocation();
  const checkout = useMatch("/checkout");
  const errormsg = useSelector(state=>state.productCate.errormsg);
  const loading = useSelector(state=>state.productCate.loading);
  const dispatch = useDispatch();

  const closeNav = (e)=>{
      const navmodal = document.getElementById("navmodal");
      if(!e.target.closest(".men")&!!navmodal){return navmodal.style.display="none"}
  }


  useEffect(()=>{
       dispatch(getShopProducts());
  },[])

return (<>
{
   loading?<div className="app_loading">
                <div className="load_head">
                <h1 className={`${errormsg?"head_move":""}`}>shop<span>sold</span></h1>
                {errormsg? <img src={require("./Media/server_error.png")} />:null}
                </div>
                <div className="load_footer">
                  <p className={`${errormsg?"footer_exit":""}`}>let's help make here your home...</p>
                  <p className={`p_error ${errormsg?"entry":""}`}>{errormsg}</p>
                </div>
              </div>: <section onMouseOver={closeNav} >
                <ErrorMsg/>
                {!checkout&&<Navbar/>}
                <AnimatePresence initial={false}  exitBeforeEnter>
                  <Routes location={location} key={location.key}>
                    <Route path="/" element={<Shop/>}/>
                    <Route path="/identity" element={<PrivateRoute type="form"><Identity/></PrivateRoute>}>
                      <Route path=":formType" element={<Form/>}/>
                    </Route>
                    <Route path="/wishlist" element={<PrivateRoute type="wishlist"><WishList/></PrivateRoute>}/>
                    <Route path="shop/:cate" element={<RouteOrRedirect><ShopHome/></RouteOrRedirect>}/>
                    <Route path="/cart" element={<Cart/> }/>
                    <Route path="/checkout" element={<PrivateRoute type="checkout"><CheckOut/></PrivateRoute> }/>
                    <Route path="/products/:cate/:type" element={<RouteOrRedirect><ProductsPage/></RouteOrRedirect>}/>
                    <Route path="/productpersonal/:cate/:id" element={<RouteOrRedirect><PersonalPage/></RouteOrRedirect>}/>
                    <Route path="/error" element={<Error_page/>}/>
                  </Routes>
                {!checkout&&<Footer/>}
                </AnimatePresence>
              </section>
    
}    </>
    )
}
export default App;