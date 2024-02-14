import styled, { keyframes } from "styled-components";
import NavBar from "../../component/NavBar";

const UniversePage = () =>{
    return (
        <>
            <NavBar/>
            <Background>
                <TitleText>MY BOOK UNIVERSE</TitleText>
                <Solar>
                    <Sun src={require("../../assets/graphic/sun.png")}></Sun>
                    <Orbit1></Orbit1>
                    <Orbit2></Orbit2>
                    <Orbit3></Orbit3>
                    <Orbit4></Orbit4>
                    <Orbit5></Orbit5>
                    <Orbit6></Orbit6>
                    <Orbit7></Orbit7>
                    <Orbit8></Orbit8>
                    <Orbit9></Orbit9>
                    <Orbit10></Orbit10>
                    <Orbit11></Orbit11>
                    <Orbit12></Orbit12>
                    <PlanetWrapper src={require("../../assets/graphic/planet-10.png")} m={9} n={1}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={2}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-5.png")} m={3} n={3}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-6.png")} m={3} n={4}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-2.png")} m={7} n={2}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-3.png")} m={10} n={1}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-7.png")} m={10} n={3}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-8.png")} m={10} n={5}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-9.png")} m={10} n={7}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-10.png")} m={10} n={10}/>
                </Solar>
            </Background>
        </>)
}

// 행성의 시작점은 translateX(-85px), translateX(85px), translateY(85px), translateY(-85px)
// initialX는 0 ~ 11 사이의 값
// degree를 360 * 행성 개수로 해야 조금 더 조화로울듯?
const cloudOrbit = (initialX, degree) => keyframes`
    0% {
        transform: 
            rotate(0deg) 
            translateX(${Math.cos((degree * 20 % 360) * (Math.PI / 180)) * (85 + 45 * initialX)}px) 
            translateY(${Math.sin((degree * 20 % 360) * (Math.PI / 180)) * (85 + 45 * initialX)}px) 
            rotate(0deg);

    }
    100% {
        transform: 
            rotate(360deg) 
            translateX(${Math.cos((degree * 20 % 360) * (Math.PI / 180)) * (85 + 45 * initialX)}px) 
            translateY(${Math.sin((degree * 20 % 360) * (Math.PI / 180)) * (85 + 45 * initialX)}px) 
            rotate(-360deg);
    }
`;

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
        inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4),
        inset 0 0 35px rgba(255, 255, 255, 0.4), 0 0 35px rgba(255, 255, 255, 0.4);
    }
`;

const Background = styled.div`
    background: #2C2C60;
    padding-top: 100px;
`;

const TitleText = styled.p`
    color: #D5CFFB;
    font-family: "KOTRA_BOLD";
    font-size: 48px;
    text-align: center; 
    width: 100%;
`;

const Solar = styled.div`
    position: relative;
    height: 140vh;
    width: 100%;
`;

const Sun = styled.img`
    width: 86px;
    height: 86px;
    position: absolute;
    left: calc(50% - 43px);
    top: calc(50% - 43px);
`;

const PlanetWrapper = ({ src, m, n }) => (
    <Planet src={src} m={m} n={n} />
);

const Planet = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
    animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 15}s linear infinite;
`;
// const Planet3 = styled.img`
//     width: 40px;
//     height: 40px;
//     position: absolute;
//     left: calc(50% - 20px);
//     top: calc(50% - 20px);
//     animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 15}s linear infinite;
// `;

// const Planet3_1 = styled.img`
//     width: 40px;
//     height: 40px;
//     position: absolute;
//     left: calc(50% - 20px);
//     top: calc(50% - 20px);
//     animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 15}s linear infinite;
// `;

// const Planet3_2 = styled.img`
//     width: 40px;
//     height: 40px;
//     position: absolute;
//     left: calc(50% - 20px);
//     top: calc(50% - 20px);
//     animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 15}s linear infinite;
// `;

// const Planet3_3 = styled.img`
//     width: 40px;
//     height: 40px;
//     position: absolute;
//     left: calc(50% - 20px);
//     top: calc(50% - 20px);
//     animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 15}s linear infinite;
// `;

// const Planet7 = styled.img`
//     width: 40px;
//     height: 40px;
//     position: absolute;
//     left: calc(50% - 20px);
//     top: calc(50% - 20px);
//     animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 10}s linear infinite;
// `;

// const Planet10 = styled.img`
//     width: 40px;
//     height: 40px;
//     position: absolute;
//     left: calc(50% - 20px);
//     top: calc(50% - 20px);
//     animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 10}s linear infinite;
// `;

const Orbit1 = styled.div`
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 85px);
    top: calc(50% - 85px);
`;

const Orbit2 = styled.div`
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 130px);
    top: calc(50% - 130px);
`;

const Orbit3 = styled.div`
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 175px);
    top: calc(50% - 175px);
`;

const Orbit4 = styled.div`
    width: 440px;
    height: 440px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 220px);
    top: calc(50% - 220px);
`;

const Orbit5 = styled.div`
    width: 530px;
    height: 530px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 265px);
    top: calc(50% - 265px);
`;

const Orbit6 = styled.div`
    width: 620px;
    height: 620px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 310px);
    top: calc(50% - 310px);
`;

const Orbit7 = styled.div`
    width: 710px;
    height: 710px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 355px);
    top: calc(50% - 355px);
`;

const Orbit8 = styled.div`
    width: 800px;
    height: 800px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 400px);
    top: calc(50% - 400px);
`;

const Orbit9 = styled.div`
    width: 890px;
    height: 890px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 445px);
    top: calc(50% - 445px);
`;

const Orbit10 = styled.div`
    width: 980px;
    height: 980px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 490px);
    top: calc(50% - 490px);
`;

const Orbit11 = styled.div`
    width: 1070px;
    height: 1070px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 535px);
    top: calc(50% - 535px);
`;

const Orbit12 = styled.div`
    width: 1160px;
    height: 1160px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    position: absolute;
    left: calc(50% - 580px);
    top: calc(50% - 580px);
`;



export default UniversePage;