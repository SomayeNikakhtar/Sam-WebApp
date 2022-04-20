import { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import styled from "styled-components";
import Slideshow from "./Slideshow";
import { FiShare2,  } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { BiBuildingHouse, BiBath } from "react-icons/bi";
import { RiHotelBedLine } from "react-icons/ri";
import MapModal from "./MapModal";
import { MsgContext } from "./MsgContext";


const AdDetails= ()=>{
    const [adDetails, setAdDetails]=useState(null)
    const [showMap,setShowMap]=useState(false)
    const {id}= useParams()
    const {sendMsg}= useContext(MsgContext)
    const [msgContent, setMsgContent]=useState("")
    const [isMsgSent, setIsMsgSent] = useState(false)


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

    return(<>
        <Title1>Advertisement Details</Title1>
        <Wrapper>
            
            
            <Details1>
                
                <Box>
                <FlexDiv>
                    <Title>{adDetails.title}</Title>
                    <Price>${adDetails.price} / month</Price>
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
                            <Span>{adDetails.unitType}</Span>
                        </FlexDiv2>
                        <H>|</H>
                        <FlexDiv2>
                            <RiHotelBedLine size="20"/>
                            <Span>Bedrooms: {adDetails.bedrooms}</Span>
                        </FlexDiv2>
                        <H>|</H>
                        <FlexDiv2>
                            <BiBath size="20"/>
                            <Span>Bathrooms: {adDetails.bathrooms}</Span>
                        </FlexDiv2>
                    </FlexDiv2>
                </div>
                </Box>
                
                
                
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
                    <Overview>
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
                    </Overview>
                </Specification>
                <Description><H>Description</H> <br/>{adDetails.description}</Description>
            </Details1>
            <FlexDiv3>
            <Details2>
                <Slideshow images={adDetails.images}></Slideshow>
                {!isMsgSent ? 
                    <>
                        <Msg rows="4" placeholder="Your Message" onChange={(ev)=>setMsgContent(ev.target.value)}></Msg>
                        <Button onClick={() =>  {
                                sendMsg({receiver:adDetails.owner ,content:msgContent, adId:adDetails._id})
                                .then((res)=>{
                                    if (res) setIsMsgSent(true)
                                    //setIsMsgSent(res)
                                })
                            }}>Send message</Button>
                    </> : 
                    <Alert>Your message is sent!</Alert>
                }
            </Details2>
            <Box2>
                    <button>Contact Info</button>
                    <FiShare2></FiShare2>
                    <BsBookmark></BsBookmark>
                </Box2>
            </FlexDiv3>
            <Details3/>
        </Wrapper>
        </>
    );
}


export default AdDetails;

const Wrapper=styled.div`
display: flex;
flex-grow: 1;
padding: 20px;
color: var(--text-color);

`
const Details1= styled.div`
    width: 70%;
    margin-right: 20px;
   
`;

const Title= styled.h2`
    font-size: 20px;
`;
const Price=styled.p`
    font-weight: bold;
    font-size: 19px;
    color: var(--text-alter);
`;
const FlexDiv=styled.div`
    display: flex;
    justify-content: space-between;
`;
const FlexDiv2=styled.div`
    display: flex;
    margin:5px;
`;
const FlexDiv3=styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    
`
const Map=styled.button`
    margin-left: 5px;
    background-color: inherit;
    border: none;
    cursor: pointer;
    color: blue;
`;

const Description= styled.div`
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    margin-top: 10px;
    padding: 10px;
    border-radius: 3px;
`;
const Details2= styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    border-radius: 3px;


`;
const Details3=styled.div`
    width: 15%;

`;
const Specification=styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    border-radius: 3px;
`;
const Overview= styled.div`
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    padding: 20px 60px;
    flex-grow: 1;
    line-height: 23px;
`;

const H=styled.h3`
    margin-bottom: 10px;
    font-size: larger;
    font-size: 20px;
    font-weight: bold;
`;
const P=styled.p`
    font-size: 15px;
    margin-bottom: 7px;
    margin-top: 10px;
    font-weight: bold;
`
const Span= styled.span`
    margin-left: 8px;
    color: var(--text-alter);
`
const Title1 = styled.div`
  color: var(--text-color);
  font-weight: bold;
  font-size: 25px;
  margin: 10px 20px 0px 20px;
`;
const Box=styled.div`
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    margin-bottom: 10px ;
    padding: 10px;
    border-radius: 3px;
    line-height: 25px;
`
const Box2=styled.div`
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    margin: 10px 0px;
    padding: 10px;
    border-radius: 3px;
`
const Msg=styled.textarea`
    resize: none;
    border: 1px solid var(--primary-color);
    border-radius: 3px;
`
const Button=styled.button`
    background-color: var(--text-alter);
    border: none;
    border-radius: 4px;
    color: var(--gray-color);
    padding: 8px;
    margin-top: 10px;
    font-size: 18px;
`
const Alert=styled.button`
    background: var(--hover-color);
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    color: var(--text-color);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 16px 8px;
    margin: 8px;
    transition: all .5s ease-in-out;
`