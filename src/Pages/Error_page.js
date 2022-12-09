import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Error_page = () => {
  return (
    <Wrapper className="err_loading">
      <img className="error_img" src={require("../Media/page_not_found.png")} />
    <div className="err_p">
      <p >hmm something went wrong ...page not found.</p>
      <Link className="err_link" to="/" replace >Go Home</Link>
    </div>
  </Wrapper>
  )
}

export default Error_page

const Wrapper = styled.div`
  display:flex;
  align-items:center;
  flex-direction:column;
  min-height:80vh;
  cursor: pointer;
  letter-spacing:2px;
  color:grey;
  font-size:clamp(12px,calc(7px + 0.8vw),16px);
  
  
  
  .error_img{
    width:max(30%,250px);
    aspect-ratio:1/1;
    object-fit:contain;
  }
  
  .err_p{
    display:grid;
    place-items:center;
    gap:1em;
    
    .err_link{
      font-size:  clamp(16px,calc(1.71vw + 4px),20px);
      font-family:'Segoe UI', 'Roboto';
      font-weight:500;
      color: #353b43;
      text-decoration:none;



      &:hover{
        text-decoration:underline;
      }
    }
  }

`