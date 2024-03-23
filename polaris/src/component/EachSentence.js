import React from 'react';
import styled from "styled-components";
import { PiBookFill } from "react-icons/pi";

const EachSentence = ({ onClick, quote, bookCategory, bookColor }) => {
    return (
        <Container onClick={onClick}>
            <QuoteBox>
            <QuoteText>{quote}</QuoteText>
            </QuoteBox>
            <BookIcon size="200" color={bookColor} />
            <BookCategory>{bookCategory}</BookCategory>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 500px;
    margin: 70px 0;
    margin-right: 20px;
    margin-left: 90px;
    padding: 0;
`;

const QuoteBox = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    min-height: 130px;
    width: 450px;
    background-image: linear-gradient(to bottom, white, rgba(217, 217, 217, 0.5));
    border: 2px solid white;
    clip-path: polygon(0% 0%, 100% 0, 88% 50%, 100% 100%, 0% 100%);
`;

const QuoteText = styled.div`
    width: 300px;
    margin-left: 130px;
    color: black;
    font-size: 16px;
    font-family: "KOTRA_GOTHIC";
    padding-right: 40px;
`;

const BookIcon = styled(PiBookFill)`
    position: absolute;
    bottom: 0px;
    right: 350px;
`;

const BookCategory = styled.div`
    font-size: 20px;
    color: #ffffff;
    position: absolute;
    bottom: 50px;
    left: 25px;
    font-family: "KOTRA_GOTHIC";
`;

export default EachSentence;
