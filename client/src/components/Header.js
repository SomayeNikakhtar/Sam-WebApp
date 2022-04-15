import { useContext } from "react";
import { Link,  useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/SamLogo.png";
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
                        <Dropcheck id="dropcheck" type="checkbox"/>
                        <DropBtn for="dropcheck" > <AiOutlineMenu/> {myInfo.name} </DropBtn>
                        <Content>
                            <Link to="/my-ads">My Ads</Link>
                            <Link to="/my-messages">My Messages</Link>
                            <Link to="/my-favorites">My Favorites</Link>
                            <a onClick={()=>doSignOut()}>Sign Out</a>
                        </Content>
                    </DropDown>}
                    { !myInfo &&
                        <>
                        <SignAction to={"/sign-up"}>Sign Up</SignAction> 
                        or 
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
    /* justify-content: space-between; */
    width: 100vw;
    min-height: 60px;
    background-color: orange;
    margin: 0 auto;
`;
const NavSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

`;
const HomeButton = styled.button`
    background: none;
    height: 35px;
    width: auto;
    border: none;


    :hover {
        cursor: pointer;
    }
`;
const Logo = styled.img`
    height: 40px;
    width: auto;
    border: 0;

`;
const SignAction= styled(Link)`
    color: white;
    text-decoration: none;
    margin-right: 10px;
    margin-left: 5px;

`;
const RightSide=styled.div`
    font-weight: bold;
    /* align-self: center; */
    display: flex;
`;


const DropDown=styled.div`
    /* z-index: 1; */
    position: relative;
    display: inline-block;
`;

const Content=styled.div`
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    a{
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        &:hover{
            background-color: #ddd;
        }
    }

`;

const PostAd=styled.button`
    margin-right: 10px;
    margin-left: 10px;
`
const DropBtn=styled.label`
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
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
        background-color: #3e8e41;
    }
`