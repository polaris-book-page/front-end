import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import DrawChart1 from "../../component/DrawChart1";
import DrawChart2 from "../../component/DrawChart2";
// import Chartex from "../../component/Chartex"

const StatisticsPage = () =>{

    return (
        <>
        {/* <Background> */}
            <NavBar />
                <TitleContainer>
                    <TitleText>나의 여행기록</TitleText>
                </TitleContainer>
                <StatisticsGrid className="container">
                    <Rocket>
                        <></>
                        {/* <Chartex/> */}
                    </Rocket>
                    <Category>
                        <SubtitleText1>읽은 카테고리</SubtitleText1>
                            <Container1/>
                            <DrawChartContainer>
                                <DrawChart11 legendContainerId="1" />
                            </DrawChartContainer>
                    </Category>
                    <Type>
                        <SubtitleText2>책 타입</SubtitleText2>
                        <Container2/>
                        <DrawChartContainer>
                            <DrawChart22 legendContainerId="2" />
                        </DrawChartContainer>
                    </Type>
                    <Review>
                        <SubtitleText3>지금까지 남긴 별점</SubtitleText3>
                        <Container3></Container3>
                    </Review>
                    <Calendar>
                        <SubtitleText4>월별 달력</SubtitleText4>
                        <Container4></Container4>
                    </Calendar>
                </StatisticsGrid>
            <FooterBar />
            {/* </Background> */}
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
        "rocket category"
        "rocket type"
        "review calendar";
`;

const Rocket = styled.div`
    grid-area: rocket;
`;

const Category = styled.div`
    grid-area: category;
    position: relative;
`;

const SubtitleText1 = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 195px;
    bottom: 340px;
`;

const Container1 = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #4659A9;
    opacity: 0.3;
    display: inline-block;
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
`;

const SubtitleText2 = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 230px;
    bottom: 340px;
`;

const DrawChart22 = styled(DrawChart2)`
`;

const Container2 = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #97A4E8;
    opacity: 0.3;
    display: inline-block;
    margin-bottom: 50px;
`;

const Review = styled.div`
    grid-area: review;
    position: relative;
`;

const SubtitleText3 = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 145px;
    bottom: 340px;
`;

const Container3 = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #4659A9;
    opacity: 0.3;
    display: inline-block;
    margin-bottom: 50px;
    margin-right: 30px;
`;

const Calendar = styled.div`
    grid-area: calendar;
    position: relative;
`;

const SubtitleText4 = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 210px;
    bottom: 340px;
`;

const Container4 = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #6F61C6;
    opacity: 0.3;
    display: inline-block;
    margin-bottom: 50px;
`;

export default StatisticsPage;