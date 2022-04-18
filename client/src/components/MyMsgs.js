import styled from "styled-components";
import { RiAdvertisementFill,  } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import pic from "../assets/house.jpg"
import { useContext, useEffect } from "react";
import { MsgContext } from "./MsgContext";


const MyMsgs=()=>{
    const History=useHistory()
    const {fetchConversations, myConversations, } = useContext(MsgContext)
    useEffect(() => {
        fetchConversations()
    },[])

    if (!myConversations) return <></>
    return(
        <Wrapper>
            <Wrapper2>
                <Titre>All Messages</Titre>
            </Wrapper2>
            {myConversations.map((el, ind)=>{
                return(
                    <Msg key={el._id} to={`/my-messages/${el._id}`}>
                        <div>
                            <Title>{el.title}</Title>
                            <p>{el.msgPrev}</p>
                            <p>{el.date}</p>
                        </div>
                        {/* <DeleteIcon size="20" /> */} 
                        <Image src={el.image}></Image>
                    </Msg>
                )
            })}
            
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
const Msg= styled(Link)`
    display: flex;
    justify-content: space-between;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    text-decoration: none;
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
const DeleteIcon=styled(AiOutlineDelete)`
    align-self: center;
    cursor: pointer;
`