import {createSlice,configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getLocallyStored = (type)=>{
    const stored = JSON.parse(localStorage.getItem(type));
    console.log(stored);
    if(stored){
        return stored;
    }
    else{
        return [];
    }
}

export const getShopProducts = createAsyncThunk(
    "productCategory/getShopProducts",
      async (_,thunkApi) =>{
        try{            
            const {data:dataM} =  await axios.get(`/api/products?cate=men`);
            const {data:dataW} =  await axios.get(`/api/products?cate=women`);
            return {dataM,dataW};
    
          }catch(error){
            // console.log(error.response)
           return thunkApi.rejectWithValue(error.response.data)
          }
      }  )

export const getGalleryProducts = createAsyncThunk(
    "productGallery/getGalleryProducts",
    async (obj,thunkApi)=>{
        const {type,cate} = obj
        try {
            const product = await axios.get(`/api/products?cate=${cate}`);
            const { data } = product;
            return thunkApi.fulfillWithValue({type,data})
          } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.response.data)
          }
    }
)

export const  getProduct = createAsyncThunk(
    "product/getProduct",
    async (obj,thunkApi)=>{
        const {cate,id,} = obj
        console.log(cate,id);
        try {
            const product = await axios.get(`/api/products?id=${id}&cate=${cate}`);
            const { data } = product;
            return data;
          } catch (error) {
           return thunkApi.rejectWithValue(error.response.data)    
          }
    }
)


const allproductState = {
    men:[{name:"",imageUrl:"",videoUrl:"",values:[]}],
    women:[{name:"",imageUrl:"",videoUrl:"",values:[]}],
    allProducts:[],
    savedProducts:getLocallyStored("wishlist"),
    recentlyVisited:[],
    filter:{
        text:"",
        searched:[]
    },
    loading:true,
    errormsg:""
}
const galleryState = {
    allProducts:[],
    filteredProducts:[],
    sort:"price low to high",
    isSortOpen:false,
    isFilterOpen:false,
    filters:{
        color:"all",
        size:"all",
        price:"",
        min_price:0,
        max_price:0,
        shipping:false,
    },
    loading:true,
    errormsg:""
}

const cartState = {
    cart:getLocallyStored("cart"),
    totalPrice:"",
    totalProducts:0,
    isCartOpen:false,
    cartProps:{
        color:"",
        size:"",
        quantity:1
    }
}

const productState = {
    loading:true,
    errormsg:"",
    product:[],
    propError:[],
    prop:{color:"",size:"",qty:1},
    display:false,
}

const products = createSlice({
    name:"productCategory",
    initialState:allproductState,
    reducers:{
        getproductCate(state,action){
            const {dataW,dataM} = action.payload;

            let menValues = dataM.map((item)=>{
                return item.values
            }).flat();

            let womenValues = dataW.map((item)=>{
                return item.values
            }).flat();

            console.log(menValues,womenValues);

            state.men = dataM.map((item)=>{
                        const {name,featuredUrl:imageUrl,videoUrl,values} = item;
                        return {name,imageUrl,videoUrl,values}
                    });

            state.women = dataW.map((item)=>{
                        const {name,featuredUrl:imageUrl,videoUrl,values} = item;
                        return {name,imageUrl,videoUrl,values}
                    });

            state.allProducts = [...menValues,...womenValues]
        },

        updateSearch(state,action){
            const{name,value} = action.payload;
            console.log(name,value)

            state.filter[name] = value;
        },

        filterSearch(state){
            const {allProducts} = state;
            let filtered = [...allProducts];
            const {text} = state.filter;
            if(text){
                filtered = filtered.filter((item)=>{
                    return item.products.includes(text.toLowerCase())||item.cate.includes(text.toLowerCase())
                }).sort((a,b)=>a.products.localeCompare(b.products));
            }
       

            state.filter.searched = [...filtered];

        },

        clearText(state){
            state.filter.text = "";
        },

        addToFavourite(state,action){
           const saved = action.payload;

           state.savedProducts = [...state.savedProducts,saved];
            localStorage.setItem("wishlist", JSON.stringify([...state.savedProducts,saved]));


        },
        getWishList(state,action){
            const saved = action.payload;
            state.savedProducts = [...saved]
        },
        addToRecentlyViewed(state,action){
            let viewed = [...state.recentlyVisited];


            console.log(viewed,"1st")

            const {id:view_id} = action.payload;

            console.log(action.payload,"action")

            let isAvailable = viewed.find(item=>item.id === view_id);

            console.log(isAvailable,"isavailable")

            if(!isAvailable){
                viewed = [...state.recentlyVisited,action.payload];
                console.log(viewed,"!available")
            }
            console.log(viewed,action.payload,"f.viewed");
            state.recentlyVisited = viewed;
        },

        clearRecentlyViewed(state){
            state.recentlyVisited=[]
        },

        deleteWish(state,action){
            let filtered = [...state.savedProducts];
             filtered = filtered.filter((item)=>item.id!==action.payload);
            console.log(filtered,action.payload);

            state.savedProducts = filtered;
        }
    },
    extraReducers:{
        [getShopProducts.pending]:(state)=>{
            state.loading=true;
        },
        [getShopProducts.fulfilled]:(state,action)=>{
            
            const {dataW,dataM} = action.payload;

            let menValues = dataM.map((item)=>{
                return item.values
            }).flat();

            let womenValues = dataW.map((item)=>{
                return item.values
            }).flat();

            console.log(menValues,womenValues);

            state.men = dataM.map((item)=>{
                        const {name,featuredUrl:imageUrl,videoUrl,values} = item;
                        return {name,imageUrl,videoUrl,values}
                    });

            state.women = dataW.map((item)=>{
                        const {name,featuredUrl:imageUrl,videoUrl,values} = item;
                        return {name,imageUrl,videoUrl,values}
                    });

            state.allProducts = [...menValues,...womenValues]
            state.loading=false

        },
        [getShopProducts.rejected]:(state,action)=>{
            let loaderror = action.payload.toLowerCase().includes("timeout")?"TimeOut Error, please check your connection":action.payload;
            state.errormsg=loaderror;            
        }
    }
})


