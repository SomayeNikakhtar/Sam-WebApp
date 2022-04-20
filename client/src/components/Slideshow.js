import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


const delay = 2500;

const Slideshow=({images})=> {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
        () =>
            setIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ),
        delay
        );

        return () => {
        resetTimeout();
        };
    }, [index]);

    return (
        <SlideshowC >
            <SlideshowSlider
                
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {images.map((src, index) => (
                <Slide
                    
                    key={index}
                    src={src}
                ></Slide>
                ))}
            </SlideshowSlider>

            <SlideshowDots >
                {images.map((_, idx) => (
                <SlideshowDot
                    isActive={index === idx}
                    key={idx}
                    onClick={() => {
                    setIndex(idx);
                    }}
                ></SlideshowDot>
                ))}
            </SlideshowDots>
        </SlideshowC>
    );
}
export default Slideshow;

const SlideshowC= styled.div`
    /* margin: 0 auto; */
    overflow: hidden;
    /* max-width: 500px; */
`;

const SlideshowSlider= styled.div`
    white-space: nowrap;
    transition: ease 1000ms;
`;
const Slide= styled.img`
    display: inline-block;
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
`;
const SlideshowDots= styled.div`
    text-align: center;
`;
const SlideshowDot= styled.div`
    display: inline-block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    cursor: pointer;
    margin: 15px 5px;
    background-color: ${({ isActive }) => (!isActive ? "#E0E1DD" : "#778DA9")};

`;