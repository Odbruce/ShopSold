import {useEffect} from "react";
import {Cart,PersonalPage,Product,Shop,ShopHome} from "./Pages";
import { Route,Routes, useLocation,useMatch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import { SearchModal } from "./Utilities/SearchModal";
import WishList from "./Pages/WishList";


const App = ()=>{
    const location = useLocation();
  const matchshop = useMatch("/shop");

        
 
    return (<>
    <section >
        {/* <SearchModal/> */}
        <Navbar/>
                <AnimatePresence initial={false}  exitBeforeEnter>
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Shop/>}/>
                <Route path="/wishlist" element={<WishList/>}/>
                <Route path="shop/:cate" element={<ShopHome/>}/>
                <Route path="/cart" element={<Cart/> }/>
                <Route path="/products/:cate/:type" element={<Product/>}/>
                <Route path="/productpersonal/:cate/:id" element={<PersonalPage/>}/>
                {/* <Route path="//men/cate:id" element */}
            </Routes>
        {!matchshop&&<Footer/>}
                </AnimatePresence>
    </section>
    
    </>
    )
}
export default App;