const product = createSlice({
    name:"product",
    initialState:productState,
    reducers:{

    },
    extraReducers:{
        [getProduct.pending]:(state)=>{
            state.loading = true;
        },
        [getProduct.fulfilled]:(state,action)=>{
            state.product = action.payload;
            state.loading = false;
        },
        [getProduct.rejected]:(state,action)=>{
            let loaderror;
            if(action.payload.toLowerCase().includes("timeout")){
                loaderror={msg:"TimeOut Error, please check your connection",
                            img:require("../Utilities/server_error.png")}
              }
              else if(action.payload.toLowerCase().includes("server error")){
                loaderror={msg:action.payload,
                            img:require("../Utilities/server_error.png")}
              }
              else{ loaderror={msg:action.payload,
                              img:require("../Utilities/page_not_found.png")}
              }
            
                state.errormsg = loaderror;
                state.loading = false;
        }
    }
})


const gallery = createSlice({
    name:"productGallery",
    initialState:galleryState,
    reducers:{
        getProducts(state,action){
         
            const {values} = action.payload;
            console.log(values);
            let max_price = values.map((item)=>{ return item.price});
            let min_price = values.map((item)=>{ return item.price})

            max_price = Math.max(...max_price);
            min_price = Math.min(...min_price);


            console.log(max_price,min_price);


            console.log(action.payload)
           
            state.allProducts = action.payload ;

            state.filteredProducts = action.payload;
             state.filters = {...state.filters,max_price,min_price,price:min_price};

        },
        updateFilter(state,action){
         
            const {name,value}  = action.payload;
            
            state.filters[name] = value;
           
        //    state.filteredProducts={name:filtered.name,featuredUrl:filtered.featuredUrl,videoUrl:filtered.videoUrl,values:filteredValue};
        },
        filterProduct(state){
            const {allProducts} = state;
            const {color,size,price,shipping} = state.filters;
            
            let filteredProduct = {...allProducts};


            if(color!=="all"){
                filteredProduct ={ ...filteredProduct,values:filteredProduct.values.filter(item=>item.color.find(item=>item===color))}
            }
            if(size!=="all"){
                filteredProduct ={ ...filteredProduct,values:filteredProduct.values.filter(item=>item.size.find(item=>item===size))}
            }
            if(price){
                filteredProduct ={ ...filteredProduct,values:filteredProduct.values.filter(item=>Number(item.price) >= price)}

            }
            state.filteredProducts = filteredProduct
        },
        clearFilter(state){
            state.filters = {  
            ...state.filters,    
            color:"all",
            size:"all",
            price:state.filters.min_price,
            shipping:false,}
        },
        sortProduct(state){
            const {filteredProducts} = state;
            let sortedProduct={...filteredProducts};

            const {sort} = state;
            console.log(sort);

            if(state.sort ==="name a-z"){

                sortedProduct = {...sortedProduct,values:sortedProduct.values.sort((a,b)=>a.products.localeCompare(b.products))}

            }
            if(state.sort ==="name z-a"){
                sortedProduct = {...sortedProduct,values:sortedProduct.values.sort((a,b)=>b.products.localeCompare(a.products))}

            }
            if(state.sort ==="price low to high"){
                sortedProduct = {...sortedProduct,values:sortedProduct.values?.sort((a,b)=>a.price-b.price)}

            }
            if(state.sort ==="price high to low"){
                sortedProduct = {...sortedProduct,values:sortedProduct.values.sort((a,b)=>b.price-a.price)}

            }
            if(state.sort ==="most popular"){
                sortedProduct = {...sortedProduct,values:sortedProduct.values.sort((a,b)=>b.ratings-a.ratings)}

            }

            state.filteredProducts = sortedProduct;
            state.isSortOpen = false;

        },
        openSort(state){
            state.isSortOpen=!state.isSortOpen;
        },
        updateSort(state,action){
            console.log(action.payload)
            state.sort = action.payload
        },
        openFilter(state){
            state.isFilterOpen=!state.isFilterOpen;
        }

    },
    extraReducers:{
        [getGalleryProducts.pending]:(state)=>{
            state.loading=true;
        },
        [getGalleryProducts.fulfilled]:(state,action)=>{
            const {type,data} = action.payload;

            const filtered = data.find((items) => {
                const { name } = items;
                if (type === "beach") {
                  return name === type + "?please";
                }
                return name === type;
              });

              const {values} = filtered;
            let max_price = values.map((item)=>{ return item.price});
            let min_price = values.map((item)=>{ return item.price})

            max_price = Math.max(...max_price);
            min_price = Math.min(...min_price);
           
            state.allProducts = filtered ;
            state.filteredProducts = filtered;
            state.filters = {...state.filters,max_price,min_price,price:min_price};
            state.loading = false;
        },
        [getGalleryProducts.rejected]:(state,action)=>{
            let loaderror = action.payload.toLowerCase().includes("timeout")?"TimeOut Error, please check your connection":action.payload;
            state.errormsg = loaderror;
            state.loading = true;
        }
    }

})

