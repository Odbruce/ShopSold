
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const allproductState = {
    men:[{name:"",imageUrl:"",videoUrl:"",values:[]}],
    women:[{name:"",imageUrl:"",videoUrl:"",values:[]}],
    allProducts:[],
    savedProducts:[],
    recentlyVisited:[],
    filter:{
        text:"",
        searched:[]
    },
    loading:true,
    errormsg:""
}

export const getShopProducts = createAsyncThunk(
    "productCategory/getShopProducts",
      async (_,thunkApi) =>{
        try{            
            const {data:dataM} =  await axios.get(`/api/products?cate=men`);
            const {data:dataW} =  await axios.get(`/api/products?cate=women`);
            return {dataM,dataW};
    
          }catch(error){
           return thunkApi.rejectWithValue(error.response.data)
          }
      }  )


export const products = createSlice({
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
            // localStorage.setItem("wishlist", JSON.stringify([...state.savedProducts,saved]));


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


