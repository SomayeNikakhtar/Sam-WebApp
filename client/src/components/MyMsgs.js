import styled from "styled-components";
import { RiAdvertisementFill,  } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import pic from "../assets/house.jpg"


const MyMsgs=()=>{
    const History=useHistory()
    return(
        <Wrapper>
            <Wrapper2>
                <Titre>All Messages</Titre>
            </Wrapper2>
            <Msg>
                <Title> westmout- 3-1/2 - blah blah</Title>
                <Image src={pic}></Image>
            </Msg>
        </Wrapper>
    )
}
export default MyMsgs;

const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 70%;
    margin-left: 70px;
    
`;
const Wrapper2= styled.div`
    display: flex;
    justify-content: space-between;
    border: none;
    border-radius: 4px;
    margin-top: 40px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    
    
`;
const Titre= styled.div`

`;
const Msg= styled.div`
    display: flex;
    justify-content: space-between;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
`;

const Icons=styled.div`
    cursor: pointer;
        &:hover {
    
        }
`
const AdIcon=styled(RiAdvertisementFill)`
    cursor: pointer;
    color: blue;

`
const PlusIcon= styled(AiOutlinePlus)`
    cursor: pointer;
    color: blue;
    
`
const Title=styled.div`
    align-self: center;
`;
const Image=styled.img`
    width: 90px;
`;