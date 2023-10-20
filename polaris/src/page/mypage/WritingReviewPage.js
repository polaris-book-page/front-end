import styled from "styled-components";
import StarRating from "../../component/StarRating";
import { useState } from "react";

const WritingReviewPage = () => {
    const [select, setSelect] = useState('1');
    const [quote, setQuote] = useState([
            <QuoteInputBox>
                <QuoteInput style={{flex: 0.8}} />
                <QuotePageInput style={{flex: 0.2}}/>
            </QuoteInputBox>]);

    // radio func
    const selectRadioFunc = (e) => {
        setSelect(e.target.value)
    }

    // quote func
    const inputQuoteFunc = () => {
        setQuote(quote.concat(
            <QuoteInputBox>
                <QuoteInput style={{flex: 0.8}} />
                <QuotePageInput style={{flex: 0.2}}/>
            </QuoteInputBox>
            )
        )
    }

    const deleteQuoteFunc = () => {
        if (quote.length <= 1) return;
        else setQuote(quote.slice(0, quote.length - 1))
    }

    return (
        <>
            <Background>
                <Container>
                    {/* scroll */}
                    <ScrollbarContainer>
                        <ContentContainer>
                        {/* book image */}
                        <BookImageBox>
                            <BookImage>
                                <img style={{ width: 80, height: 130 }} />                            
                            </BookImage>
                            <TitleText color={'white'} size={'16px'}>책 제목</TitleText>
                            <ContentText color={'white'} size={'13px'}>저자</ContentText>
                            <StarRating rating={3.5} size={'20px'} />
                        </BookImageBox>
                        {/* book type */}
                        <div style={{height: 20}} />
                        <RadioContainer>
                            <RadioBox>
                                <RadioButton type='radio' value='1' checked={select === '1'} onChange={selectRadioFunc} />
                                <ContentText color={'white'} size={'13px'}>종이책</ContentText>
                            </RadioBox>
                            <RadioBox>
                                <RadioButton type='radio' value='2' checked={select === '2'} onChange={selectRadioFunc} />
                                <ContentText color={'white'} size={'13px'} >전자책</ContentText>
                            </RadioBox>
                        </RadioContainer>

                        {/* input date */}
                        <DateInputBox>
                            <TitleText color={'white'} size={"16px"}>읽기 시작한 날짜</TitleText>
                            <DateInput />
                            <div style={{height: 20}} />
                            <TitleText color={'white'} size={"16px"}>읽기 종료한 날짜</TitleText>
                            <DateInput />
                        </DateInputBox>
                        {/* dashed line */}
                        <Line />
                        {/* input quote */}
                        <QuoteContainer>
                            <QuoteColumnAlignContainer>
                                <QuoteInputTitleBox>
                                    <QuoteInputTitleText flex={0.8} color={'white'} size={'16px'}>마음에 남았던 구절</QuoteInputTitleText>
                                    <QuoteInputTitleText flex={0.2} color={'white'} size={'16px'}>페이지</QuoteInputTitleText>
                                </QuoteInputTitleBox>
                                {quote}
                                <DeleteQuoteButton onClick={() => deleteQuoteFunc()}>{
                                    quote.length > 1 && <ContentText color={'red'} size={'12px'}>구절 삭제하기</ContentText>
                                }
                                </DeleteQuoteButton>
                                <AddQuoteButton onClick={() => inputQuoteFunc()}>
                                    <ContentText color={'white'} size={'12px'}>+ 구절 추가하기</ContentText>
                                </AddQuoteButton>
                        </QuoteColumnAlignContainer>
                        </QuoteContainer>
                        {/* input review */}
                        <div style={{height: 20}} />
                        <ReviewBox>
                            <TitleText color='white' size='16px'>리뷰</TitleText>
                            <ReviewInput />
                        </ReviewBox>
                        <div style={{height: 10}} />
                        <Button>
                            <ContentText color={'white'} size={'16px'}>내 행성에 추가하기</ContentText>
                        </Button>
                        </ContentContainer>
                    </ScrollbarContainer>
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
    position: flex;
    justify-content: center;
    background-color: #4659a9;
    height: 90vh;
    padding: 20px 5%;
    overflow: none;
`;

const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    flex-direction: column;
    padding: 40px 20px;
    height: 80vh;
    width: 90vh;
    box-shadow: 0px 2px 7px #00000022;

    @media screen and (max-width: 900px) {
        width: 60vh;
    }

    @media screen and (max-width: 500px) {  
        width: 50vh;
    }
`;

const ScrollbarContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    width: 100%;
    justify-content: center;

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

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    gap: 10px 0;
`;

const QuoteContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const QuoteColumnAlignContainer = styled.div`
    flex-direction: column;
    flex: 1;
    align-items: center;
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

// box
const BookImageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DateInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
`;

const QuoteInputTitleBox = styled.div`
    display:flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
`;

const QuoteInputTitleText = styled.div`
    flex: ${(props) => props.flex || 1};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
    color: ${(props) => props.color || 'grey'};
    text-align: center;
`;

const QuoteInputBox = styled.div`
    display: flex;
    flex: 1;
`;

const ReviewBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

const RadioBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
    margin: 5px;
`;

// component
const BookImage = styled.div`
    background-color: #4659a9;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
`;

const DateInput = styled.input`
    font-size: 14px;
    flex: 1;
    color: white;
    border-bottom: solid;
    border-color: white;
    border-top: none;
    border-left: none;
    border-right: none;
    background: transparent;
    padding: 4px;
    text-align: center;
    font-family: "KOTRA_BOLD";
    
`;

const QuoteInput = styled.input`
    width: 40vh;
    border: none;
    border-radius: 50px;
    background-color: white;
    padding: 4px;
    font-family: "KOTRA_GOTHIC";
    margin: 3px;
    padding: 5px 10px;
`;

const QuotePageInput = styled.input`
    width: 45px;
    border: none;
    border-radius: 50px;
    background-color: white;
    padding: 4px;
    font-family: "KOTRA_GOTHIC";
    text-align: center;
    margin: 3px;
    padding: 5px 10px;
`;

const ReviewInput = styled.textarea`
    width: 450px;
    font-size: 14px;
    flex: 1;
    border: none;
    border-radius: 20px;
    background-color: white;
    padding: 10px;
    font-family: "KOTRA_GOTHIC";
`;

const Line = styled.div`
    border-color: white;
    border-width: 2px;
    border-style: dashed;
    width: 100%;
    margin-bottom: 40px;
    margin-top: 40px;

`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    width: 50%;
    font-family: "KOTRA_BOLD";
    color: white;
    background-color: #4659A9;
    border-style: none;
    font-size: 16px;
    padding: 7px 50px;
    margin: 10px;
    border-radius: 50px;
    text-align: center;
`;

const RadioButton = styled.input`

`;

const AddQuoteButton = styled.button`
    float: right;
    background: none;
    border: none;
`;

const DeleteQuoteButton = styled.button`
    float: left;
    background: none;
    border: none;
`;

export default WritingReviewPage;