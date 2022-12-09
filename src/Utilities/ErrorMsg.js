import React from 'react'
import styled from 'styled-components'
import { useFireContext } from '../components/FirebaseContext'

export const ErrorMsg = () => {
  const {signError} = useFireContext()

  return (
    <Wrapper>
        <div className={`issuccessModal ${!!signError ? "success" : null}`}>
            <p>{signError}!</p>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.issuccessModal {
    position: fixed;
    font-family: "Segoe UI";
    font-size: clamp(9px, calc(7px + 0.5vw), 16px);
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
    text-align: center;
    padding: 1vw;
    box-shadow:0px 2px 10px 1px rgba(0,0,0,0.2);
    transition:  0.3s;
    transition-property: opacity top;
    font-weight:500;
    color:var(--font_pri);
   
  }

  .success {
    top: 10px;
    opacity: 1;
  }

`