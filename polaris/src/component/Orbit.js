import React from "react";
import styled, { keyframes, css } from "styled-components";

const Orbit = () => {
    const currMonth = new Date().getMonth() + 1;
    const arr = Array.from({length: 12}, (v, i) => i + 1);
    console.log("arr", arr)

    return (
        <div>
            {arr.map(i => (
                <Circle key={i} $m={i} curm={currMonth}/>
            ))}
        </div>
    );
};

const neon_flicker = keyframes`
    0% {
        box-shadow: 
        inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), 
        inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4),
        inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4);
    }
    100% {
        box-shadow: 
        inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), 
        inset 0 0 25px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.6),
        inset 0 0 45px rgba(255, 255, 255, 0.6), 0 0 45px rgba(255, 255, 255, 0.6);
    }
`;

const Circle = styled.div`
    width: ${props => `${50 + (props.$m * 70)}px`};
    height: ${props => `${50 + (props.$m * 70)}px`};
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: ${props => `calc(50% - ${25 + (props.$m * 35)}px)`};
    top: ${props => `calc(50% - ${25 + (props.$m * 35)}px)`};
`;

export default Orbit;
