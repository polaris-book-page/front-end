import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";
import Modal from 'react-modal';
import LikeIcon from "../component/LikeIcon"; 
import EachSentence from "../component/EachSentence"; 
import NightSkyBackground from '../../src/component/NightSkyBackground';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from "react-router-dom";
import Marquee2 from '../component/Marquee2';
import _ from 'lodash';
import LoadSpinner from '../component/LoadSpinner';

const TodaySentencePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const navigate = useNavigate();
    const { state } = useLocation();
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 1200;

    const handleResize = _.debounce(() => {
        setWidth(window.innerWidth);
    }, 200);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize); 
        };
    }, []);

    const fetchQueries = async () => {
        try {
            const res = await axios.get(`/api/book/ten-quotes`)
            const data = res.data;
            console.log(data)

            return data;
        } catch (err) {
            console.log(err)
        }
    }

    const QuoteQuery = useQuery({
        queryKey: ["quote-list"],
        queryFn: fetchQueries
    })

    const fetchBookInfo = async (isbn) => {
        try {
            const response = await axios.get(`/api/book/info/${isbn}`, { withCredentials: 'true'});
            const data = response.data;
            
            return data;
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        const selectQuote = async () => {
            if (QuoteQuery.data) {
                const quotes = QuoteQuery.data.quotes
                const selectedBooks = []
                const isbnSet = new Set()
                const bookColor = ["#97A4E8", "#4659A9", "#6F61C6", "#2C2C60"]

                for (const quote of quotes) {
                    if (selectedBooks.length >= 4) {
                        break;
                    }
                    if (!isbnSet.has(quote.isbn)) {
                        const bookInfo = await fetchBookInfo(quote.isbn)
                        selectedBooks.push({
                            ...quote,
                            ...bookInfo,
                            isbn13: bookInfo.isbn,
                            bookColor: bookColor[selectedBooks.length]
                        });
                        isbnSet.add(quote.isbn)
                    }
                }
                console.log("selectedBook ", selectedBooks)
                setBooks(selectedBooks)
            }
        };
        selectQuote()
    }, [QuoteQuery.data])

    const openModal = (book) => {
        setSelectedBook(book);
        setModalIsOpen(true);
    }

    const handlePage = () => {
        if (selectedBook.isbn13) {
            navigate('/book/info', {state : selectedBook.isbn13 });
        } else {
            navigate('/book/info', {state : selectedBook.isbn });
        }
    }

    return (
        <>
            <NavBar />
            {isMobile 
                ? <NightSkyBackground height={'180vh'} /> 
                : <NightSkyBackground height={'100vh'} /> }
            <Background>
                <TitleText>오늘의 문장</TitleText>
                <SubtitleText>오늘의 한 문장이 여러분 책여행의 북극성이 되어줄 것입니다.</SubtitleText>
                <ExplainationText>※ 하루에 한 문장만 선택해서 책을 추천받을 수 있습니다.</ExplainationText>
                <div style={{height: 30}} />
                {!QuoteQuery.isLoading ? <>
                <SentencesContainer className="container">
                    {/* <EachSentence onClick={()=>setModalIsOpen(true)} quote="고독을 배설한 자리에서 내려앉는 환희. 이 달콤함을 위해 그는 예술을 표방한다." bookCategory="#카테고리" bookColor="#97A4E8" isbn="9788901276533" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="전부 바다에 밀어버리자. 더 이상 내가 나를 미워하지 않고 싫어하지 않을 때까지." bookCategory="#카테고리" bookColor="#4659A9" isbn="9791167740984" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="타인의 언어는 결코, 나의 정답이 될 수 없음을 알기에, 홀로 밤을 읽지 않기로 한다." bookCategory="#카테고리" bookColor="#6F61C6" isbn="9788998441012" />
                    <EachSentence onClick={()=>setModalIsOpen(true)} quote="슬픔을 병처럼 여기지 않겠다고 말하면서 나는 조금씩 의연해졌다. 슬픔에게도 비밀이 있을거라고. 그 비밀을 추궁하지 않기로 했다." bookCategory="#카테고리" bookColor="#2C2C60" isbn="9788982730009" /> */}
                    {books.map(book => (
                        <EachSentence 
                            key={book.isbn} 
                            onClick={() => openModal(book)} 
                            quote={book.quote} 
                            bookColor={book.bookColor}
                            bookCategory={book.category}
                            isbn={book.isbn}
                        />
                    ))}
                </SentencesContainer>
                <BookModal 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)} 
                    style={{ overlay: { backgroundColor:'rgba(0, 0, 0, 0.5)' }}}
                    ariaHideApp={false}
                    >
                    {selectedBook && (
                        <Content length={selectedBook.quote.length}>
                            <ContentBox>
                                <BookContainer>
                                    <BookImage src={selectedBook.cover}/>
                                    <BookInfo>
                                        <BookTitleBox>
                                            <LikeIcon item={selectedBook} />
                                            <Marquee2 title={selectedBook.title} color={'black'} size={'26px'} font={"KOTRA_BOLD"}/>
                                        </BookTitleBox>
                                        <BookTextBox>
                                            <BookSentence>{selectedBook.quote}</BookSentence>
                                        </BookTextBox>
                                        <BookSubtext>저자: {selectedBook.author}<br/>분야: {selectedBook.category}<br/>출판사: {selectedBook.publisher}</BookSubtext>
                                    </BookInfo>
                                </BookContainer>
                                <div style={{height: 10}} />
                                <BtnContainer>
                                    <Btn onClick={()=> handlePage()}>책 보러가기</Btn>
                                    <Btn onClick={()=> setModalIsOpen(false)}>닫기</Btn>
                                </BtnContainer>
                            </ContentBox>
                        </Content>
                    )}
                    {/* <Content>
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
                    </Content> */}
                </BookModal>
                </> : <LoadSpinner />}
            </Background>
            <FooterBar/>
        </>
    )
}

const SentencesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;
    column-gap: 15%;

    @media all and (max-width: 1215px){
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

// 대충 45자가 한 줄
// 4줄까지 들어감
// font size 16
const Content = styled.div`
    width: 1000px;
    height: ${props => props.length < 180 ? '400px' :
        `${400 + Math.ceil((props.length - 180) / 45) * 16}px`};
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
        //textbox 최소 120, 4줄은 126, 5줄 150, 6즐 174
        width: 800px;
        height: ${props => props.length < 185 ? '400px' :
        `${400 + Math.ceil((props.length - 148) / 37) * 24}px`};
    }
    @media all and (max-width: 900px){
        width: 500px;
        height: ${props => props.length < 185 ? '400px' :
        `${400 + Math.ceil((props.length - 148) / 37) * 24}px`};
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
    @media all and (max-width: 900px){
        align-items: center;
        flex-direction: column;
    }
`;

const BookImage = styled.img`
    width: 190px;
    height: 270px;
    background-color: #d9d9d9;
    box-shadow: 0px 5px 10px #d9d9d9;
    margin-top: 5px;

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
    margin-bottom: 10px;
    @media all and (min-width: 900px){
        align-items: center;
        display: flex;
    }
    @media all and (max-width: 900px){
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: column-reverse;
        margin-right: 24px;
    }
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
        width: 500px;
    }
    @media all and (max-width: 900px){
        width: 400px;
    }
    @media all and (max-width: 600px){
        width: 300px;
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