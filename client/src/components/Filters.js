import { useContext, useState } from "react";
import styled from "styled-components";
import { AdContext } from "./AdContext";

const Filters=()=>{
    
    const filterObj={}
    const[filters, setFilters]=useState(filterObj)
    const {fetchAds}= useContext(AdContext)

    return(
        <>
        <Title>Filters</Title>
                <span>Sort by</span><br/>
                <select onChange={(ev)=>setFilters({...filters, sortBy: ev.target.value })}>
                    <option value="newest">Data listed: Newest first</option>
                    <option value="lowest">Price: Lowest first</option>
                    <option value="highest">Price: Highest first</option>
                </select><br/>
                <span>Price</span>
                <FlexDiv> 
                    <input type="number" placeholder="Min" name="min" onChange={(ev)=>setFilters({...filters, minPrice: ev.target.value })}/>  
                    <span> to </span> 
                    <input type="number" placeholder="Max" name="max" onChange={(ev)=>setFilters({...filters, maxPrice: ev.target.value })}/>
                </FlexDiv>
                <span>Bedrooms</span><br/>
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
                <span>Bathrooms</span><br/>
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
                    </select>
                <p>Unit Type</p>
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
                <span>Pet Friendly</span><br/>
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
                <span>Parking Included</span><br/>
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
                    <button onClick={()=>{
                        fetchAds(filters)
                    }}>See Results</button>    
        </>

    )

}
export default Filters;

const Title = styled.div`

`;
const FlexDiv=styled.div`
    display: flex;
`;