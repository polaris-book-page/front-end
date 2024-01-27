import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import DrawChart1 from "../../component/DrawChart1";
import DrawChart2 from "../../component/DrawChart2";

const StatisticsPage = () =>{

    return (
        <>
        {/* <Background> */}
            <NavBar />
                <TitleContainer>
                    <TitleText>나의 여행기록</TitleText>
                </TitleContainer>
                <StatisticsGrid className="container">
                    <Goal>
                        {/* <Chartex/> */}
                        <ContainerRocket>
                            <Ground/>
                        </ContainerRocket>
                        <LevelHeightContainer>
                            <LevelHeightHorizonT></LevelHeightHorizonT>
                            <LevelHeightVertical></LevelHeightVertical>
                            <LevelHeightHorizonB></LevelHeightHorizonB>
                        </LevelHeightContainer>
                        <TextT>10000km<br/>50권</TextT>
                        <Current>
                            <Icon> 
                                <Rocket src={require("../../assets/ic-spaceship.svg").default}/>
                                <Fire src={require("../../assets/ic-fire.svg").default}/>
                            </Icon>
                            <TextB>140km<br/>14권</TextB>
                            <Line></Line>
                        </Current>
                    </Goal>
                    <Category>
                        <CategoryText>읽은 카테고리</CategoryText>
                        <CategoryContainer/>
                        <DrawChartContainer>
                            <DrawChart11 legendContainerId="1" />
                        </DrawChartContainer>
                    </Category>
                    <Type>
                        <TypeText>책 타입</TypeText>
                        <TypeContainer/>
                        <DrawChartContainer>
                            <DrawChart22 legendContainerId="2" />
                        </DrawChartContainer>
                    </Type>
                    <Review>
                        <ReviewText>지금까지 남긴 별점</ReviewText>
                        {/* <ReviewContainer></ReviewContainer> */}
                    </Review>
                    <Calendar>
                        <CalendarText>월별 달력</CalendarText>
                        <CalendarContainer></CalendarContainer>
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
        "goal category"
        "goal type"
        "review calendar";
`;

const Goal = styled.div`
    grid-area: goal;
    position: relative;  
`;

const ContainerRocket = styled.div`
    width: 373px;
    height: 727px;
    border-radius: 61px;
    background-image: linear-gradient(#000000, #10093E, #281453, #221C5E, 
                                    #2A2953, #6E6F8B, #336669, #328544, 
                                    #FFB628, #E5AA4A, #F3C984, #FFFBD7, 
                                    #EAE5E9, #D5CFFB);
    opacity: 0.5;
    float: right;
    margin-right: 100px;
`;

const Ground = styled.div`
    position:absolute; 
    bottom: 79px;
    background-color: #CFBB9C;
    width: 373px;
    height: 101px;
    border-radius: 0 0 30px 30px;
    vertical-align: bottom;
`;

const Rocket = styled.img`
    width: auto;
    position: relative;
`;

const Fire = styled.img`
    width: 50px;
    position: absolute;
    top: 130px;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LevelHeightContainer = styled.div`
    position: absolute;
    bottom: 777px;
    right: 110px;
`;

const LevelHeightVertical = styled.div`
    border-left : 3px solid #fff;
    height : 597px;
    width: 10px;
    position: absolute;
    left: 19px;
`;

const LevelHeightHorizonT = styled.div`
    border-bottom : 3px solid #fff;
    width : 40px;
`;

const LevelHeightHorizonB = styled.div`
    border-bottom : 3px solid #fff;
    width : 40px;
    position: absolute;
    top: 597px;
`;

const TextT = styled.p`
    position: absolute;
    right: 155px;
    top: 33px;
    text-align: right;
`;

const Current = styled.div`
    display: flex;
    position: absolute;
    right: 115px;
    bottom: 200px;
`;

const TextB = styled.p`
    text-align: right;
`;

const Line = styled.div`
    border-bottom : 1px solid #000;
    width : 30px;
    height: 30px;
    margin-left: 10px;
`;

const Category = styled.div`
    grid-area: category;
    position: relative;
    margin-bottom: 30px;
    `;

const CategoryText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 195px;
    bottom: 330px;
    z-index: 2;
`;

const CategoryContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #4659A9;
    opacity: 0.3;
    margin-bottom: 50px;
    z-index: 1;
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
    margin-bottom: 30px;
`;

const TypeText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 230px;
    bottom: 330px;
    z-index: 2;
`;

const DrawChart22 = styled(DrawChart2)`
`;

const TypeContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #97A4E8;
    opacity: 0.3;
    margin-bottom: 50px;
    z-index: 1;
`;

const Review = styled.div`
    grid-area: review;
    position: relative;
`;

const ReviewText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 205px;
    bottom: 330px;
    z-index: 2;
`;

const ReviewContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #4659A9;
    opacity: 0.3;
    margin-bottom: 50px;
    /* margin-right: 30px; */
    z-index: 1;
`;

const Calendar = styled.div`
    grid-area: calendar;
    position: relative;
`;

const CalendarText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 210px;
    bottom: 330px;
    z-index: 2;
`;

const CalendarContainer = styled.div`
    width: 540px;
    height: 323px;
    border-radius: 61px;
    background: #6F61C6;
    opacity: 0.3;
    margin-bottom: 50px;
    z-index: 1;
`;

export default StatisticsPage;