import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";






export const getGalleryProducts = createAsyncThunk(
    "productGallery/getGalleryProducts",
    async (obj,thunkApi)=>{
        const {type,cate} = obj
        try {
            const product = await axios.get(`/api/products?cate=${cate}`);
            const { data } = product;
            return thunkApi.fulfillWithValue({type,data})
          } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
          }
    }
)





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


export const gallery = createSlice({
    name:"productGallery",
    initialState:galleryState,
    reducers:{
        getProducts(state,action){
         
            const {values} = action.payload;
            let max_price = values.map((item)=>{ return item.price});
            let min_price = values.map((item)=>{ return item.price})

            max_price = Math.max(...max_price);
            min_price = Math.min(...min_price);
           
            state.allProducts = action.payload ;

            state.filteredProducts = action.payload;
             state.filters = {...state.filters,max_price,min_price,price:min_price};

        },
        updateFilter(state,action){
         
            const {name,value}  = action.payload;
            
            state.filters[name] = value;
           
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

