import styled from "styled-components";
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";
import { PiBookFill } from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 임포트


const TodaySentencePage = () =>{
    return (
        <>
            <Background>
                <TitleText>오늘의 문장</TitleText>
                <SubtitleText>오늘의 한 문장이 여러분 책여행의 북극성이 되어줄 것입니다.</SubtitleText>
                <ExplainationText>※ 하루에 한 문장만 선택해서 책을 추천받을 수 있습니다.</ExplainationText>
                <SentencesContainer className="container-fluid row">
                    <EachSentence>
                        <QuoteBox>
                            <QuoteText>고독을 배설한 자리에서 내려앉는 환희. 이 달콤함을 위해 그는 예술을 표방한다.</QuoteText>
                        </QuoteBox>
                        <BookIcon size="250" color="#97A4E8"/>
                    </EachSentence>
                    <EachSentence>
                        <QuoteBox>
                            <QuoteText>전부 바다에 밀어버리자. 더 이상 내가 나를 미워하지 않고 싫어하지 않을 때까지.</QuoteText>
                        </QuoteBox>
                        <BookIcon size="250" color="#4659A9"/>
                    </EachSentence>
                    <EachSentence>
                        <QuoteBox>
                            <QuoteText>타인의 언어는 결코, 나의 정답이 될 수 없음을 알기에, 홀로 밤을 읽지 않기로 한다.</QuoteText>
                        </QuoteBox>
                        <BookIcon size="250" color="#6F61C6"/>
                    </EachSentence>
                    <EachSentence>
                        <QuoteBox>
                            <QuoteText>슬픔을 병처럼 여기지 않겠다고 말하면서 나는 조금씩 의연해졌다. 슬픔에게도 비밀이 있을거라고. 그 비밀을 추궁하지 않기로 했다.</QuoteText>
                        </QuoteBox>
                        <BookIcon size="250" color="#2C2C60"/>
                    </EachSentence>
                </SentencesContainer>
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

const EachSentence = styled.div`
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
    background-image: linear-gradient( to bottom, white, rgba(217, 217, 217, 0.5) );
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

export default TodaySentencePage;