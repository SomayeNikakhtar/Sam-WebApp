import { useContext, useState } from "react";
import styled from "styled-components";
import { AdContext } from "./AdContext";

const Filters=()=>{
    
    const filterObj={}
    const[filters, setFilters]=useState(filterObj)
    const {fetchAds}= useContext(AdContext)

    return(
        <Wrapper>
        <Title>Filters</Title>
                <Filter>Sort by</Filter><br/>
                <select onChange={(ev)=>setFilters({...filters, sortBy: ev.target.value })}>
                    <option value="newest">Data listed: Newest first</option>
                    <option value="lowest">Price: Lowest first</option>
                    <option value="highest">Price: Highest first</option>
                </select><br/>
                <Filter>Price</Filter>
                <FlexDiv> 
                    <MinMax type="number" placeholder="Min" name="min" onChange={(ev)=>setFilters({...filters, minPrice: ev.target.value })}/>  
                    <Span> to </Span> 
                    <MinMax type="number" placeholder="Max" name="max" onChange={(ev)=>setFilters({...filters, maxPrice: ev.target.value })}/>
                </FlexDiv>
                <Filter>Bedrooms</Filter><br/>
                    <select onChange={(ev)=>setFilters({...filters, bedrooms: ev.target.value })}>
                        <option>All</option>
                        <option value="stadio">Studio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="5+">5+</option>
                    </select><br/> 
                <Filter>Bathrooms</Filter><br/>
                    <select onChange={(ev)=>setFilters({...filters, bathrooms: ev.target.value })}>
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
                    </select><br/>
                <Filter>Unit Type</Filter><br/>
                    <Options>
                        <input type="checkbox" value="apartment" id="apartment" name="apartment"
                            onChange={(ev)=>setFilters({...filters, unitType:{ ...filters.unitType, apartment:ev.target.checked }})}
                        />
                        <label for="apartment">Apartment</label><br/>
                        <input type="checkbox" value="condo" id="condo" name="condo"
                            onChange={(ev)=>setFilters({...filters, unitType:{ ...filters.unitType, condo:ev.target.checked }})}
                        />
                        <label for="condo">Condo</label><br/>
                        <input type="checkbox" value="house" id="house" name="house"
                            onChange={(ev)=>setFilters({...filters, unitType:{ ...filters.unitType, house:ev.target.checked }})}
                        />
                        <label for="house">House</label><br/>
                        <input type="checkbox" value="basement" id="basement" name="basement"
                            onChange={(ev)=>setFilters({...filters, unitType:{ ...filters.unitType, basement:ev.target.checked }})}
                        />
                        <label for="basement">Basement</label><br/>
                    </Options>
                <Filter>Pet Friendly</Filter><br/>
                <Options>
                    <input type="radio" value="all" name="pet" checked={!filters.pet || filters.pet==="all"}
                        onChange={(ev)=>{
                            setFilters({...filters, pet: ev.target.value })
                        }}
                    />
                    <label for="all">All</label><br/>
                    <input type="radio" value="yes" name="pet"
                        onChange={(ev)=>setFilters({...filters, pet: ev.target.value })}
                    />
                    <label for="yes">Yes</label><br/>
                    <input type="radio" value="no" name="pet"
                        onChange={(ev)=>setFilters({...filters, pet: ev.target.value })}
                    />
                    <label for="no">No</label><br/>
                    <input type="radio" value="limited" name="pet"
                        onChange={(ev)=>setFilters({...filters, pet: ev.target.value })}
                    />
                    <label for="limited">Limited</label><br/> 
                </Options>    
                <Filter>Parking Included</Filter><br/>
                <Options>
                    <input type="radio" value="all" name="parking" checked={!filters.parking || filters.parking==="all"}
                        onChange={(ev)=>setFilters({...filters, parking: ev.target.value })}
                    />
                    <label for="all">All</label><br/>
                    <input type="radio" value="yes" name="parking"
                        onChange={(ev)=>setFilters({...filters, parking: ev.target.value })}
                    />
                    <label for="yes">Yes</label><br/>
                    <input type="radio" value="no"  name="parking"
                        onChange={(ev)=>setFilters({...filters, parking: ev.target.value })}
                    />
                    <label for="no">No</label><br/>
                </Options>
                <FlexDiv2> 
                    <Button onClick={()=>{
                        fetchAds(filters)
                    }}>See Results</Button>   
                </FlexDiv2>        
        </Wrapper>

    )

}
export default Filters;

const Wrapper=styled.div`
    color: var(--text-color);
    line-height: 25px;
`
const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
`;
const FlexDiv=styled.div`
    display: flex;
`;
const Filter=styled.span`
    font-weight: bold;
    color: var(--primary-color);
`
const MinMax=styled.input`
    width: 100px;
`
const Span=styled.span`
    margin-left: 5px;
    margin-right: 5px;
`
const Options=styled.div`
    color: var(--text-alter);
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
const FlexDiv2=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
