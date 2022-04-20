import styled from "styled-components";
import SamLogo from "../assets/Sam.png"
import { AiFillInstagram,  } from "react-icons/ai";
import { BsTwitter , BsFacebook } from "react-icons/bs"
import {ReactComponent as AppStore} from '../assets/app_store_badge.svg'; 
import {ReactComponent as PlayStore} from '../assets/play_store_badge.svg'; 



const Footer = () => {
  return (
    <FootWrap>
        <FlexDiv>
            <Logo src={SamLogo} />
            <Copyright>© 2022 Sam Inc. {""}</Copyright>
            <FlexDiv2>
            <BsFacebook />
            <BsTwitter/>
            <AiFillInstagram/>
            </FlexDiv2>
        </FlexDiv>
        <FlexDiv>
            <P>Company</P>
            <Option>About Us</Option>
            <Option>Blog</Option>
        </FlexDiv>
        <FlexDiv>
            <P>Support</P>
            <Option>Terms and Condition</Option>
            <Option>Contact Us</Option>
        </FlexDiv>
        <FlexDiv>
            <P>Privacy Policy</P>
            <Option>Privacy Policy</Option>
            <Option>Notice of Collection</Option>
        </FlexDiv>
        <FlexDiv2>
            <App/>
            <PlayStore/>
        </FlexDiv2>
      
      
    </FootWrap>
  );
};

const FootWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--primary-color);
  color: var(--gray-color);
  min-height: 110px;
`;

const Copyright = styled.div`
  margin-bottom: 10px;
`;


const P=styled.button`
  padding: 0 25px 0 25px;
  color: var(--hover-color);
  background: none;
  border: none;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
  :hover {
    cursor: pointer;
  }
`
const Option = styled.button`
  padding: 0 25px ;
  color: var(--gray-color);
  background: none;
  border: none;
  height: 25px;
  text-align: left;
  :hover {
    color: var(--hover-color);
    cursor: pointer;
  }
`;
const Logo = styled.img`
  width: 60px;
  margin-bottom: 15px;
`;
const FlexDiv=styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;
const FlexDiv2=styled.div`
    display: flex;
    margin-right: 10px;
    justify-content: space-between;
    
`;
const App=styled(AppStore)`
  margin-right: 30px;
`

export default Footer;
