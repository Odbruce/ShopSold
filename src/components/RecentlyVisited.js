import React from "react";
import styled from "styled-components";
import {ImCancelCircle} from "react-icons/im"

const RecentlyVisited = () => {
  return (
    <Wrapper>
      <h2>RECENTLY VISITED</h2> <ImCancelCircle className="cancel"/>
      <section className="recently_visited">
        <div className="visited"></div>
        <div className="visited"></div>
        <div className="visited"></div>
        {/* <div className="visited"></div> */}
      </section>
    </Wrapper>
  );
};

export default RecentlyVisited;

const Wrapper = styled.section`
  margin: 1vw 0 10vw;
  // background:red;
  padding:0 7.5vw 0 7.5vw;
  position: relative;

  &:hover .cancel {
    opacity: 1;
  }
  h2 {
    letter-spacing: 1px;
  }
  .cancel {
    position: absolute;
    color: rgb(0, 0, 0, 0.8);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    top: 2vw;
    right: 5vw;
  }
  .recently_visited {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    display:flex;
    flex-wrap:wrap;
    place-content: left;
    gap: 0.3rem;
    margin:2vw 0 ;
    // background:red;

    .visited {
      // height: 40vh;
      // height:clamp(150px,50vw,300px);
      height:min(48.3vw,300px);
      aspect-ratio:3/4;
      background: #94a48e;
    }
  }
`;
