import NavBar from "../component/NavBar";
import styled from "styled-components";
import FooterBar from "../component/FooterBar";
import VerticalFlowText from "../component/VerticalFlowText";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

const HomePage = () => {
    // useNavigate
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const initialData = queryClient.getQueryData(['check']);

    // interaction
    gsap.registerPlugin(ScrollTrigger);
    const container = useRef();
    
    useGSAP(() => {
        const boxItems = gsap.context((self) => {
            const boxes = self.selector('.box');
            boxes.forEach((box) => {
                gsap.from(box, {
                    x: 1000,
                    y: 0,
                    stagger: 1,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: box,
                        scrub: true,
                        start: "top bottom",
                        end: "top",
                        snap: 1,
                        // markers: true,
                        toggleActions: "restart none reverse none",
                    },
                });
                gsap.to(box, {
                    x:0,
                    y: 50,
                    opacity: 1,
                    duration: 3,
                })
            })
        }, container)
        return () => boxItems.revert(); // clean up
        // gsap.from(".start-box", {
        //     y: 0,
        //     opacity: 0.5,
        // });
        // gsap.to(".start-box", {
        //     y: 50,
        //     opacity: 1,
        //     duration: 2,
        // })
    }, {scope: container})

    const RandomFlowTextFuxc = () => {
    // load random quote array 10 sentence(temporary)
    
    const quoteArr = tenQuoteQuery.data.quotes.map((item) => item.quote)
    console.log("quoteArr: ", quoteArr)
    const ranArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    ranArr.sort(() => Math.random() - 0.5);
    
    // random width
    let flowTexts = quoteArr.map( (item, index) => {
        return <VerticalFlowText key={index} quote={item} width={ranArr[index]*10} />
    })

    return flowTexts;
    }

    const handleLogin = () => {
        if (initialData) navigate('/mypage')   
        else navigate('/auth/login')
    }

    // fetch API
    const fetchTenQuery = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/book/ten-quotes`)
            const data = res.data;

            return data;
        } catch (err) {
            console.log(err)
        }
    }

    // react-query
    const tenQuoteQuery = useQuery({
        queryKey: ["ten-query"],
        queryFn: fetchTenQuery
    })

    return (
        !tenQuoteQuery.isLoading  && tenQuoteQuery.data &&
        <>
            <Background>
                {RandomFlowTextFuxc()}
                <Container ref={container}>
                    <ContentBox className="box">
                        <TextBox>
                            <TitleText color={'white'} size={'24px'}>여행자분들의 책 여행 길잡이,</TitleText>
                            <br />
                            <TitleText color={'white'} size={'30px'}>:북극성</TitleText>
                        </TextBox>
                        <div style={{margin: 20}} />
                        <Logo src={require('../assets/graphic/app-logo.png')} />
                    </ContentBox>
                    <ContentBox className="box">
                        <TextBox>
                            <TitleText color={'white'} size={'24px'}>북극성 탐험</TitleText>
                            <br />
                            <TitleText color={'#2C2C60'} size={'16px'}>여러분이 지금까지 읽었던 책을 바탕으로 <br />책을 추천해줍니다. <br />그 책들은 여러분들의 다음 여행할 책 선택에 <br />도움을 드릴 것입니다.</TitleText>
                        </TextBox>
                        <img src={require('../assets/graphic/home-graphic-1.png')} style={{width: 300}} />
                    </ContentBox>
                    <ContentBox className="box">
                        <img src={require('../assets/graphic/home-graphic-2.png')} style={{width: 150}} />
                        <div style={{margin: 20}} />
                        <TextBox style={{textAlign: 'end'}}>
                            <TitleText color={'white'} size={'24px'} style={{textAlign: 'end'}}>오늘의 문장</TitleText>
                            <br />
                            <TitleText color={'#2C2C60'} size={'16px'} >보여지는 문장 중 마음에 드는 문장을 하나 선택하여 <br />책을 추천받을 수 있습니다. <br />오늘의 한 문장이 <br />여러분의 책 여행의 북극성이 되어줄 것입니다.</TitleText>
                        </TextBox>
                    </ContentBox>
                    <ContentBox className="box">
                        <ContentSubBox>
                            <TitleText color={'white'} size={'20px'} >다양한 책을 여행하면서 <br />여러분의 우주를 확장해보아요.</TitleText>
                            <div style={{margin: 10}} />
                            <img src={require('../assets/graphic/home-graphic-3.png')} style={{width: 80}} />
                        </ContentSubBox>
                        <ContentSubBox>
                            <img src={require('../assets/graphic/planet-4.png')} style={{ width: 80 }} />
                            <div style={{margin: 40}} />
                            <TitleText color={'white'} size={'20px'}>북극성이 여러분의 여행을 위한<br />길잡이가 되어줄 거예요.</TitleText>
                        </ContentSubBox>
                    </ContentBox>
                    <Button onClick={() => handleLogin()}>
                        북극성 시작하기
                    </Button>
                    <div style={{margin: 50}} />
                </Container>
            </Background>
        </>
    )
}

// text
const TitleText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
`;

const ContentText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
`

// container
const Background = styled.div`
    background: linear-gradient(#6F61C6, #667BD4, #97A4E8, #C9C6F7, #FACECB);
    padding-left: 3vw;
    padding-right: 3vw;
    overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// box
const ContentBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
`;

const ContentSubBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextBox = styled.div`
    
`;

// component
const Button = styled.button`
    background: linear-gradient(#6F61C6, #4659A9, #D5CFFB);
    background-clip: text;
    border: none;
    color: transparent;
    font-family: "KOTRA_BOLD";
    font-size: 25px;
`;

const Logo = styled.img`
    width: 250px;
    height: 250px;
`;

export default HomePage;