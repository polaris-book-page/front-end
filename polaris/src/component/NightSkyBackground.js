import styled, { keyframes } from "styled-components";


const NightSkyBackground = ({ height }) => {
    
    const randomStars = () => {
        // window size
        const maxWindowSize = Math.max(window.innerWidth, window.innerHeight);
        
        // dummy data
        const size = Math.floor(maxWindowSize / 2);

        const stars = new Array(size).fill().map((item, index) => {
            // stars
            const ranX = Math.random() * maxWindowSize;
            const ranY = Math.random() * maxWindowSize;
            const ranSize = Math.random() * 1 + 0.6;
            return (
                <Star top={ranX + 'px'} left={ranY + 'px'} size={ranSize + 'px'} key={index} />
            )
        })
        
        return stars
    }

    return (
        <SkyContainer height={height}>
            <StarsContainer>
                {randomStars()}
            </StarsContainer>
        </SkyContainer>
    )
}

// animation
const StarsAnimation = keyframes`
    0%{
        transform: translate(-50%, -50%) rotate(0);
    }
    100%{
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;

const Gradient = keyframes`
    0% {
        background-position: 50% 0%;
    }
    50% {
        background-position: 50% 100%;
    }
    100% {
        background-position: 50% 0%;
    }
`;

// container
const SkyContainer = styled.div`
    position: relative;
    width: 100vw;
    height: ${(props) => props.height || '100vh'};
    background-color: #ffffff;
    background: linear-gradient(#9A92C9, #7B85B7, #4659A9, #2C2C60);
    background-size: 200% 200%;
    opacity: 1;
    animation: ${Gradient} 60s ease-in-out infinite;
    overflow: hidden;
`;

const StarsContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${StarsAnimation} 1000s ease infinite;
    overflow: hidden;
`;

// components
const Star = styled.div`
    position: relative;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    background-color: white;
    border-radius: 50px;
`;



export default NightSkyBackground;