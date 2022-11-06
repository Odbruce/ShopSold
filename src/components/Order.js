import styled from "styled-components";
import { useSelector } from "react-redux";
import { priceToLocaleCurrrency } from "../Utilities/priceToLocaleCurrrency";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useFireContext } from "./FirebaseContext";


const Order = ()=>{
  const totalPrice = useSelector((state)=>state.cart.totalPrice)
const navigate = useNavigate()

const {User} = useFireContext();

const checkout = ()=>{
    if(User){
        return navigate("/checkout")
    }
    return navigate("/identity/signin");
}
    return (
        <Wrapper>
            <h3>SUMMARY</h3>
            <div className="order-bill">
                <p><b>SUB-TOTAL</b></p>
                <p><b>{priceToLocaleCurrrency(totalPrice)}</b></p>
            </div>
            <div className="order-bill">
                <p><b>DELIVERY</b></p>
                <p><b>N0.00</b></p>
            </div>
            <div className="order-bill">
                <p><b>TOTAL</b></p>
                <p id="total"><b>{priceToLocaleCurrrency(totalPrice)}</b></p>
            </div>
            
            <button onClick={checkout} className="checkout">{User?"CHECK OUT":"LOGIN TO PROCEED"}</button>
        </Wrapper>
    )
}

const Wrapper = styled.section`
border:solid 1px grey;
position:sticky;
top:calc(clamp(50px,5vw,72px) + 55px);
width:25rem;
width:27.7vw;
min-width:15.75rem;
height:fit-content;
padding:1em 1em 0 1em;
transition:all .7s ease-out;
background:#E8EBEE;


    &:hover{
        border-color:rgba(0, 0 ,0);
        cursor:pointer;
    }

    h3{
        padding-bottom:1em;
        font-size:clamp(1.375rem,calc(1.389vw + 4px),1.6rem);
        border-bottom:solid black 1px;
        color:#30281e;
    }
    .order-bill{
        display:flex;
        justify-content: space-between;
        margin:1em 0 1em 0;
        font-size:clamp(12px,calc(7px + 0.6vw),16px);

        p:nth-child(2){
            color:grey;
        }
        #total{
            color:green 
        }
    }
    .checkout{
        width:100%;
        // height:3em;
        padding:min(2vw,1em);
        font-size:clamp(12px,calc(7px + 0.6vw),16px);
        font-size:medium;
        border:none;
        margin-bottom:1em;
        color:white;
        letter-spacing: 2px;
        background:rgb(0, 0, 0,0.8);
        transition:.7s ease-in;

        &:hover{
            background:rgb(0, 0, 1,.9);
        }
    }
`

export default Order;
