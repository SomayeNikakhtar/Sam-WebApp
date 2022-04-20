import { useContext, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AdContext } from "./AdContext";
import Filters from "./Filters";
import TimeAgo from 'javascript-time-ago';

const AdsList=()=>{
    const timeAgo = new TimeAgo('en-US')
    const {ads, fetchAds}= useContext(AdContext)
    let { page } = useParams();
    page = parseInt(page)
    const itemsPerPage = 8;
    useEffect(()=>{
      fetchAds({}, page, itemsPerPage)    
    },[page])

    if (!ads) return <></>
    return(
    <>
        <Wrapper>
            <RightSide>
                <Filters page={page} itemsPerPage={itemsPerPage}/>
            </RightSide>
            <Main>
                <Title>Rentals in Montreal, QC</Title>
                <AdsContainer>
                    {ads.map((el) => {
                        return (
                        <ItemContainer key={el._id} to={`/advertisement-details/${el._id}`}>
                            <Image src={el.images[0]} />
                            <Sub>
                                <Price>${el.price}</Price>
                                <AdTitle>{el.title}</AdTitle>
                                <Time>{timeAgo.format(new Date(el.date), 'round-minute')}</Time>
                            </Sub>
                        </ItemContainer>
                        );
                    })}
                </AdsContainer>
                <FlexDiv>
                  <Browse hide={page <= 1} to={`/motreal-ads/${page - 1}`}>
                    Previous
                  </Browse>
                  <Browse
                    hide={ads.length !== itemsPerPage}
                    to={`/motreal-ads/${page + 1}`}
                  >
                    Next
                  </Browse>
              </FlexDiv>
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
    padding: 10px;
    color: var(--text-color);
    
`;
const Title = styled.div`
  color: var(--text-color);
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 20px;
`;
const RightSide= styled.div`
    flex-basis: 10%;
    padding: 15px 20px 20px 10px;
    box-shadow:  -10px 60px 106px -14px rgba(184,178,184,1);
    border-radius: 10px;

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
  width: 1000px;
  /* height: 100%; */
`;

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 0 10px;
  margin: 0 25px 30px 0;
  width: 200px;
  height: 320px;
  text-decoration: none;
  box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
  transition: all .2s ease-in-out;
  color: var(--text-color);
  :hover {
    cursor: pointer;
    transform: scale(1.1);   
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
`;

const AdTitle = styled.div`
  font-size: 0.99em;
  line-height: 17px;
  margin-bottom: 10px;
  color: var(--text-alter);
`;
const Time=styled.p`
    color: #aaa;
    font-size: small;
    margin-bottom: 10px;
`
const Price=styled.p`
  font-weight: bold;
`
const Sub=styled.div`
  line-height: 20px;
`

const Browse = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-color);
  padding: 5px;
  border-radius: 3px;
  font-size: bold;
  font-optical-sizing: auto;
  text-decoration: none;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
  :hover {
    background-color: var(--hover-color);
    text-decoration: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* width: 950px; */
  /* height: 75px; */
  /* font-family: sans-serif; */
  /* font-size: 0.75em; */
`;
