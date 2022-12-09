import React,{useState} from 'react'
import styled from 'styled-components';

const AdvertNewsLetter = () => {

  const [isrequested, setIsRequest] = useState(false);


  return (
    <Advertise>
        <div className={`issuccessModal ${isrequested ? "success" : null}`}>
        <p>Subscription Successful!</p>
      </div>
    <h2>
      New to <span>Shop</span>
      <span>Sold</span> ? Sign up to enjoy 10% off your first order
      (excluding sale styles).
    </h2>
    <form onSubmit={(e) => {
    e.preventDefault();
    setIsRequest(true);
    document.getElementById("news").value="";
    return setTimeout(() => {
      setIsRequest(false);
    }, 3000
    );
  }} className="newletter">
      <p>
        Sign up to receive exclusive updates on our new collections and
        special offers. To improve your experience we may; profile,
        segment, test, analyse and model your details. You can
        unsubscribe at any time via the link in your emails. Please
        refer to our Privacy Policy for further details.
      </p>
      <input placeholder="newsletter" type="email" required name="email" id="news"/>
    </form>
  </Advertise>
  )
}

export default AdvertNewsLetter


const Advertise = styled.div`
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 5vw 0;
        margin-top: 5vw;
        margin-bottom:5vw;
        display: flex;
        flex-wrap: wrap;
        gap: 15vw;
        justify-content: center;


        .issuccessModal {
            position: fixed;
            font-family: "Segoe UI";
            font-size: clamp(9px, calc(7px + 0.5vw), 16px);
            box-shadow:0px 2px 10px 1px rgba(0,0,0,0.2);
            color: green;
            letter-spacing: 1px;
            z-index: 5;
            right: 0;
            left: 0;
            top: 50px;
            opacity: 0;
            margin: 0 auto;
            width: max(20vw, 150px);
            background: whitesmoke;
            padding: 1vw;
            transition:  0.5s;
            transition-property: opacity top;
            font-weight:500;
            color:var(--font_pri);

            p{
                text-align:center;
            }
          }
          
          .success {
            top: 10px;
            opacity: 1;
          }


        h2 {
          font-family: "Segoe UI" san-serif;
          font-size: clamp(24px, calc(2.22vw + 8px), 32px);
          line-height: max(30px, 2.92vw);
          letter-spacing: 1px;
          text-align: left;
          width: max(350px, 35vw);
          span {
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;

            &:nth-of-type(1) {
              color: var(--bg_org);
            }
            &:nth-of-type(2) {
              background: #a8a98e;
              color: whitesmoke;
            }
          }
        }
        .newletter {
          display: inherit;
          flex-direction: column;
          width: max(350px, 35vw);
          gap: 1vw;
    
          input {
            margin-top: 1vw;
            width: 100%;
            height: 2vw;
            height:max(2vw,1.7rem);
            background: none;
            border:transparent;
            border-bottom: 2px solid grey;
            padding: max(8px, 1vw);
            color:var(--font_pri);
            letter-spacing:1px;
            font-size: clamp(9px,calc(10px + 0.5vw),16px);
            
            &:focus {
              outline: none;
              background:whitesmoke;
              border: 2px solid #78aaff;
              border-radius: 3px;
              }
            }
          }
          p {
            text-align: left;
            width: 100%;
            font-size: 12px;
            justify-self: center;
    
            @media (max-width: 768px) {
              display: none;
            }
          }
        }
      
      `