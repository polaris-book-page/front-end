import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import DrawChart1 from "../../component/DrawChart1";
import DrawChart2 from "../../component/DrawChart2";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Modal from 'react-modal';
import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import StarChart from "../../component/StarChart";
import { FaStar } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";

const StatisticsPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { mutate } = useMutation({
        mutationFn: async (goal) => {
            const { data } = await axios.post(`http://localhost:3001/mypage/goal`, goal, { withCredentials: true })
            console.log("data", data)
            return data;
        }, 
        onSuccess: (data) => {
            console.log("set goal success")
        },
        onError: () => {
            console.log("set goal failure")
        }
    });

    return (
        <>
        {/* <Background> */}
            <NavBar />
                <TitleContainer>
                    <TitleText>나의 여행기록</TitleText>
                </TitleContainer>
                <StatisticsGrid className="container">
                    <Goal>
                        {/* <Chartex/> */}
                        {!modalIsOpen && (
                            <ContainerRocketBlind>
                                <GoalBtn onClick={() => setModalIsOpen(true)}>2024년<br/>목표 설정하기</GoalBtn>
                            </ContainerRocketBlind>
                        )}
                        <GoalModal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
                            >
                            <Content>
                                <Text>
                                    몇 권 완독을<br/>목표로 하시겠어요?
                                </Text>
                                <InputBox type='text' placeholder='권 수를 입력하세요'></InputBox>
                                <BtnContainer>
                                    <Btn>설정 완료</Btn>
                                </BtnContainer>
                                    <CloseBtn size="45" onClick={() => setModalIsOpen(false)}></CloseBtn>
                            </Content>
                        </GoalModal>
                        <ContainerRocket>
                            <Ground/>
                        </ContainerRocket>
                        <LevelHeightContainer>
                            <LevelHeightHorizonT></LevelHeightHorizonT>
                            <LevelHeightVertical></LevelHeightVertical>
                            <LevelHeightHorizonB></LevelHeightHorizonB>
                        </LevelHeightContainer>
                        <TextT>10000km<br/>50권</TextT>
                        <Current>
                            <Icon> 
                                <Rocket src={require("../../assets/ic-spaceship.svg").default}/>
                                <Fire src={require("../../assets/ic-fire.svg").default}/>
                            </Icon>
                            <TextB>140km<br/>14권</TextB>
                            <Line></Line>
                        </Current>
                        <GoalText>우주로 가기 위한 여정</GoalText>
                        
                    </Goal>
                    <Category>
                        <CategoryContainer/>
                        <CategoryText>읽은 카테고리</CategoryText>
                        <DrawChartContainer>
                            <DrawChart11 legendContainerId="1" />
                        </DrawChartContainer>
                    </Category>
                    <Type>
                        <TypeContainer/>
                        <TypeText>책 타입</TypeText>
                        <DrawChartContainer>
                            <DrawChart22 legendContainerId="2" />
                        </DrawChartContainer>
                    </Type>
                    <Review>
                        <ReviewContainer>
                        <ReviewText>지금까지 남긴 별점</ReviewText>
                        <StarText>
                            <FaStar style={{marginRight: '10px'}}/>
                            3.85
                        </StarText>
                        <BookText>
                            <BiSolidBook style={{marginRight: '10px'}}/>
                            56
                        </BookText>
                        <StarChart/>

                        </ReviewContainer>
                    </Review>
                    <Calendar>
                        <CalendarContainer/>
                        <CalendarText>월별 달력</CalendarText>

                    </Calendar>
                </StatisticsGrid>
                
            <FooterBar />
        </>
    )
}

// const Background = styled.div`
//     background-color: pink;
// `;

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 100px 0 30px 0;
`;

const TitleText = styled.p`
    font-size: 50px;
    margin: 0;
    font-family: "KOTRA_BOLD";
`;

const StatisticsGrid = styled.div`
    display: grid;
    grid-template-areas:
        "goal category"
        "goal type"
        "review calendar";
`;

const Goal = styled.div`
    grid-area: goal;
    position: relative;  
`;

const ContainerRocketBlind = styled.div`
    position: absolute;
    right: 0px;
    width: 373px;
    height: 727px;
    border-radius: 61px;
    background-color: rgba(0.88, 0.88, 0.88, 0.64);;
    margin-right: 100px;
    z-index: 2;
    display: flex;
`;

const GoalBtn = styled.button`
    position: absolute;
    right: 95px;
    bottom: 340px;
    width: 165px;
    height: 63px;
    border: none;
    border-radius: 50px;
    font-size: 15px;
    font-family: "KOTRA_GOTHIC";
    font-weight: 1000;
