import styled from "styled-components";
import { useMatch } from "react-router-dom";
import { motion } from "framer-motion";
import {BsFacebook,BsInstagram,BsTwitter,BsSnapchat} from "react-icons/bs"

const Footer = ()=>{
  const matchshop = useMatch("/shop");

    return (
        <Wrapper  initial={{opacity:0}}animate={{opacity:!matchshop?1:0}} transition={{delay:1}} className="footer">
            <ul>
                <li><BsFacebook/></li>
                <li><BsInstagram/></li>
                <li><BsTwitter/></li>
                <li><BsSnapchat/></li>
            </ul>
            <h5>COPYRIGHT &copy; 2022 SHOPSOLD</h5>
        </Wrapper>
    )
}
 export default Footer;

 const Wrapper = styled(motion.section)`
    display:grid;
    place-items: center;
    height:120px;
    width:80vw;
    margin:10% auto 20px;
    color:#30281e;
    background:#94a48e;
    padding:10px;
    
    @media (max-width:768px){
        width:initial;
        margin:0;
    }
     ul{
      width:max(25%,10rem);
      display:flex;
      justify-content:center;
      gap:1rem;
    
     li{
      border-radius:50%;
      width:2em;
      height:2em;
      line-height:2em;
      text-align:center;
      display:flex;
      justify-content:center;
      align-items:center;
      background:#30281e;
      color:white;
    }}`