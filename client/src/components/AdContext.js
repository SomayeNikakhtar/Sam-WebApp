const { createContext, useState, useEffect } = require("react");

export const AdContext=createContext(null)
export const AdProvider=({children})=>{
    const [ads, setAds]=useState([])
    const fetchAds=(filters)=>{
        fetch("/api/ads",{
            method: 'POST',
            body: JSON.stringify(filters),
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
                setAds(json.data)
        }).catch(err=>{
                console.log(err)
        })
    }


    useEffect(()=>{
        fetchAds()    
    },[])
    return(
        <AdContext.Provider
            value={{
                setAds,
                ads,
                fetchAds,
            }}>
            {children}    
        </AdContext.Provider>
    )
}