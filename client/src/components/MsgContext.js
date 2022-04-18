import { useParams } from "react-router-dom";

const { createContext, useState, useEffect } = require("react");

export const MsgContext=createContext(null)
export const MsgProvider=({children})=>{
    const [myConversations, setMyConversations]= useState(null)
    const [MyMsgs, setMyMsg]=useState(null)
    
    

    const sendMsg=(message)=>{
        fetch("/api/sendMessage",{
            method: 'POST',
            body: JSON.stringify(message),
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
                setMyMsg([...MyMsgs, json.data])
                return true;
            })
            .catch(err=>{
                console.log(err)
        })
    }

    const fetchConversations=()=>{
        fetch("/api/myConversations")
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> setMyConversations(res.data))
        .catch(err=>console.error(err))
    
    }
    
    const getMyConversations=()=>{
        console.log(myConversations)
       if (myConversations===null)
        fetchConversations();
    }

    const fetchMessages=(id)=>{
        fetch(`/api/myConversations/${id}`)
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> setMyMsg(res.data))
        .catch(err=>console.error(err))
    
    }

    

    return(
        <MsgContext.Provider
            value={{
                sendMsg,
                fetchConversations,
                myConversations,
                fetchMessages,
                MyMsgs,
                getMyConversations,

            }}>
            {children}    
        </MsgContext.Provider>
    )
}