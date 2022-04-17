import styled from "styled-components";
import { RiAdvertisementFill,  } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";


const MyAds=()=>{
    const History=useHistory()
    const [myAdDetails, setMyAdDetails]=useState(null)
    useEffect(() => {
        fetch("/api/myAds")
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> setMyAdDetails(res.data))
        .catch(err=>console.error(err))
    },[])

    const deleteAd=(id, ind)=>{
        fetch(`/api/deleteAd/${id}`,{
            method: 'DELETE',
            })
            .then(res=>{
                if (res.ok) {
                    return res.json();
                }
                throw Error(res.statusText);
            })
            .then((json) => {
                console.log(json);
                myAdDetails.splice(ind, 1)
                setMyAdDetails([...myAdDetails])
        }).catch(err=>{
                console.log(err)
        })
    }

    if(!myAdDetails) return<></>
    return(
        <Wrapper>
            <Wrapper2>
                <Titre>All Ads</Titre>
                <Icons onClick={()=>History.push('/new')}>
                    <PlusIcon size="25"/>
                    <AdIcon size="25" />
                </Icons>
            </Wrapper2>
            {myAdDetails.map((el, ind)=>{
                return(
                    <Ad key={el._id}>
                        <Title>{el.title}</Title>
                        <EditIcon size="20"/>
                        <DeleteIcon size="20" onClick={()=>deleteAd(el._id, ind)}/>
                        <Image src={el.images[0]}></Image>

                    </Ad>
                )
            }

            )}
            
        </Wrapper>
    )
}
export default MyAds;

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
`;
const Ad= styled.div`
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
    font-size: 18px;
`;
const Image=styled.img`
    width: 90px;
`;
const DeleteIcon=styled(AiOutlineDelete)`
    align-self: center;
    cursor: pointer;
`
const EditIcon=styled(BiEdit)`
    align-self: center;
    cursor: pointer ;
`