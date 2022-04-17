import { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import styled from "styled-components";


const ImgPv = ({onImgsChanged}) => {
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataTransfer, setDataTransfer] = useState({dt: new DataTransfer()});
  const inputFiles = useRef()

  const getFiles = () =>{
    const filesArray = Array.from(dataTransfer.dt.files).map(file =>
        URL.createObjectURL(file)
    );
    Array.from(dataTransfer.dt.files).map(file => URL.revokeObjectURL(file) // avoid memory leak
    );
    return filesArray;
  }
  const handleImageChange = (e) => {
    // dataTransfer.items.clear()
    for (let file of e.target.files) {
		  dataTransfer.dt.items.add(file);
	  }
    setDataTransfer({dt:dataTransfer.dt})
    onImgsChanged(dataTransfer.dt)
  };
  

  const renderPhotos = (source) => {
    return source.map((photo, ind) => {
      return (
      <ImgContainer>
        <Image src={photo} alt="" key={photo} />
        <Close onClick={()=>{
            // inputFiles.current.files.splice(ind, 1)
            dataTransfer.dt.items.remove(ind)
            inputFiles.current.files = dataTransfer.files;
            setDataTransfer({dt: dataTransfer.dt})
            onImgsChanged(dataTransfer.dt)
          }}/>
      </ImgContainer>
      )
    });
  };
  const selectedFiles = getFiles();
  return (
    
    
      <div>
        <input  type="file" id="file" multiple onChange={handleImageChange} ref={inputFiles} hidden />
        <Holder className="label-holder">
          <Label htmlFor="file" className="label">
            <MdAddAPhoto/>
          </Label>
        </Holder>
        <Result className="result">{renderPhotos(selectedFiles)}</Result>
      </div>
    
  );
};

export default ImgPv;

const Holder= styled.div`
    width: 100%;
	height: 50px;
    margin-top: 3em;
    display: grid;
    place-items: center;
    
`
const Label = styled.label`
    height: 50px;
    width: 150px;
    background-color: pink;
    color: white;
    display: grid;
    place-items: center;
    font-size: 2rem ;
    cursor: pointer;
`
const Result= styled.div`
    min-height: 100%;
    max-height: auto;
    width: 100%;
    /* background-color: #272c34; */
    margin-top:1rem ;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
`;

const ImgContainer =styled.div`
    position: relative;
    margin: 0.75rem;
`

const Image= styled.img`
    width: 320px;
    height: 180px;
    object-fit: cover;
`

const Close =styled(AiOutlineCloseCircle)`
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 3px;
`