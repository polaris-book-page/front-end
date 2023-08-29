import React from 'react';
import styled from "styled-components";
import { PiBookFill } from "react-icons/pi";

const EachSentence = ({ onClick, quote, bookColor }) => {
    return (
        <Container onClick={onClick}>
            <QuoteBox>
                <QuoteText>{quote}</QuoteText>
            </QuoteBox>
            <BookIcon size="250" color={bookColor} />
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
    height: 147px;
    width: 500px;
    background-image: linear-gradient(to bottom, white, rgba(217, 217, 217, 0.5));
    border: 2px solid white;
    clip-path: polygon(0% 0%, 100% 0, 88% 50%, 100% 100%, 0% 100%);
`;

const QuoteText = styled.div`
    width: 300px;
    margin: 0;
    margin-left: 130px;
    color: black;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const BookIcon = styled(PiBookFill)`
    position: absolute;
    bottom: 5px;
    right: 350px;
`;

const BookCategory = styled.div`
    font-size: 20px;
    color: #ffffff;
    position: absolute;
    bottom: 70px;
    left: 20px;
`;

export default EachSentence;
