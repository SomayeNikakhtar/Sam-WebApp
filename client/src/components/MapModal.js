import styled from "styled-components";
import GoogleMap from 'google-map-react';



const MapModal = ({onCloseFunc, center}) => {
  return (
    <Wrapper>
      <Content>
      <GoogleMap
        bootstrapURLKeys={{key:""}} // set if you need stats etc ...
        center={center}
       
        zoom={10}>
          <Marker lat={center[0]} lng={center[1]}></Marker>
          {/* <SiGooglemaps lat={59.955413} lng={30.337844} size={"30px"} color={"red"}/> */}
        
      </GoogleMap>
        <Button onClick={onCloseFunc}>close</Button>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;
const Content = styled.div`
  background: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70%;
  width: 80%;
  padding: 20px;
`;

const Button = styled.button`
  background: #fff;
  border: 1px solid red;
  border-radius: 4px;
  
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px 8px;
  text-transform: uppercase;
  margin: 8px;
  width: 120px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const Marker=styled.div`
   position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: red;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &:hover {
      z-index: 1;
    }
`
export default MapModal;
