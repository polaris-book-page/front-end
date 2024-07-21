import React from 'react';
import styled, { css } from "styled-components";
import { PiBookFill } from "react-icons/pi";

const EachSentence = ({ onClick, quote, bookCategory, bookColor }) => {
    const isShortText = quote.length < 110
    
    return (
        <Container onClick={onClick}>
            <QuoteBox>
                <QuoteText isShortText={isShortText}>{quote}</QuoteText>
            </QuoteBox>
            <BookIcon size="200" color={bookColor} />
            <BookCategory>#{bookCategory}</BookCategory>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 500px;
    margin: 70px 0;
    margin-right: 20px;
    padding: 0;
    justify-self: center;
`;

const QuoteBox = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    height: 130px;
    width: 530px;
    background-image: linear-gradient(to bottom, white, rgba(217, 217, 217, 0.5));
    border: 2px solid white;
    clip-path: polygon(0% 0%, 100% 0, 88% 50%, 100% 100%, 0% 100%);
    `;

const QuoteText = styled.div`
    vertical-align: middle;
    overflow-y: scroll;
    height: 110px;
    width: 340px;
    margin-left: 130px;
    color: black;
    font-size: 15px;
    font-family: "KOTRA_GOTHIC";
    padding-right: 20px;
    ${props => props.isShortText && css`
        display: flex;
        align-items: center; 
    `}
`;

const BookIcon = styled(PiBookFill)`
    position: absolute;
    bottom: 0px;
    right: 350px;
`;

const BookCategory = styled.div`
    font-size: 15px;
    color: #ffffff;
    position: absolute;
    bottom: 50px;
    right: 390px;
    font-family: "KOTRA_GOTHIC";
`;

export default EachSentence;
