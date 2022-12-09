import {configureStore } from "@reduxjs/toolkit";
import {cart} from "./CartStore";
import {products} from "./ProductsStore";
import {gallery} from "./GalleryStore";






const store = configureStore({
    reducer:{productCate:products.reducer,
            gallery:gallery.reducer,
            cart:cart.reducer,
           }
})


export const productAction = products.actions;
export const galleryAction = gallery.actions;
export const cartAction = cart.actions;
export default store;


