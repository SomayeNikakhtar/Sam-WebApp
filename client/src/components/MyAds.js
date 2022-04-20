import styled from "styled-components";
import { RiAdvertisementFill,  } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import TimeAgo from 'javascript-time-ago';
import Loader from "./Loader";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const MyAds=()=>{
    const timeAgo = new TimeAgo('en-US')
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
    const ConfirmDelete = (id, ind) => {

        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to do this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteAd(id, ind)
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      }


    if(!myAdDetails) return<Loader></Loader>
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
                    <>
                    <Ad key={el._id} onClick={()=>{History.push(`/advertisement-details/${el._id}`)}}>
                        <Title>
                        <Title>{el.title}</Title>
                        <Time>{timeAgo.format(new Date(el.date), 'round-minute')}</Time>
                        <div>
                            <EditIcon size="20" onClick={(ev)=>{
                                ev.stopPropagation();
                                History.push("/under-construction")
                            }}/>
                            <DeleteIcon size="20" onClick={(ev)=>{
                                ConfirmDelete(el._id, ind)
                                ev.stopPropagation();
                            }}/>
                        </div>
                        </Title>
                        <Image src={el.images[0]}></Image>
                        
                    </Ad>
                    
                    </>
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
    color: var(--text-color);
`;
const Ad= styled.div`
    display: flex;
    justify-content: space-between;
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    margin-bottom: 5px;
    color: var(--primary-color);
    cursor: pointer;
    
`;

const Icons=styled.div`
    cursor: pointer;
`;
const AdIcon=styled(RiAdvertisementFill)`
    cursor: pointer;
    color: blue;
`;
const PlusIcon= styled(AiOutlinePlus)`
    cursor: pointer;
    color: blue;
`;
const Title=styled.div`
    align-self: center;
    font-size: 18px;
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
    &:hover{
        background-color: var( --hover-color);
    }
`;
const EditIcon=styled(BiEdit)`
    align-self: center;
    cursor: pointer ;
    &:hover{
        background-color: var( --hover-color);
    }
`;
const Time=styled.p`
    color: #aaa;
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const FlexDiv= styled.div`
    display: flex;
    flex-direction: column;
`