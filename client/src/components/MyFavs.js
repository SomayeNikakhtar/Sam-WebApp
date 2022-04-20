import styled from "styled-components";
import { RiAdvertisementFill,  } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import pic from "../assets/underconstruction.jpg"


const MyFavs=()=>{
    return(
        <Wrapper>
            {/* <Wrapper2>
                <Titre>My Favorites</Titre>
            </Wrapper2> */}
            <Msg>
                
                <Image src={pic}></Image>
            </Msg>
        </Wrapper>
    )
}
export default MyFavs;

const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 70%;
    margin-left: 70px;
    
`;
const Titre= styled.div`

`;
const Msg= styled.div`
    display: flex;
    justify-content: center;
    border: none;
    border-radius: 4px;
    margin-top: 50px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
`;

const Image=styled.img`
    z-index: -1;
`;