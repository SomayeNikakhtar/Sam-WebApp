import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AdContext } from "./AdContext";

import ImgPv from "./ImgPv";

const Post= ()=>{
    const [dataTransfer, setDataTransfer] = useState({dt: null});

    const History=useHistory()
    const formRef= useRef()

    async function uploadImages() {
        if(!dataTransfer?.dt)
            return [];
        const filesArray = Array.from(dataTransfer.dt.files).map(file =>
            URL.createObjectURL(file)
        );
        console.log(filesArray)
        const uploadedImgs=[]
        for (const img of filesArray){
            console.log(img)
            const imageResponse = await fetch(img)
            const blob = await imageResponse.blob();
            
            const requestOptions = {
                method: 'POST',
                body: blob,
            };
            const response = await fetch('/api/uploadImg', requestOptions);
            const {filename} = await response.json();
            uploadedImgs.push(filename)
        }

        return uploadedImgs;
    }
    window.test = uploadImages
    const postAd = async (ev) => {
        
        const formData=new FormData(formRef.current)
        console.log(formRef.current.checkValidity())
        ev.preventDefault()

        const uploadedImgs = await uploadImages()
        const body = Object.fromEntries(formData)
        body.images = uploadedImgs;
        fetch("/api/newAd",{
            method: 'POST',
            body: JSON.stringify(body) ,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }

        }).then(res=>{
                if (res.ok) {
                    return res.json();
                }
                throw Error(res.statusText);
        })
        .then((json) => {
                console.log(json);
                History.push(`/advertisement-details/${json.data}`);
        }).catch(err=>{
                console.log(err)
        })

        
    }

    
    return(
        <Wrapper>
            
                <Titre>Post Your Ad</Titre>
                <Form ref={formRef} onSubmit={(ev)=>postAd(ev)}>
                <Divider>
                    <Title>1. Ad Details</Title>
                    <Liner />
                    <P>Ad title</P>
                    <input type="text" name="title" required/>
                    
                        <P>Unit Type</P>
                        <OptionsContainer>
                        <input type="radio" value="apartment" id="apartment" name="unitType" required/>
                        <label for="apartment">Apartment</label><br/>
                        <input type="radio" value="condo" id="condo" name="unitType"/>
                        <label for="condo">Condo</label><br/>
                        <input type="radio" value="house" id="house" name="unitType"/>
                        <label for="house">House</label><br/>
                        <input type="radio" value="basement" id="basement" name="unitType"/>
                        <label for="basement">Basement</label><br/>
                        </OptionsContainer>
                        <P>Bedrooms</P>
                        <select name="bedrooms" required>
                            <option value="">-Select-</option>
                            <option value="stadio">Studio</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="5+">5+</option>
                        </select> 
                        <P>Bathrooms</P>
                        <select name="bathrooms" required>
                            <option value="">-Select-</option>
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
                        <P>Pet Friendly</P>
                        <OptionsContainer>
                        <input type="radio" value="yes" id="yes" name="pet" required/>
                        <label for="yes">Yes</label><br/>
                        <input type="radio" value="no" id="no" name="pet"/>
                        <label for="no">No</label><br/>
                        <input type="radio" value="limited" id="limited" name="pet"/>
                        <label for="limited">Limited</label><br/>
                        </OptionsContainer>
                        <P>Furnished</P>
                        <OptionsContainer>
                        <input type="radio" value="yes" id="yes" name="furniture" required/>
                        <label for="yes">Yes</label><br/>
                        <input type="radio" value="no" id="no" name="furniture"/>
                        <label for="no">No</label><br/>
                        </OptionsContainer>
                        <P>Apliances</P>
                        <OptionsContainer>
                        <input type="checkbox" value="laundryInUnit" id="laundryInUnit" name="laundryInUnit" />
                        <label for="laundryInUnit">Laundry (In Unit)</label><br/>
                        <input type="checkbox" value="laundryInBuilding" id="laundryInBuilding" name="laundryInBuilding" />
                        <label for="laundryInBuilding">Laundry (In Building)</label><br/>
                        <input type="checkbox" value="dishwasher" id="dishwasher" name="dishwasher" />
                        <label for="dishwasher">Dishwasher</label><br/>
                        <input type="checkbox" value="fridge" id="fridge" name="fridge" />
                        <label for="fridge">Fridge / Freezer</label><br/>
                        </OptionsContainer>

                
                </Divider>
                <Divider>
                        <P>Air Conditioning</P>
                        <OptionsContainer>
                        <input type="radio" value="yes" id="yes" name="air" required/>
                        <label for="yes">Yes</label><br/>
                        <input type="radio" value="no" id="no" name="air"/>
                        <label for="no">No</label><br/>
                        </OptionsContainer>
                        <P>Personal Outdoor Space</P>
                        <OptionsContainer>
                        <input type="checkbox" value="yard" id="yard" name="yard"/>
                        <label for="yard">Yard</label><br/>
                        <input type="checkbox" value="balcony" id="balcony" name="balcony"/>
                        <label for="balcony">Balcony</label><br/>
                        </OptionsContainer>
                        <P>Smoking Permitted</P>
                        <OptionsContainer>
                        <input type="radio" value="yes" id="yes" name="smoke" required/>
                        <label for="yes">Yes</label><br/>
                        <input type="radio" value="no" id="no" name="smoke"/>
                        <label for="no">No</label><br/>
                        <input type="radio" value="outdoors" id="outdoors" name="smoke"/>
                        <label for="outdoors">Outdoors only</label><br/>
                        </OptionsContainer>
                        <P>Utilities Included</P>
                        <OptionsContainer>
                        <input type="checkbox" value="hydro" id="hydro" name="hydro"/>
                        <label for="hydro">Hydro</label><br/>
                        <input type="checkbox" value="heat" id="heat" name="heat"/>
                        <label for="heat">Heat</label><br/>
                        <input type="checkbox" value="water" id="water" name="water"/>
                        <label for="water">Water</label><br/>
                        </OptionsContainer>
                        <P>Wi-Fi and More</P>
                        <OptionsContainer>
                        <input type="checkbox" value="tv" id="tv" name="tv"/>
                        <label for="tv">Cable / TV</label><br/>
                        <input type="checkbox" value="internet" id="internet" name="internet"/>
                        <label for="internet">Internet</label><br/>
                        </OptionsContainer>
                        <P>Parking Included</P>
                        <OptionsContainer>
                        <input type="radio" value="yes" id="yes" name="parking" required/>
                        <label for="yes">Yes</label><br/>
                        <input type="radio" value="no" id="no" name="parking"/>
                        <label for="no">No</label><br/>
                        </OptionsContainer>
                        <P>Descriotion</P>
                        <Textarea name="description" rows="6" />
                </Divider>    

                <div>
                    <Divider>
                        <Title>2. Media</Title>
                        <Liner />
                    
                        <h3>Add photos to attract interest to your ad</h3>
                        <p>Include pictures with different angles and details. You can upload a maximum of 10 photos</p>
                        {/* <label for="images">Select photos</label><br/> */}
                        {/* <input type="file" id="images"  multiple="multiple" accept="image" 
                        onChange={(ev)=>uploadImage(ev.target.value)}/>
                         */}
                        {/* <input name="images" type="hidden" ref={uploadImageRef}/> */}
                        <ImgPv onImgsChanged={(dt)=>{
                            setDataTransfer({dt: dt})
                        }}/>
                        
                    </Divider>
                    <Divider>
                        <Title>3. Location</Title>
                        <Liner />
                        <P>Province</P>
                            <select name="province" required>
                                <option value="">-Select-</option>
                                <option value="quebec">Quebec</option>
                            </select>
                        <P>City</P>
                            <select name="city" required>
                                <option value="">-Select-</option>
                                <option value="montreal">Montreal</option>
                            </select><br/>  
                        <input type="number"  placeholder="Street number" name="stNum" required/><br/>
                        <input type="text"  placeholder="Street name" name="stName" required/><br/>        
                        <input type="text" pattern= "[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" placeholder="Postal code" name="postalCode" required/>
                    </Divider>
                    <Divider>
                        <Title>4. Price</Title>
                        <Liner />
                        <span>$</span> <input type="number" name="price" required/> /month
                    </Divider>
                    <Divider>
                        <Title>5. Contact Information</Title>
                        <Liner />
                        <AdjustForm>
                            <label for="phoneNum">Phone number (optional) :</label>
                            <input type="tel" name="tel"/>
                            <label for="email" >Email:</label>
                            <input type="email" name="email" />
                        </AdjustForm>
                        <FlexDiv4><Button>Submit</Button></FlexDiv4>
                    </Divider>
                    
                </div>
        </Form>
        </Wrapper>
    )
}
export default Post;
const Titre = styled.div`
  color: var(--text-color);
  font-weight: bold;
  font-size: 25px;
  margin: 20px 10px 5px 10px;
`;
    const Liner = styled.div`
    height: 1px;
    background: #ccc;
    margin-bottom: 15px;
`;

const Wrapper=styled.div`
    flex-grow: 1;
    color: var(--text-color);
`;
const Divider = styled.div`
    box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
    padding: 10px 20px;
    margin: 10px;
    min-width: 300px;
`;
const Form=styled.form`
    display: flex;
    line-height: 30px;
`;
const Textarea=styled.textarea`
    resize: none;
    border: 1px solid var(--primary-color);
    border-radius: 3px;
    min-width: 250px;

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
const FlexDiv4=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title=styled.span`
    font-weight: bold;
    font-size: 19px;
`
const P=styled.p`
    font-weight: bold;
    color: var(--primary-color);
    font-size: 17px;
`
const OptionsContainer=styled.div`
    color: var(--text-alter);
`
const AdjustForm = styled.div`
    display:grid;
    grid-template-columns: max-content max-content;
    grid-gap:5px;
    label {
        text-align:center;
    }

`