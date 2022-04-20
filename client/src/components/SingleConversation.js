import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect, useRef } from "react";
import { MsgContext } from "./MsgContext";
import TimeAgo from 'javascript-time-ago';
import { UserContext } from "./UserContext";


const SingleConversations=()=>{
    
    const timeAgo = new TimeAgo('en-US')
    const History=useHistory()
    const {fetchMessages, MyMsgs, myConversations, getMyConversations, sendMsg, clearMessages} = useContext(MsgContext)
    const {myInfo}=useContext(UserContext)
    const textareaRef = useRef()
    
    const {id}= useParams()
    
    const thisConversation= myConversations?.find((el)=>el._id===id)

    

    useEffect(() => { //run once
        getMyConversations()
        clearMessages()
        fetchMessages(id)
        
    },[])

    const updateMessages=()=>{  // fetch new messages which are after the last message
        // console.log(MyMsgs)
        const date = MyMsgs.length > 0 ? MyMsgs[MyMsgs.length-1].date : undefined
        if (date)
            fetchMessages(id, date)
    }
    useEffect(() => {// run whenver MyMsgs change
        const IntervalId= setInterval(updateMessages, 2000);
        return ()=> {clearInterval(IntervalId)}
    }, [MyMsgs])


    if (!MyMsgs || !thisConversation || !myInfo ) return <></>
    
    
    const receiver=myInfo._id===thisConversation.user1  ? thisConversation.user2 : thisConversation.user1

    return(
        <Wrapper>
            <Wrapper2>
                <Image src={thisConversation.image}></Image>
                <Titre>{thisConversation.title}</Titre>
            </Wrapper2>
            <MsgBox >
                {MyMsgs.map((el, ind)=>{
                    return(
                        <>
                        <div>
                            {el.sender===receiver?  
                                <>
                                    <Msg>{receiver} : {el.content}</Msg> 
                                    <Time>{timeAgo.format(new Date(el.date), 'mini-minute-now')}</Time>
                                </> :
                                <Right>
                                    <Msg2>{el.content}</Msg2> 
                                    <Time>{timeAgo.format(new Date(el.date), 'mini-minute-now')}</Time>
                                </Right>}
                            
                            
                        </div>
                        
                        </>
                    )
                })}
            </MsgBox>
            <FlexDiv>
                <Textarea ref={textareaRef} placeholder="Type a message..." rows="3"></Textarea>
                <Send onClick={()=>
                    {
                        sendMsg({receiver: receiver, content: textareaRef.current.value, adId:thisConversation.adId})
                        textareaRef.current.value=""
                    }}>send</Send>
            </FlexDiv>
        </Wrapper>
    )
}
export default SingleConversations;

const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 70%;
    margin-left: 70px;
    color: var(--text-color);
    
`;
const Wrapper2= styled.div`
    display: flex;
    /* justify-content: space-between; */
    border: none;
    border-radius: 4px;
    margin-top: 40px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    
    
`;
const Titre= styled.div`
    margin-left: 15px;
    align-self: center;
    font-weight: bold;
`;
const MsgBox= styled.div`
    display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    text-decoration: none;
   
    height: 500px;
    overflow-y: scroll
`;

const Msg=styled.div`
    /* align-self: center; */
    border: 1px solid var(--gray-color);
    background-color: var(--gray-color);
    display:inline-block ;
    padding: 10px;
    border-radius: 5px;
`;
const Msg2=styled.div`
    /* align-self: center; */
    /* text-align: right; */
    border: 1px solid var(--hover-color);
    background-color: var(--hover-color);
    display:inline-block ;
    padding: 10px;
    border-radius: 5px;

    
`;

const Right=styled.div`
    text-align: right;
`
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
const Textarea= styled.textarea`
    width: 100%;
    border: none;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    margin-bottom: 10px;
    resize: none;

`
const FlexDiv=styled.div`
    display: flex;
`
const Send=styled.button`
    background-color: var(--text-alter);
    color: var(--gray-color);
    border: none;
    cursor: pointer;
    margin-bottom: 10px;

`
const Time=styled.p`
    color: #bbb;
    font-size: small;
    margin-bottom: 10px;
`
