import { createSlice } from "@reduxjs/toolkit";


const cartState = {
    cart:JSON.parse(localStorage.getItem("cart"))||[],
    totalPrice:"",
    totalProducts:0,
    isCartOpen:false,
    cartProps:{
        color:"",
        size:"",
        quantity:1
    }
}

export const cart = createSlice({
    name:"Cart",
    initialState:cartState,
    reducers:{
        inputHandler(state,action){

            const {name,value} = action.payload;
            state.cartProps[name] = value;
        },
        updateCart(state,action){
            const {name,price,cate,type,id:productId,image,quantity,color,size} = action.payload;

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
    
                state.cart = cart;
                state.totalPrice = price;
                state.totalProducts = products;

                 return;
            }

            state.cart = [...cart,{name,cate,type,image,price,quantity,color,size,id}]
        },
        cartOpen(state,action){
            state.isCartOpen = action.payload;
        },
        clearCart(state){
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

            state.totalPrice = price;
            state.totalProducts = products;
        }
    }
})
