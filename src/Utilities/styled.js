// import react from "react";
import styled from "styled-components";



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
        h2 {
          font-family: "Segoe UI" san-serif;
          font-size: clamp(24px, calc(2.22vw + 8px), 32px);
          line-height: max(30px, 2.92vw);
          letter-spacing: 1px;
          text-align: left;
          width: max(350px, 35vw);
          span {
            &:nth-of-type(1) {
              color: #db9224;
            }
            &:nth-of-type(2) {
              background: #a8a98e;
              color: whitesmoke;
            }
          }
        }
        .newletter {
          align-self: center;
          display: inherit;
          flex-direction: column;
          align-items: center;
          width: max(350px, 35vw);
          gap: 1vw;
    
          input {
            margin-top: 1vw;
            width: 100%;
            height: 2vw;
            font-size: clamp(12px, calc(7px + 0.8vw), 16px);
            background: none;
            border: 2px solid transparent;
            border-bottom: 2px solid grey;
            transition: 0.4s ease-in-out all;
            padding: max(5px, 0.4vw);
    
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

      export {Advertise};