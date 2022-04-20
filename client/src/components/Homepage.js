import styled from "styled-components";
import house from "../assets/house.jpg"
import { BsSearch } from "react-icons/bs"
import { useHistory } from "react-router-dom";



const Homepage=()=>{
    const History = useHistory();
    const onCityChange=(value)=>{
        if (value=== "montreal")
            History.push("/motreal-ads")
    }
    return(
        <>
            <Background>
            <Wrapper>
            <Titre>
                <Title>Find your dream residence.</Title>
                <Dec>Houses, condos and apartments for rent.</Dec>
            </Titre>
            <SearchBox>
                <Inner>
                    <SearchIcon/>
                    <City onChange={(ev)=>onCityChange(ev.target.value)}>
                        <option value="null"> Which city do you want to live?</option>
                        <option value="montreal" >Montreal</option>
                    </City>
                </Inner>
            </SearchBox>
            </Wrapper>
            </Background>
            

        </>
    )
}
export default Homepage;

const Background= styled.div`
    background-image: url(${house}) ;
    background-size:100% 100%;
    flex-grow: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    z-index: 1;
`;

const Titre=styled.div`
    margin: 10px;
`
const Title=styled.h1`
    font-size: 45px;
    font-weight: bold;
    color: var(--text-color);
    margin: 10px;
`
const Dec=styled.h3`
    font-size: 20px;
    color: var(--text-color);
`
const SearchBox=styled.div`
    border-radius: 10px;
    padding: 30px;
    background-color: var(--gray-color);
`
const Inner=styled.form`
    background-color: var(--hover-color);
    padding: 10px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
`
const City=styled.select`
    border: none;
`

const SearchIcon=styled(BsSearch)`
    align-self: center;
    margin-right: 5px;
`