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
            <Wrapper2>
            <div>
                <h1>Find your dream residence.</h1>
                <h3>Houses, condos and apartments for rent.</h3>
            </div>
            <div>
                <form>
                    <BsSearch/>
                    <select onChange={(ev)=>onCityChange(ev.target.value)}>
                        <option value="null">Which city do you want to live?</option>
                        <option value="montreal" >Montreal</option>
                    </select>
                </form>
            </div>
            </Wrapper2>
            </Background>
            

        </>
    )
}
export default Homepage;

const Background= styled.div`
    background-image: url(${house}) ;
    /* background-size: contain; */
    /* background-size: cover; */
    background-size:100% 100%;
    /* object-fit: cover; */
    flex-grow: 1;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper2= styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    /* opacity: 1; */
`;