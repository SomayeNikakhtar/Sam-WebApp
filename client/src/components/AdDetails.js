import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Slideshow from "./Slideshow";
import { FiShare2,  } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { BiBuildingHouse, BiBath } from "react-icons/bi";
import { RiHotelBedLine } from "react-icons/ri";



import MapModal from "./MapModal";
import { AiOutlineWifi } from "react-icons/ai";


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
                <div>
                    <FlexDiv2>
                    <p>{adDetails.city} - {adDetails.stNum}  {adDetails.stName} -  {adDetails.postalCode}</p>
                    <Map onClick={()=> setShowMap(true)}>(View On Map)</Map>
                    {showMap && <MapModal onCloseFunc={()=>setShowMap(false)} center={[parseFloat(adDetails.lat), parseFloat(adDetails.lng)]} />}
                    </FlexDiv2>
                    <FlexDiv2>
                        <FlexDiv2>
                            <BiBuildingHouse size="20"/>
                            <p>{adDetails.unitType}</p>
                        </FlexDiv2>
                        <span>|</span>
                        <FlexDiv2>
                            <RiHotelBedLine size="20"/>
                            <p>Bedrooms: {adDetails.bedrooms}</p>
                        </FlexDiv2>
                        <span>|</span>
                        <FlexDiv2>
                            <BiBath size="20"/>
                            <p>Bathrooms: {adDetails.bathrooms}</p>
                        </FlexDiv2>
                    </FlexDiv2>
                </div>
                <Divider />
                <div>
                    <button>Contact Info</button>
                    <FiShare2></FiShare2>
                    <BsBookmark></BsBookmark>
                </div>
                <Divider />
                <Specification>
                    <Overview>
                        <H>Overview</H>
                        <P>Utilities Included </P>
                        { adDetails.utilities.hydro &&
                            <><Span>Hydro </Span><br/></>
                        }
                        {adDetails.utilities.heat &&
                            <><Span>Heat </Span><br/></>
                        }
                        {adDetails.utilities.water &&   
                            <><Span>Water</Span><br/></>
                        }
                        {!adDetails.utilities.hydro && !adDetails.utilities.heat && !adDetails.utilities.water &&
                            <><Span>Not Included</Span><br/></>
                        }
                        <P>Wi-Fi and More</P>
                        {adDetails.utilities.tv &&
                            <><Span>Tv(Cable)</Span><br/></>
                        }
                        {adDetails.utilities.internet &&
                            <><Span>Internet </Span><br/></>
                        }
                        {!adDetails.utilities.tv && !adDetails.utilities.internet &&
                            <><Span>Not Included</Span><br/></>
                        }
                        <P>Parking Included</P>
                        <Span>{adDetails.parking}</Span><br/>
                        <P>Pet Friendly</P>
                        <Span>{adDetails.pet}</Span>
                    </Overview>
                    <TheUnit>
                        <H>The Unit</H>
                        <P>Furnished</P>
                        <Span>{adDetails.furniture}</Span><br/>
                        <P>Apliances</P>
                        {adDetails.apliances.laundryInUnit &&
                            <><Span>Laundry(In Unit) </Span><br/></>
                        }
                        {adDetails.apliances.laundryInBuilding &&
                            <><Span>Laundry(In Building) </Span><br/></>
                        }
                        {adDetails.apliances.dishwasher &&
                            <><Span>Dishwasher</Span><br/></>
                        }
                        {adDetails.apliances.fridge &&
                            <><Span>Fridge / Freezer</Span><br/></>
                        }
                        {!adDetails.apliances.laundryInUnit && !adDetails.apliances.laundryInBuilding && !adDetails.apliances.dishwasher && !adDetails.apliances.fridge &&
                            <><Span>Not Included</Span><br/></>
                        }
                        <P>Air Conditioning</P>
                        <Span>{adDetails.air}</Span><br/>
                        <P>Personal Outdoor Space</P>
                        {adDetails.outdoorSpc.yard && 
                            <><Span>Yard</Span><br/></>
                        }
                        {adDetails.outdoorSpc.balcony &&
                            <><Span>Balcony</Span><br/></>
                        }
                        {!adDetails.outdoorSpc.yard && !adDetails.outdoorSpc.balcony &&
                            <><Span>Not Included</Span><br/></>
                        }
                        <P>Smoking Permitted</P>
                        <Span>{adDetails.smoke}</Span><br/>
                    </TheUnit>
                </Specification>
                <Divider />
                <Description>Description <br/>{adDetails.description}</Description>
            </Details1>
            <Details2>
                <Slideshow images={adDetails.images}></Slideshow>
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
    margin:5px;

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

const Description= styled.div`

`;
const Details2= styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;

`;
const Details3=styled.div`
    width: 15%;

`;
const Specification=styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const Overview= styled.div`
    
`;
const TheUnit=styled.div`

`;
const H=styled.h3`
    margin-bottom: 10px;
    font-size: larger;
`;
const P=styled.p`
    font-size: 17px;
    margin-bottom: 7px;
    margin-top: 10px;
`
const Span= styled.span`
    margin-left: 8px;
`