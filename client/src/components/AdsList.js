import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AdContext } from "./AdContext";
import Filters from "./Filters";

const AdsList=()=>{
    const {ads}= useContext(AdContext)

    if (!ads) return <></>
    return(
    <>
        <Wrapper>
            <RightSide>
                <Filters/>
            </RightSide>
            <Main>
                <Title>All Property Rentals</Title>
                <AdsContainer>
                    {ads.map((el) => {
                        return (
                        <ItemContainer key={el._id} to={`/advertisement-details/${el._id}`}>
                            <Image src={el.images[0]} />
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