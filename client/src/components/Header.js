import { useContext } from "react";
import { Link,  useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/Sam.png";
import { UserContext } from "./UserContext";
import { AiOutlineMenu,  } from "react-icons/ai";


const Header= ()=>{
    const History = useHistory();
    const {myInfo, setMyInfo} = useContext(UserContext)
    const doSignOut= ()=>{
        fetch("/api/signOut",{
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then(res=>{
                if (res.ok) {
                    return res.json();
                }
                throw Error(res.statusText);
            })
            .then((json) => {
                console.log(json);
                setMyInfo(null)
                History.push("/");
        }).catch(err=>{
                console.log(err)
        })
    }


    // if (!myInfo) return<></>
    return(
        <HeadWrapper>
            <NavSection>
                <HomeButton onClick={() => History.push("/")}>
                    <Logo src={logo} />
                </HomeButton>
                <RightSide>
                { myInfo &&
                    <DropDown>
                        <Dropcheck id="dropcheck" type="checkbox"  onBlur={
                            (ev)=> {
                                window.setTimeout(()=>{
                                    ev.target.checked=false
                                }, 100)
                                }
                            }/>
                        <DropBtn for="dropcheck" > <AiOutlineMenu/> {myInfo.name} </DropBtn>
                        <Content>
                            <Link to="/my-ads" >My Ads</Link>
                            <Link to="/my-messages">My Messages</Link>
                            <Link to="/my-favorites">My Favorites</Link>
                            <Link to="#" onClick={()=>doSignOut()}>Sign Out</Link>
                        </Content>
                    </DropDown>}
                    { !myInfo &&
                        <>
                        <SignAction to={"/sign-up"}>Sign Up</SignAction> 
                        <Or>or </Or>
                        <SignAction to={"/sign-in"} > Sign In</SignAction>
                        </>
                    }   

                        <PostAd onClick={()=> {
                            if (myInfo)
                                History.push("/new")
                            else
                            History.push("/sign-in")    
                                }}>Post ad</PostAd>
                        
                    
                </RightSide>

            </NavSection>
        </HeadWrapper>
    )
}
export default Header;

const HeadWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-height: 80px;
    background-color: var(--primary-color);
    color: var(--gray-color);
`;
const NavSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

`;
const HomeButton = styled.button`
    background: none;
    border: none;
    margin-left:10px ;
    :hover {
        cursor: pointer;
    }
`;
const Logo = styled.img`
    width: 90px;
`;
const SignAction= styled(Link)`
    color: var(--gray-color);
    text-decoration: none;
    margin-right: 10px;
    margin-left: 5px;
    align-self: center;
    &:hover{
        color: var(--hover-color);
    }

`;
const RightSide=styled.div`
    font-weight: bold;
    display: flex;
`;


const DropDown=styled.div`
    position: relative;
    display: inline-block;
`;

const Content=styled.div`
    display: none;
    position: absolute;
    background-color: var(--gray-color);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    a{
        color: var(--primary-color);
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        &:hover{
            background-color: var(--hover-color);
        }
    }

`;

const PostAd=styled.button`
    margin-right: 10px;
    margin-left: 20px;
    background-color: var(--gray-color);
    color: var(--primary-color);
    padding: 5px;
    border: 1px solid var(--primary-color);
    border-radius: 1000px;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        background-color: var(--hover-color);
    }
`
const DropBtn=styled.label`
    background-color: var(--gray-color);
    color: var(--primary-color);
    padding: 8px;
    border: 1px solid var(--primary-color) ;
    border-radius: 1000px;
    position: relative;
    display:block;
    cursor:pointer;
`
const Dropcheck= styled.input`
    position: absolute;
    left: -9999px;
    &:checked ~ ${Content}{
        display: block;
    }
    &:checked + ${DropBtn} {
        background-color: var(--hover-color);
    }
   
`
const Or=styled.div`
    color: var(--gray-color);
    text-decoration: none;
    margin-right: 10px;
    margin-left: 5px;
    align-self: center;
`