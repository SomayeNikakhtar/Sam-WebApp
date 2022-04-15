const { createContext, useState, useEffect } = require("react");

export const UserContext=createContext(null)
export const UserProvider=({children})=>{
    const [myInfo, setMyInfo]=useState(null)
    useEffect(()=>{
        fetch("api/me")
            .then(res=>{
                if (res.ok) {
                    return res.json();
                  }
                throw Error(res.statusText);
            })
            .then (res=> setMyInfo(res.user))
            .catch(err=>console.error(err))
    },[])
    return(
        <UserContext.Provider
            value={{
                setMyInfo,
                myInfo,
            }}>
            {children}    
        </UserContext.Provider>
    )
}