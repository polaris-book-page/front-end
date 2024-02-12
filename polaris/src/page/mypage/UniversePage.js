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
                </Solar>
            </Background>
        </>)
}

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