import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdsList=()=>{
    const [ads, setAds]=useState([])
    useEffect(()=>{
        fetch("/api/ads")
        .then((res)=>{
            if (res.ok) {
                return res.json();
            }
            throw Error(res.statusText);
        })
        .then (res=> setAds(res.data))
        .catch(err=>console.error(err))
    },[])
    console.log(ads)

    if (!ads) return <></>
    return(
    <>
       
        <Wrapper>
            <RightSide>
                <Title>Filters</Title>
                <span>Sort by</span><br/>
                <select>
                    <option value="newest">Data listed: Newest first</option>
                    <option value="lowest">Price: Lowest first</option>
                    <option value="highest">Price: Highest first</option>
                </select><br/>
                <span>Price</span>
                <FlexDiv> 
                    <input type="number" placeholder="Min" />  <span> to </span> <input type="number" placeholder="Max" />
                </FlexDiv>
                <span>Bedrooms</span><br/>
                    <select>
                        <option>All</option>
                        <option value="stadio">Studio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="5+">5+</option>
                    </select><br/> 
                <span>Bathrooms</span><br/>
                    <select>
                        <option>All</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                        <option value="3.5">3.5</option>
                        <option value="4">4</option>
                        <option value="4.5">4.5</option>
                        <option value="5+">5+</option>
                    </select>
                <p>Unit Type</p>
                    <input type="checkbox" value="apartment" id="apartment" name="apartment"/>
                    <label for="apartment">Apartment</label><br/>
                    <input type="checkbox" value="condo" id="condo" name="condo"/>
                    <label for="condo">Condo</label><br/>
                    <input type="checkbox" value="house" id="house" name="house"/>
                    <label for="house">House</label><br/>
                    <input type="checkbox" value="basement" id="basement" name="basement"/>
                    <label for="basement">Basement</label><br/>
                <span>Pet Friendly</span><br/>
                    <input type="radio" value="yes" id="yes" name="yes"/>
                    <label for="yes">Yes</label><br/>
                    <input type="radio" value="no" id="no" name="no"/>
                    <label for="no">No</label><br/>
                    <input type="radio" value="limited" id="limited" name="limited"/>
                    <label for="limited">Limited</label><br/> 
                <span>Parking Included</span><br/>
                    <input type="radio" value="yes" id="yes" name="yes"/>
                    <label for="yes">Yes</label><br/>
                    <input type="radio" value="no" id="no" name="no"/>
                    <label for="no">No</label><br/>                   
            </RightSide>
            <Main>
                <Title>All Property Rentals</Title>
                <AdsContainer>
                    {ads.map((el) => {
                        return (
                        <ItemContainer to={`/advertisement-details/${el._id}`}>
                            <Image src={el.imagesSrc[0]} />
                            <div>
                                <AdTitle>{el.title}</AdTitle>
                                <price>${el.price}</price>
                            </div>
                        </ItemContainer>
                        );
                    })}
                </AdsContainer>
            </Main>

        </Wrapper>
    </>
    )
}
export default AdsList;
const Wrapper=styled.div`
    display: flex;
    width: 100% ;
    flex-grow: 1;
`;
const Title = styled.div`
  
  
  
`;
const RightSide= styled.div`
    flex-basis: 10%;
    margin: 5px;
    padding: 10px;
    border-right: 2px solid red ;
`;
const Main=styled.div`
    flex-basis: 90%;
    margin:5px;
    padding: 10px;

`;
const FlexDiv=styled.div`
    display: flex;
`;
const AdsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 950px;
  height: 100%;
  /* background-color: azure; */
`;

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 5px;
  padding: 30px 10px 0 10px;
  margin: 0 25px 30px 0;
  width: 210px;
  height: 350px;
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: none;
    /* text-decoration-color: #22d0ff; */
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 250px;
  /* border-left: 1px solid lightgray; */
  /* border-top: 1px solid lightgray; */
  /* border-right: 1px solid lightgray; */
`;

const AdTitle = styled.div`
  font-family: sans-serif;
  font-size: 0.75em;
  color: black; //#7b7b7b
  padding: 0 5px 15px 5px;
  line-height: 17px;
  /* width: 325px; */
  :hover {
    color: #22d0ff;
  }
`;