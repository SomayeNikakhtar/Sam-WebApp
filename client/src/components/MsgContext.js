const { createContext, useState} = require("react");

export const MsgContext=createContext(null)
export const MsgProvider=({children})=>{
    const [myConversations, setMyConversations]= useState(null)
    const [MyMsgs, setMyMsg]=useState([])
    
    

    const sendMsg=(message)=>{
        return fetch("/api/sendMessage",{
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

    
    const fetchConversations=(date)=>{
        fetch("/api/myConversations", {
            method: 'POST',
                body: JSON.stringify({date:date}),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
        })
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> {
            const obj={};
            if (res.data.length==0){
                setMyConversations(res.data)
                return;
            }
            console.log(res.data)
            myConversations?.forEach((el)=>obj[el._id]=el)
            
            res.data.forEach((el)=>obj[el._id]=el)
            const newConversations = Object.values(obj).sort((a,b)=>{
                return new Date(b.date) - new Date(a.date);
            })
            setMyConversations(newConversations)
        })
        .catch(err=>console.error(err))
    
    }
    
    const getMyConversations=()=>{
        // console.log(myConversations)
       if (myConversations===null)
        fetchConversations();
    }

    const clearMessages= () =>{
        MyMsgs.splice(0, MyMsgs.length)
        setMyMsg([]);
    }

    const fetchMessages=(id, date)=>{
        fetch(`/api/myConversations/${id}`,{
        method: 'POST',
            body: JSON.stringify({date:date}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> {
            // console.log(res.data)
            setMyMsg([...MyMsgs, ...res.data])

        })
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
                clearMessages

            }}>
            {children}    
        </MsgContext.Provider>
    )
}