const cart = createSlice({
    name:"Cart",
    initialState:cartState,
    reducers:{
        inputHandler(state,action){

            const {name,value} = action.payload;
            state.cartProps[name] = value;
        },
        updateCart(state,action){
            const {name,price,cate,type,id:productId,image,quantity,color,size} = action.payload;
            // const {quantity,color,size} = state.cartProps;

            let id = color+size+productId;
            let cart = [...state.cart]
            const isAvailable = cart.find(item=>item.id===id);
            console.log(isAvailable);
            if(isAvailable){

                 cart = state.cart.map((item)=>{
                    let cartitem = item;
                    if(item.id===id){
                        console.log(cartitem.quantity,quantity);
                        cartitem = {...cartitem,quantity:quantity+cartitem.quantity}
                        return cartitem;
                    }
                    return cartitem;
                })

                const {price,products} = cart.reduce((total,item)=>{
                    const {price,quantity} = item;
                    total.products+=quantity;
                    total.price+=quantity*price
                    return total;
                },{price:0,products:0})
    
                console.log(products,cart[0].quantity)
    
                // localStorage.setItem("cart", JSON.stringify(cart));
                state.cart = cart;
                state.totalPrice = price;
                state.totalProducts = products;

                //  state.cart = cart;
                 return;
            }

            state.cart = [...cart,{name,cate,type,image,price,quantity,color,size,id}]
        },
        cartOpen(state,action){
            state.isCartOpen = action.payload;
        },
        clearCart(state){
            // localStorage.setItem("cart", JSON.stringify(""));
            state.cart=[];
        },
        deleteCartItem(state,action){
            const id = action.payload
            console.log(id);
            let cart = state.cart.filter(item=>item.id !== id)
            console.log(cart);

            const {price,products} = cart.reduce((total,item)=>{
                const {price,quantity} = item;
                total.products+=quantity;
                total.price+=quantity*price
                return total;
            },{price:0,products:0})

            console.log(products)

            state.totalPrice = price;
            state.totalProducts = products;

            localStorage.setItem("cart", JSON.stringify(cart));
            state.cart = cart;
        },
        total(state){
            const {cart} = state
            const {price,products} = cart.reduce((total,item)=>{
                const {price,quantity} = item;
                total.products+=quantity;
                total.price+=quantity*price
                return total;
            },{price:0,products:0})

            console.log(products)

            state.totalPrice = price;
            state.totalProducts = products;
        }
    }
})

const store = configureStore({
    reducer:{productCate:products.reducer,
            gallery:gallery.reducer,
            cart:cart.reducer,
            product:product.reducer}
})


export const productAction = products.actions;
export const galleryAction = gallery.actions;
export const cartAction = cart.actions;
export const {} = product.actions;
export default store;