`;

const ContainerRocket = styled.div`
    width: 373px;
    height: 727px;
    border-radius: 61px;
    background-image: linear-gradient(#000000, #10093E, #281453, #221C5E, 
                                    #2A2953, #6E6F8B, #336669, #328544, 
                                    #FFB628, #E5AA4A, #F3C984, #FFFBD7, 
                                    #EAE5E9, #D5CFFB);
    opacity: 0.5;
    float: right;
    margin-right: 100px;
`;


const Ground = styled.div`
    position:absolute; 
    bottom: 79px;
    background-color: #CFBB9C;
    width: 373px;
    height: 101px;
    border-radius: 0 0 61px 61px;
    vertical-align: bottom;
`;

const Rocket = styled.img`
    width: auto;
    position: relative;
`;

const Fire = styled.img`
    width: 50px;
    position: absolute;
    top: 130px;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* z-index: 1; */
`;

const LevelHeightContainer = styled.div`
    position: absolute;
    bottom: 777px;
    right: 110px;
`;

const LevelHeightVertical = styled.div`
    border-left : 3px solid #fff;
    height : 597px;
    width: 10px;
    position: absolute;
    left: 19px;
`;

const LevelHeightHorizonT = styled.div`
    border-bottom : 3px solid #fff;
    width : 40px;
`;

const LevelHeightHorizonB = styled.div`
    border-bottom : 3px solid #fff;
    width : 40px;
    position: absolute;
    top: 597px;
`;

const TextT = styled.p`
    position: absolute;
    right: 155px;
    top: 33px;
    text-align: right;
`;

const Current = styled.div`
    display: flex;
    position: absolute;
    right: 115px;
    bottom: 200px;
`;

const GoalText = styled.div`
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
    font-size: 20px;
    width: 185px;
    position: absolute;
    bottom: 40px;
    right: 185px;
`;

const TextB = styled.p`
    text-align: right;
`;

const Line = styled.div`
    border-bottom : 1px solid #000;
    width : 30px;
    height: 30px;
    margin-left: 10px;
`;

const Category = styled.div`
    grid-area: category;
    position: relative;
    margin-bottom: 30px;
    `;

const CategoryText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 195px;
    bottom: 330px;
`;

const CategoryContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #4659A9;
    opacity: 0.3;
    margin-bottom: 50px;
`;

const DrawChart11 = styled(DrawChart1)`
`;

const DrawChartContainer = styled.div`
    position: absolute;
    left: 110px;
    bottom: 90px;
`;

const Type = styled.div`
    grid-area: type;
    position: relative;
    margin-bottom: 30px;
`;

const TypeText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 230px;
    bottom: 330px;
`;

const DrawChart22 = styled(DrawChart2)`
`;

const TypeContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #97A4E8;
    opacity: 0.3;
    margin-bottom: 50px;
`;

const Review = styled.div`
    grid-area: review;
    position: relative;
`;

const ReviewText = styled.p`
    text-align: center;
    width: 310px;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    margin-bottom: 0;
`;

const StarText = styled.div`
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    font-size: 32px;
`
const BookText = styled.div`
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    font-size: 32px;
`

const ReviewContainer = styled.div`
    height: 323px;
    width: 400px;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    float: right;
    margin-right: 80px;
`;

const Calendar = styled.div`
    grid-area: calendar;
    position: relative;
`;

const CalendarText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 210px;
    bottom: 330px;
`;

const CalendarContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #6F61C6;
    opacity: 0.3;
    margin-bottom: 50px;
`;

const Content = styled.div`
    width: 316px;
    height: 357px;
    position: absolute;
    top: 30%;
    left: 40%;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding-top: 70px;
`;

const GoalModal = styled(Modal)`
`;

const Text = styled.p`
    width: 234px;
    height: 87px;
    margin-left: 40px;
    font-size: 25px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    text-align: center;
    position: relative;
    border-bottom: 3px solid #4659A9;
`;

const InputBox = styled.input`
    width: 208px;
    font-size: 20px;
    font-family: "KOTRA_BOLD";
    border: 0;
    margin-left: 55px;
    margin-top: 30px;
    text-align:center;
    color: #4659A9;
    &::placeholder{
		color: #B7B5B5;
	}
    &:focus{
        outline: none;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 35px;
`;

const Btn = styled.button`
    width: 136px;
    height: 53px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const CloseBtn = styled(HiMiniXMark)`
    fill: #D9D9D9;
    position: absolute;
    top: 20px;
    right: 20px;
`;

export default StatisticsPage;