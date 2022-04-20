import { useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AdContext } from "./AdContext";
import Filters from "./Filters";
import TimeAgo from 'javascript-time-ago';

const AdsList=()=>{
    const timeAgo = new TimeAgo('en-US')
    const {ads}= useContext(AdContext)

    if (!ads) return <></>
    return(
    <>
        <Wrapper>
            <RightSide>
                <Filters/>
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
  height: 100%;
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
