import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const VerticalFlowText = ({ quote, width }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeRandom = Math.floor(Math.random(0, 100) * 10000 + 1000)
        setTimeout(() => { setShow(true) } , timeRandom)
        console.log(timeRandom, show)
        //clearTimeout(timerId);
    }, [])

    return (
        <>
            {show &&
                <FlowContainer>
                    <FlowText>
                        <FlowWrap width={width}>
                            {quote}
                        </FlowWrap>
                    </FlowText>
                </FlowContainer>
            }
        </>
    )
}

const FlowContainer = styled.div`
    position: absolute;
    overflow: visible;
    min-height: 100dvh;
`;

const FlowText = styled.div`
	white-space: nowrap;
    writing-mode: vertical-lr;
    text-orientation: sideways;
`;

const textLoop = (width) => keyframes`
	0% {
		transform: translate3d(${width + "dvw" || 0}, 0, 0);
        opacity: 0;
	}
    50%{
        opacity: 100%;
    }
	100% {
		transform: translate3d(${width + "dvw" || 0}, 150dvh, 0) ;
        opacity: 0;
	}
`;

const FlowWrap = styled.div`
    animation: ${(props) => textLoop(props.width)} 15s linear infinite;
	font-size: 18px;
	color: white;
	font-family: "KOTRA_GOTHIC";
	&:hover {
		animation-play-state: paused;
	}
`;



export default VerticalFlowText;