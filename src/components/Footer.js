import styled from "styled-components";
import { useMatch,Link } from "react-router-dom";
import { motion } from "framer-motion";
import {BsFacebook,BsInstagram,BsTwitter,BsSnapchat} from "react-icons/bs"

const Footer = ()=>{
  const matchshop = useMatch("/shop");

    return (
        <Wrapper id="contact" initial={{opacity:0}}animate={{opacity:!matchshop?1:0}} transition={{delay:1}} className="footer">
            <ul>
                <li> <Link to="/" className="social"><BsFacebook/></Link> </li>
                <li><Link to="/" className="social"><BsInstagram/></Link> </li>
                <li><Link to="/" className="social"><BsTwitter/></Link> </li>
                <li><Link to="/" className="social"><BsSnapchat/></Link> </li>
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
    
     .social{
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