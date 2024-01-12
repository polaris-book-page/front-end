import React, { useState } from 'react';
import styled from "styled-components";
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";
import Modal from 'react-modal';
import LikeIcon from "../component/LikeIcon"; 
import EachSentence from "../component/EachSentence"; 

const TodaySentencePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
            <NavBar />
            <Background>
                <TitleText>오늘의 문장</TitleText>
                <SubtitleText>오늘의 한 문장이 여러분 책여행의 북극성이 되어줄 것입니다.</SubtitleText>
                <ExplainationText>※ 하루에 한 문장만 선택해서 책을 추천받을 수 있습니다.</ExplainationText>
                <SentencesContainer className="container-fluid row">
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="고독을 배설한 자리에서 내려앉는 환희. 이 달콤함을 위해 그는 예술을 표방한다." bookCategory="#카테고리" bookColor="#97A4E8" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="전부 바다에 밀어버리자. 더 이상 내가 나를 미워하지 않고 싫어하지 않을 때까지." bookCategory="#카테고리" bookColor="#4659A9" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="타인의 언어는 결코, 나의 정답이 될 수 없음을 알기에, 홀로 밤을 읽지 않기로 한다." bookCategory="#카테고리" bookColor="#6F61C6" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="슬픔을 병처럼 여기지 않겠다고 말하면서 나는 조금씩 의연해졌다. 슬픔에게도 비밀이 있을거라고. 그 비밀을 추궁하지 않기로 했다." bookCategory="#카테고리" bookColor="#2C2C60" />
                </SentencesContainer>
                <BookModal 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)} 
                    style={{ overlay: { backgroundColor:'rgba(0, 0, 0, 0.5)' }}}>
                    <Content>
                        <BookContainer>
                            <BookImage/>
                            <BookInfo>
                                <BookTitleBox>
                                    <LikeIcon/>
                                    <BookTitle>뼈가 자라는 여름</BookTitle>
                                </BookTitleBox>
                                <BookTextBox>
                                    <BookSentence>슬픔을 병처럼 여기지 않겠다고 말하면서 나는 조금씩 의연해졌다. 슬픔에게도 비밀이 있을거라고. 그 비밀을 추궁하지 않기로 했다.</BookSentence>
                                </BookTextBox>
                                <BookSubtext>저자: 백년의 고독<br/>분야: 소설<br/>출판사: 민음사</BookSubtext>
                            </BookInfo>
                        </BookContainer>
                        <BtnContainer>
                            <Btn>책 보러가기</Btn>
                            <Btn onClick={()=> setModalIsOpen(false)}>닫기</Btn>
                        </BtnContainer>
                    </Content>
                </BookModal>
            </Background>
            <FooterBar/>
        </>
    )
}

const SentencesContainer = styled.div`
    justify-content: center;
`;

const Background = styled.div`
    background-color: #373747;
    padding-top: 10%;
`;

const TitleText = styled.p`
    text-align: center;
    margin: 0;
    color: white;
    font-size: 50px;
    font-family: "KOTRA_BOLD";
`;

const SubtitleText = styled.p`
    text-align: center;
    color: white;
    font-size: 30px;
`;

const ExplainationText = styled.p`
    text-align: center;
    margin-bottom: 80px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const Content = styled.div`
    width: 1295px;
    height: 554px;
    position: absolute;
    top: 64%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding-top: 70px;
`;

const BookModal = styled(Modal)`
`;

const BookContainer = styled.div`
    display: flex;
    margin: 0 90px;
`;

const BookImage = styled.div`
    width: 241px;
    height: 366px;
    background-color: #d9d9d9;
    box-shadow: 0px 5px 10px #d9d9d9;
`;

const BookInfo = styled.div`
    margin-left: 65px;  
`;

const BookTitleBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const BookTitle = styled.p`
    font-size: 40px;
    font-family: "KOTRA_BOLD";
    margin: 0;
    margin-left: 10px;
    margin-top: 7px;
`;

const BookTextBox = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    height: 132px;
    width: 665px;
    background-color: #2C2C60;
    clip-path: polygon(0% 0%, 100% 0, 90% 50%, 100% 100%, 0% 100%);
`;

const BookSentence = styled.div`
    margin-left: 30px;
    width: 558px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const BookSubtext = styled.p`
    margin-top: 20px;
    font-size: 24px;
    line-height: 1.9;
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Btn = styled.button`
    margin: 0 20px;
    display: flex;
    width: 241px;
    height: 52px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin-top: 15px;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-family: "KOTRA_GOTHIC";
`;

export default TodaySentencePage;