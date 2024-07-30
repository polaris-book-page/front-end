import styled from "styled-components";
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";

const RecommendPage = () =>{
    return (
        <>
            <NavBar />
                <Background>
                    <TitleContainer>
                        <TitleText>북극성 탐험</TitleText>
                        <RocketIcon src='rocket.png' alt="로켓 아이콘"/>
                    </TitleContainer>
                    <SubtitleText>여러분이 지금까지 읽었던 책을 바탕으로 다음 여행지를 추천해드립니다.</SubtitleText>
                    <ExplainationText>※ 여러분이 선호하는 분야와 완독한 책을 바탕으로 4개의 책을 추천해드립니다.<br/>※ 완독한 책은 북극성 탐험에 나타나지 않습니다.</ExplainationText>
                    <BookGrid className="container">
                        <Book1>
                            <BookImg></BookImg>
                            <BookCategory>#카테고리</BookCategory>
                        </Book1>
                        <Book2>
                            <BookImg></BookImg>
                            <BookCategory>#카테고리</BookCategory>
                        </Book2>
                        <Book3>
                            <BookImg></BookImg>
                            <BookCategory>#카테고리</BookCategory>
                        </Book3>
                        <Book4>
                            <BookImg></BookImg>
                            <BookCategory>#카테고리</BookCategory>
                        </Book4>
                </BookGrid>
                <div style={{height: 20}} />
                    <BtnContainer>
                        <RefreshBtn>
                            <RefreshBtnText>새로고침</RefreshBtnText>
                            <RefreshIcon src='refresh-page-option.png' alt="새로고침 아이콘"/>
                        </RefreshBtn>
                        <BtnText>※ 새로고침은 하루에 5번으로 제한되어 있습니다.</BtnText>
                    </BtnContainer>
                </Background>
        </>
    )
}

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px 0 30px 0;
`;

const Background = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    padding: 0 5vw;
`;

const TitleText = styled.p`
    text-align: center;
    margin: 0;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
`;

const RocketIcon = styled.img`
    height: 40px;
    margin-left: 10px;
`;

const SubtitleText = styled.span`
    text-align: center;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const ExplainationText = styled.p`
    text-align: center;
    font-size: 15px;
    margin-bottom: 30px;
    font-family: "KOTRA_GOTHIC";
`;


const BookGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media all and (max-width: 900px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

const Book1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Book2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Book3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Book4 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BookImg = styled.div`
    width: 150px;
    height: 200px;
    background-color: #d9d9d9;
    margin: 10px 20px;
    box-shadow: 0px 5px 10px #d9d9d9;
`;

const BookCategory = styled.div`
    font-size: 20px;
    color: #6F61C6;
    font-family: "KOTRA_GOTHIC";
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RefreshBtn = styled.button`
    display: flex;
    width: 210px;
    height: 45px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin-top: 15px;
    color: white;
    justify-content: center;
    align-items: center;
    font-family: "KOTRA_GOTHIC";
    gap: 10px;
`;

const RefreshBtnText = styled.span`
    font-size: 18px;
`;

const RefreshIcon = styled.img`
    height: 20px;
`;

const BtnText = styled.p`
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 30px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

export default RecommendPage;