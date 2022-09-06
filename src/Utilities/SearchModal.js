import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

export const SearchModal = () => {

    useEffect(()=>{
        document.body.style.overflow="hidden";
    },[])
  return (
    <Wrapper>SearchModal</Wrapper>
  )
}

const Wrapper = styled.div`
position:absolute;
width:100%;
height:100%;
display:flex;
justify-content:center;
z-index:20;
// backdrop-filter:blur(3px);
`