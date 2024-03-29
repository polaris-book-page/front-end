import React, { useState } from 'react';
import styled from "styled-components";
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";
import Modal from 'react-modal';
import LikeIcon from "../component/LikeIcon"; 
import EachSentence from "../component/EachSentence"; 
import NightSkyBackground from '../../src/component/NightSkyBackground';

const TodaySentencePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
            <NavBar />
            <NightSkyBackground height={'100vh'} />
            <Background>
                <TitleText>오늘의 문장</TitleText>
                <SubtitleText>오늘의 한 문장이 여러분 책여행의 북극성이 되어줄 것입니다.</SubtitleText>
                <ExplainationText>※ 하루에 한 문장만 선택해서 책을 추천받을 수 있습니다.</ExplainationText>
                <div style={{height: 30}} />
                <SentencesContainer className="container">
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="고독을 배설한 자리에서 내려앉는 환희. 이 달콤함을 위해 그는 예술을 표방한다." bookCategory="#카테고리" bookColor="#97A4E8" isbn="9788901276533" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="전부 바다에 밀어버리자. 더 이상 내가 나를 미워하지 않고 싫어하지 않을 때까지." bookCategory="#카테고리" bookColor="#4659A9" isbn="9791167740984" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="타인의 언어는 결코, 나의 정답이 될 수 없음을 알기에, 홀로 밤을 읽지 않기로 한다." bookCategory="#카테고리" bookColor="#6F61C6" isbn="9788998441012" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="슬픔을 병처럼 여기지 않겠다고 말하면서 나는 조금씩 의연해졌다. 슬픔에게도 비밀이 있을거라고. 그 비밀을 추궁하지 않기로 했다." bookCategory="#카테고리" bookColor="#2C2C60" isbn="9788982730009" />
                </SentencesContainer>
                <BookModal 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)} 
                    style={{ overlay: { backgroundColor:'rgba(0, 0, 0, 0.5)' }}}>
                    <Content>
                        <ContentBox>
                            <BookContainer>
                                <BookImage/>
                                <BookInfo>
                                    <BookTitleBox>
                                        <LikeIcon item={{
                                            isbn13: "9788901276533",
                                        }} />
                                        <BookTitle>뼈가 자라는 여름</BookTitle>
                                    </BookTitleBox>
                                    <BookTextBox>
                                        <BookSentence>슬픔을 병처럼 여기지 않겠다고 말하면서 나는 조금씩 의연해졌다. 슬픔에게도 비밀이 있을거라고. 그 비밀을 추궁하지 않기로 했다.</BookSentence>
                                    </BookTextBox>
                                    <BookSubtext>저자: 백년의 고독<br/>분야: 소설<br/>출판사: 민음사</BookSubtext>
                                </BookInfo>
                            </BookContainer>
                            <div style={{height: 10}} />
                            <BtnContainer>
                                <Btn>책 보러가기</Btn>
                                <Btn onClick={()=> setModalIsOpen(false)}>닫기</Btn>
                            </BtnContainer>
                        </ContentBox>
                    </Content>
                </BookModal>
            </Background>
            <FooterBar/>
        </>
    )
}

const SentencesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    margin-bottom: 10%;

    @media all and (max-width: 1050px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Background = styled.div`
    position: absolute;
    top: 150px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    padding-right: 5%;
    padding-left: 5%;
    
`;

const TitleText = styled.p`
    text-align: center;
    margin: 0;
    color: white;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
`;

const SubtitleText = styled.p`
    text-align: center;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const ExplainationText = styled.p`
    text-align: center;
    color: white;
    font-size: 15px;
    font-family: "KOTRA_GOTHIC";
`;

const Content = styled.div`
    width: 1000px;
    height: 400px;
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    margin: auto;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding: 30px;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 6px;
    }

    @media all and (max-width: 1100px){
        width: 800px;
        height: 400px;
    }
    @media all and (max-width: 900px){
        width: 500px;
        height: 600px;
        top: 10%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    @media all and (max-width: 600px){
        width: 400px;
        top: 10%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BookModal = styled(Modal)`
`;

const BookContainer = styled.div`
    display: flex;
    align-items: center;

    @media all and (max-width: 900px){
        flex-direction: column;
    }
`;

const BookImage = styled.div`
    width: 190px;
    height: 270px;
    background-color: #d9d9d9;
    box-shadow: 0px 5px 10px #d9d9d9;

    @media all and (max-width: 1100px){
        width: 150px;
        height: 210px;
    }
    @media all and (max-width: 900px){
        width: 150px;
        height: 210px;
    }
`;

const BookInfo = styled.div`
    margin-left: 20px;  
`;

const BookTitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const BookTitle = styled.p`
    font-size: 24px;
    font-family: "KOTRA_BOLD";
    margin: 0;
    margin-left: 10px;
    margin-top: 7px;
`;

const BookTextBox = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    min-height: 120px;
    width: 600px;
    background-color: #2C2C60;
    clip-path: polygon(0% 0%, 100% 0, 90% 50%, 100% 100%, 0% 100%);

    @media all and (max-width: 1100px){
        width: 400px;
    }
    @media all and (max-width: 900px){
        width: 300px;
    }
    @media all and (max-width: 600px){
        width: 200px;
    }
`;

const BookSentence = styled.div`
    padding: 15px;
    padding-right: 60px;
    color: white;
    font-size: 16px;
    font-family: "KOTRA_GOTHIC";
`;

const BookSubtext = styled.p`
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
    font-family: "KOTRA_GOTHIC";
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media all and (max-width: 900px){
        flex-direction: column;
        
    }
`;

const Btn = styled.button`
    display: flex;
    width: 160px;
    height: 40px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "KOTRA_GOTHIC";
`;

export default TodaySentencePage;