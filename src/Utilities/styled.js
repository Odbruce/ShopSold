import styled, { keyframes } from "styled-components";
import {motion} from "framer-motion";


      export const HeartIcon = styled.div`
        position: absolute;
        top:${(prop)=>(prop.top?"-1.5rem":"2%")};
        color: #453f39;
        right: ${(prop)=>(prop.right?"0.9rem":"3%")};
        z-index: 1;
        cursor: pointer;
        `;

      export const PrevNext = styled(motion.div)`
        position:absolute;
        height:100%;
        width:100%;

        .prevnext{
          position:absolute;
          display: flex;
          background: #f0f0f0;
          height:4rem;
          width:10rem;
          top:150%;
          border-${(prop)=>(prop.direction)}:solid 3px var(--bg_org);
          padding:${(prop)=>(prop.direction==="right"?"0 0 0 0.2vw":"0 0.2vw 0 0")};
          gap: 0.5rem;
          box-shadow: 0px 3px 9px 1px rgb(0,0,0,0.2);
          ${(prop) => prop.direction}:-50%;
          justify-content:${(prop) => prop.direction==="right"?"flex-end":null} ; 
          text-align:${(prop) => prop.direction==="right"?"end":null};

          @media (max-width:750px){
            display:none;
          } 
        
          img {
            width:3.41vw;
            object-fit:cover;
          }
          .prop_name {
            padding:0.8vw 0;
            display:flex;
            flex-direction:column;
            justify-content:space-around;
            h2 {
              font-family: "poppins", sans-serif;
              text-transform:uppercase;
              font-size: clamp(9px,calc(.9vw + 5px),12px);
              letter-spacing: .5px;
              font-weight: 400;
                // margin-bottom: 1rem;
            }
            h3 {
              font-size: 1.3rem;
              font-size:calc(9px + 1vw);
              font-size:clamp(7px,calc(.9vw + 9px),14px);
              color:green;
            }
          }

        
        }


        .leave{
          opacity:0;
        }
`
        const slide = keyframes`
        to{
          transform: translateX(-100%);
        }`
        export const DiscountStyled = styled.div`
          display: grid;
          grid-template-columns: repeat(3,1fr);
          justify-items: center;
          align-items: center;
          position:relative;
          z-index:1;
          background:var(--bg_org);
          padding:0 1vw;
          height:50px;
          font-size:clamp(10px,calc(8px + .7vw),24px);

         
          
        
        button{
          border:none;
          background:transparent;
          font-size:clamp(9px, calc(7px + 0.5vw), 16px);
          white-space: nowrap;
        }
        
        .button{
          font-size:clamp(8px, calc(7px + 0.4vw), 16px);
          border:2px solid black;
          color:var(--font_pri);
          text-decoration: none;
          font-weight: 500;
          padding:0.44vw 1.11vw;
          outline: none;
        }
        .discount-close{
          position:absolute;
          top:1vw;
          cursor:pointer;
          right:1vw;
        }
        
        .infinite_display{
          overflow: hidden;
          position:relative;
          width:70vw;
          display: grid;
          grid-auto-columns: 100%;
          grid-auto-flow: column;

          p{
          animation: ${slide} 8s linear infinite;
          text-align:center;
          font-size:clamp(12px,calc(8px + 1vw),24px);
            
            @media(max-width:500px){
              font-size:clamp(7px,calc(4px + 1.2vw),9px);
            }
          }
        }
        
      }
        `