import styled from "styled-components";
import SamLogo from "../assets/SamLogo.png"
import { AiFillInstagram,  } from "react-icons/ai";
import { BsTwitter , BsFacebook } from "react-icons/bs"
import {ReactComponent as AppStore} from '../assets/app_store_badge.svg'; 
import {ReactComponent as PlayStore} from '../assets/play_store_badge.svg'; 



const Footer = () => {
  return (
    <FootWrap>
        <FlexDiv>
            <Logo src={SamLogo}/>
            <Copyright>© 2022 Sam Inc. {""}</Copyright>
            <FlexDiv2>
            <BsFacebook/>
            <BsTwitter/>
            <AiFillInstagram/>
            </FlexDiv2>
        </FlexDiv>
        <FlexDiv>
            <p>Company</p>
            <Button>About Us</Button>
            <Button>Blog</Button>
        </FlexDiv>
        <FlexDiv>
            <p>Support</p>
            <Button>Terms and Condition</Button>
            <Button>Contact us</Button>
        </FlexDiv>
        <FlexDiv>
            <p>Privacy Policy</p>
            <Button>Privacy</Button>
        </FlexDiv>
        {/* <FlexDiv> */}
            <AppStore/>
            <PlayStore/>
        {/* </FlexDiv> */}
      
      
    </FootWrap>
  );
};

const FootWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* min-height: 70px; */
  background-color: orange;
  margin: 0 auto;
  /* font-family: sans-serif; */
  
  /* color: #4d4f50; */
`;

const Copyright = styled.div`
  padding-left: 50px;
`;



const Button = styled.button`
  padding: 0 25px 0 25px;
  /* font-family: sans-serif; */
  /* font-size: 1em; */
  /* color: gray; */
  background: none;
  border: none;
  height: 25px;

  :hover {
    /* color: #b0b1b1; */
    cursor: pointer;
  }
`;
const Logo = styled.img`
  height: 40px;
  width: auto;
  /* border: 0; */
  /* padding: 0 50px 0 50px; */
`;
const FlexDiv=styled.div`
    display: flex;
    flex-direction: column;
`;
const FlexDiv2=styled.div`
    display: flex;
    
`;

export default Footer;
