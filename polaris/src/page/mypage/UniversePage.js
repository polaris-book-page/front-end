import styled, { keyframes } from "styled-components";
import NavBar from "../../component/NavBar";

const UniversePage = () =>{
    return (
        <>
            <NavBar/>
            <Background>
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
            translateX(${Math.cos((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * initialX)}px) 
            translateY(${Math.sin((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * initialX)}px) 
            rotate(0deg);

    }
    100% {
        transform: 
            rotate(360deg) 
            translateX(${Math.cos((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * initialX)}px) 
            translateY(${Math.sin((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * initialX)}px) 
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
`;

const Solar = styled.div`
    position: relative;
    height: 140vh;
    width: 100%;
`;

const Sun = styled.img`
    width: 60px;
    height: 60px;
    position: absolute;
    left: calc(50% - 30px);
    top: calc(50% - 30px);
`;

const PlanetWrapper = ({ src, m, n }) => (
    <BookInfo m={m} n={n}>
        <Planet src={src} />
        <ReadingBox>
            <img style={{ backgroundColor: '#ddd', width: 50, height: 70 }} />
            <ReadingContent>
                <ContentText color={'#4659A9'} size={'16px'}>종의 기원담</ContentText>
                <ContentText color={'#4659A9'}>2024.01.26 ~ 2024.02.15</ContentText>
            </ReadingContent>
        </ReadingBox>
    </BookInfo>
);

const BookInfo = styled.div`
    position: absolute;
    left: calc(50% - 14px);
    top: calc(50% - 14px);
    animation: ${props => cloudOrbit(props.m, props.n)} ${props => props.m * 15}s linear infinite;
`;

const Planet = styled.img`
    width: 28px;
    height: 28px;
`;

const ReadingBox = styled.div`
    display: none;
    background-color: #fff;
    align-items: center;
    border: solid 2px #D5CFFB;
    border-radius: 20px;
    padding: 10px;
    width: 200px;
    ${Planet}:hover ~ & {
        display: flex;
    }
    position: absolute;
    left: calc(50% + 30px);
    top: calc(50% - 110px);
`;

const ReadingContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: "KOTRA_GOTHIC";
    margin-left: 10px;
`;

const ContentText = styled.span`
    color: gray;
    font-family: "KOTRA_GOTHIC";
    font-size: 12px;
`;

const Orbit1 = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 60px);
    top: calc(50% - 60px);
`;

const Orbit2 = styled.div`
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 95px);
    top: calc(50% - 95px);
`;

const Orbit3 = styled.div`
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

const Orbit4 = styled.div`
    width: 330px;
    height: 330px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 165px);
    top: calc(50% - 165px);
`;

const Orbit5 = styled.div`
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 200px);
    top: calc(50% - 200px);
`;

const Orbit6 = styled.div`
    width: 470px;
    height: 470px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 235px);
    top: calc(50% - 235px);
`;

const Orbit7 = styled.div`
    width: 540px;
    height: 540px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 270px);
    top: calc(50% - 270px);
`;

const Orbit8 = styled.div`
    width: 610px;
    height: 610px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 305px);
    top: calc(50% - 305px);
`;

const Orbit9 = styled.div`
    width: 680px;
    height: 680px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 340px);
    top: calc(50% - 340px);
`;

const Orbit10 = styled.div`
    width: 750px;
    height: 750px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 375px);
    top: calc(50% - 375px);
`;

const Orbit11 = styled.div`
    width: 820px;
    height: 820px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    position: absolute;
    left: calc(50% - 410px);
    top: calc(50% - 410px);
`;

const Orbit12 = styled.div`
    width: 890px;
    height: 890px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    /* animation: ${neon_flicker} 1.5s infinite alternate; */
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    position: absolute;
    left: calc(50% - 445px);
    top: calc(50% - 445px);
`;



export default UniversePage;