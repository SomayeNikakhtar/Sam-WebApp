import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Slideshow from "./Slideshow";
import { FiShare2,  } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";

import MapModal from "./MapModal";


const AdDetails= ()=>{
    const [adDetails, setAdDetails]=useState(null)
    const [showMap,setShowMap]=useState(false)
    const History = useHistory();
    const {id}= useParams()


    useEffect(() => {
        fetch(`/api/adDetails/${id}`)
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> setAdDetails(res.data))
        .catch(err=>console.error(err))
    },[])
    console.log(adDetails)

    

    if (!adDetails) return <></>

    return(
        <Wrapper>
            <Details1>
                <div>addvertisement details</div>
                
                <FlexDiv>
                    <Title>{adDetails.title}</Title>
                    <Price>${adDetails.price}</Price>
                </FlexDiv>
                <FlexDiv2>
                    <p>{adDetails.location.city} - {adDetails.location.streetNum}  {adDetails.location.streetName} -  {adDetails.location.postalCode}</p>
                    <Map onClick={()=> setShowMap(true)}>(View On Map)</Map>
                    {showMap && <MapModal onCloseFunc={()=>setShowMap(false)} center={[adDetails.location.lat, adDetails.location.lng]} />}
                </FlexDiv2>
                <Divider />
                    <button>Contact Info</button>
                    <FiShare2></FiShare2>
                    <BsBookmark></BsBookmark>
                    
                <Divider />
                <Overview>Overview</Overview>
                <Divider />
                <Description>Description <br/>{adDetails.description}</Description>
            </Details1>
            <Details2>
                <Slideshow images={adDetails.imagesSrc}></Slideshow>
                <textarea placeholder="Your Message"></textarea>
                <button>Send message</button>
            </Details2>
            <Details3/>
        </Wrapper>
    );
}


export default AdDetails;

const Wrapper=styled.div`
display: flex;
flex-grow: 1;
padding: 20px;

/* flex-direction: column; */
`
const Details1= styled.div`
    width: 60%;
`;

const Title= styled.h2`

`;
const Price=styled.p`
`;
const FlexDiv=styled.div`
    display: flex;
    justify-content: space-between;
`;
const FlexDiv2=styled.div`
    display: flex;

`;
const Divider = styled.div`
  height: 1px;
  background: #ccc;
  margin-bottom: 15px;
`;
const Map=styled.button`
    margin-left: 5px;
    background-color: inherit;
    border: none;
    cursor: pointer;
    color: blue;
`;
const Overview= styled.div`
    height: 200px;
`;
const Description= styled.div`

`;
const Details2= styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;

`;
const Details3=styled.div`
    width: 15%;

`