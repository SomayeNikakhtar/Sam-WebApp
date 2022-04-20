import styled from "styled-components";
import { RiAdvertisementFill,  } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { MsgContext } from "./MsgContext";
import TimeAgo from 'javascript-time-ago';

const MyMsgs=()=>{
    const timeAgo = new TimeAgo('en-US')
    const {fetchConversations, myConversations, } = useContext(MsgContext)
    useEffect(() => {
        fetchConversations()
    },[])

    const updateConversations=()=>{  // fetch new messages which are after the last message
        // console.log(MyMsgs)
        const date = myConversations.length > 0 ? myConversations[myConversations.length-1].date : undefined
        if (date)
            fetchConversations(date)
    }
    useEffect(() => {// run whenver MyMsgs change
        const IntervalId= setInterval(updateConversations, 2000);
        return ()=> {clearInterval(IntervalId)}
    }, [myConversations])


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
                            <MsgPrev>{el.msgPrev}</MsgPrev>
                            <Time>{timeAgo.format(new Date(el.date), 'round-minute')}</Time>
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
    font-weight: bold;
    font-size: 20px;
    color: var(--text-color);
`;
const Msg= styled(Link)`
    display: flex;
    justify-content: space-between;
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    text-decoration: none;
    margin-bottom: 5px;
    color: var(--primary-color);
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
    font-weight: bold;
`;
const Image=styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 3px;
`;
const DeleteIcon=styled(AiOutlineDelete)`
    align-self: center;
    cursor: pointer;
`
const MsgPrev=styled.p`
    color: var(--text-alter);
    margin-top: 7px;
`
const Time=styled.p`
    color: #aaa;
    font-size: 15px;
    margin-top: 10px;
`