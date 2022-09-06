import styled from "styled-components";
import { useMatch } from "react-router-dom";
import { motion } from "framer-motion";


const WhatYouMightLike = () => {
  const matchshop = useMatch("/shop");

  return (
    <Wrapper  className="cover">
      <h2>Things you may like</h2>
      <div className="WhatYouMightLike">
        <div className="wed red">
          <div>
            <h4>
              Lorem ipsum dolor sit 
            </h4>
          </div>
        </div>
        <div className="wed blue">
          <div>
            <h4>
              Lorem ipsum dolor sit 
              
            </h4>
          </div>
        </div>
        <div className="wed grey">
          <div>
            <h4>
              Lorem ipsum dolor sit 
              
            </h4>
          </div>
        </div>
        <div className="wed purple">
          <div>
            <h4>
              Lorem ipsum dolor sit 
            </h4>
          </div>
        </div>
        <div className="wed black">
          <div>
            <h4>
              Lorem ipsum dolor sit               
            </h4>
          </div>
        </div>
        <div className="wed pink">
          <div>
            <h4>
              Lorem ipsum olor sit               
            </h4>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WhatYouMightLike;

const Wrapper = styled.section`

  text-align:start;
  width:fit-content;
  margin:1em auto 2rem;
  // background:blue;
  h2{
    font-size:clamp(1.375rem,calc(1.389vw + 4px),1.6rem);

  }

.WhatYouMightLike{
  margin:1em auto 0;
  position:relative;
  height:450px;
  width: 850px;
  width:950px;
  width:65.97vw;
  width:min(75vw,950px);
  height:max(45vh,450px);
  height:clamp(320px,50vw,450px);
  display:flex;
  gap:.3em;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  overflow: auto;
  scrollbar-width: none; 

  &::-webkit-scrollbar{
    display:none;
  }
}

.wed {
  // background:purple;
  div {
    width:350px;
    width:24.3vw;
    width:min(30vw,350px);
    scroll-snap-align:start;
    position:fixed;
    background: #94a48e; 
    position:relative;
    height:400px;
    height:max(34.44vh,400px);
    transition:all ease-out .2s;
    padding:.3rem;
    /* transform-origin: center center; */
    // height:400px;
    height:clamp(200px,50vw,400px);
   
  //  &:hover{
  //     /* transform:scale(.98); */
  //     width: 343px;
  //     width:23.82vw;
  //     width:min(29.5vw,343px);
  //     height: 450px;
  //     height:max(40vh,450px);
  //     height:clamp(220px,50vw,450px);
  
  //   }
   h4{
      position:absolute;
      font-size:calc(8px + 1vw);
      color:#E8EBEE;
      color:black;
      padding:0 0 0 5%;
      bottom:10%;
      text-align:start;
    }
  }

}


`
