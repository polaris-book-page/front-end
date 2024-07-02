import styled, { css } from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import DrawChart1 from "../../component/DrawChart1";
import DrawChart2 from "../../component/DrawChart2";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Modal from 'react-modal';
import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import StarChart from "../../component/StarChart";
import { FaStar } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";
import Calendar from "react-calendar";
import moment from 'moment/moment';
import { useQueryClient } from '@tanstack/react-query'


const StatisticsPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [goalVal, setGoalVal] = useState(false);
    const [userGoal, setUserGoal] = useState(false);
    const [currReviewCnt, setCurrReviewCnt] = useState(0);
    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: async (goal) => {
            const { data } = await axios.post(`/api/mypage/goal`, { goal: goal }, { withCredentials: true })
            console.log("data", data)
            return data;
        }, 
        onSuccess: (data) => {
            console.log("set goal success")
        },
        onError: () => {
            console.log("set goal failure")
        }
    });

        const [value, onChange] = useState(new Date());

    // fetch API
    const fetchReviewList = async () => {
        try {
            const response = await axios.get(`/api/mypage/star-review`, { withCredentials: 'true'});
            const data = response.data;
            console.log(response.data)
            
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    // react-query
    const ReviewQuery = useQuery({
        queryKey: ["review-list"],
        queryFn: fetchReviewList
    })

    // save mark book: start date, end date
    const CalIndexFunc = (date) => {
        return ReviewQuery.data.reviewList.findIndex((x) => moment(x.endDate).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD"))
    }

    const checkGoal = async () => {
        try {
            const response = await axios.get(`/api/mypage/goal/check`, { withCredentials: 'true'});
            console.log("checkgoal: ", response.data)
            if (response.data.result === true) {
                setUserGoal(response.data.goal)
            }
            return response.data;
        } catch (err) {
            console.log(err)
        }
    }

    const checkReviewCnt = async () => {
        try {
            setCurrReviewCnt(ReviewQuery.data.reviewList.length)
        } catch (err) {
            console.log(err)
        }
    }

    const calRatingAvg = () => {
        try {
            const reviewList = ReviewQuery.data.reviewList
            let sum = 0
            if (reviewList && reviewList.length > 0) {
                reviewList.forEach(review => {
                    sum += review.evaluation;
                });
            }
            return sum / currReviewCnt
        } catch (error) {
            console.error("Error loading review data:", error);
        }
    }

    const handleSetGoal = () => {
        mutate(goalVal);
    };

    useEffect(() => {
        if (!ReviewQuery.isLoading && ReviewQuery.data) {
            checkGoal();
            checkReviewCnt();
        }
    }, [ReviewQuery.data]);

    return (
        !ReviewQuery.isFetching && ReviewQuery.data &&
        <>
            <NavBar />
                <StatisticsGrid className="container">
                <TitleText>나의 여행기록</TitleText>
                    <Goal>
                        <GoalModal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
                            >
                            <Content>
                                <Text>몇 권 완독을<br/>목표로 하시겠어요?</Text>
                                <InputBox type='text' placeholder='권 수를 입력하세요' onChange={(e) => {setGoalVal(e.target.value)}}></InputBox>
                                <BtnContainer>
                                    <Btn onClick={() => {handleSetGoal(); setModalIsOpen(false)}}>설정 완료</Btn>
                                </BtnContainer>
                                <CloseBtn size="45" onClick={() => setModalIsOpen(false)}></CloseBtn>
                            </Content>
                        </GoalModal>
                        <Background>
                            {!modalIsOpen && !goalVal && !userGoal &&(
                                <ContainerRocketBlind>
                                    <GoalBtn onClick={() => setModalIsOpen(true)}>2024년<br/>목표 설정하기</GoalBtn>
                                </ContainerRocketBlind>
                            )}
                            <ContainerRocket>
                                <Ground/>
                            </ContainerRocket>
                            <LevelHeightContainer>
                                <LevelHeightHorizonT></LevelHeightHorizonT>
                                <LevelHeightVertical></LevelHeightVertical>
                            </LevelHeightContainer>
                            <TextT>10000km<br/>{userGoal}권</TextT>
                            <Current $userGoal={userGoal} $currReviewCnt={currReviewCnt}>
                                <Icon> 
                                    <Rocket src={require("../../assets/ic-spaceship.svg").default}/>
                                    {currReviewCnt === 0 || !userGoal ? '' : <Fire src={require("../../assets/ic-fire.svg").default}/>}
                                </Icon>
                                <TextB $userGoal={userGoal} $currReviewCnt={currReviewCnt}>{((currReviewCnt / userGoal * 100) * (10000 / 100)).toFixed(2)}km<br/>{currReviewCnt}권</TextB>
                                <Line></Line>
                            </Current>
                        </Background>
                        <GoalText>우주로 가기 위한 여정</GoalText>
                    </Goal>
                    <Category>
                        <CategoryContainer/>
                        <CategoryText>읽은 카테고리</CategoryText>
                        <DrawChartContainer>
                            <DrawChart11 legendContainerId="1" />
                        </DrawChartContainer>
                    </Category>
                    <Type>
                        <TypeContainer/>
                        <TypeText>책 타입</TypeText>
                        <DrawChartContainer>
                            <DrawChart22 legendContainerId="2" />
                        </DrawChartContainer>
                    </Type>
                    <Review>
                        <ReviewText>지금까지 남긴 별점</ReviewText>
                        <StarText>
                            <FaStar style={{marginRight: '10px'}}/>
                            {ReviewQuery.data.findMyReview ? calRatingAvg().toFixed(2) : 0}
                        </StarText>
                        <BookText>
                            <BiSolidBook style={{marginRight: '10px'}}/>
                            {currReviewCnt}
                        </BookText>
                        <StarChart/>
                    </Review>
                    <CalendarContainer>
                        <CalendarBox>
                        <CalendarText>월별 달력</CalendarText>
                        <Calendar
                        style={{width: 100}}
                        minDetail="month"
                        maxDetail="month"
                        value={value}
                        onChange={onChange}
                        navigationLabel={null}
                        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                        tileContent={({ date }) => {
                            if (ReviewQuery.data.findMyReview && ReviewQuery.data.reviewList.find((x) => moment(x.endDate).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD"))) {
                                return (
                                    <>
                                        <BookImage src={ReviewQuery.data.reviewList[CalIndexFunc(date)]['bookImage']} />
                                    </>
                                )
                            }
                            }
                        }
                        />
                        </CalendarBox>
                    </CalendarContainer>
                </StatisticsGrid>
            <FooterBar />
        </>
    )
}

const StatisticsGrid = styled.div`
    display: grid;
    grid-template-areas:
    "title title"
    "goal review"
    "goal calendar"
    "category calendar"
    "type calendar";
    width: 100%;
    justify-content: center;
    column-gap: 50px;
`;

const TitleText = styled.p`
    grid-area: title;
    text-align: center;
    font-size: 35px;
    margin: 60px;
    color: #4659A9;
    font-family: "KOTRA_BOLD";
`;

const Goal = styled.div`
    grid-area: goal;
`;

const ContainerRocketBlind = styled.div`
    position: absolute;
    right: 83px;
    width: 445px;
    height: 727px;
    border-radius: 61px;
    background-color: rgba(0.88, 0.88, 0.88, 0.64);;
    z-index: 2;
`;

const GoalBtn = styled.button`
    position: absolute;
    right: 95px;
    bottom: 340px;
    width: 165px;
    height: 63px;
    border: none;
    border-radius: 50px;
    font-size: 15px;
    font-family: "KOTRA_GOTHIC";
    font-weight: 1000;
`;

const Background = styled.div`
    position: relative;
    display: flex;
`;

const ContainerRocket = styled.div`
    width: 445px;
    height: 727px;
    border-radius: 61px;
    background-image: linear-gradient(#000000, #10093E, #281453, #221C5E, 
                                    #2A2953, #6E6F8B, #336669, #328544, 
                                    #FFB628, #E5AA4A, #F3C984, #FFFBD7, 
                                    #EAE5E9, #D5CFFB);
    opacity: 0.5;
    margin: auto;
`;

const Ground = styled.div`
    position:absolute; 
    bottom: 0px;
    background-color: #CFBB9C;
    width: 445px;
    height: 101px;
    border-radius: 0 0 61px 61px;
`;

const Rocket = styled.img`
    width: auto;
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
    position: relative;
    /* z-index: 1; */
`;

const LevelHeightContainer = styled.div`
    position: absolute;
    right: 60px;
    top: 54px;
`;

const LevelHeightVertical = styled.div`
    border-left : 3px solid #000;
    height : 571px;
    width: 10px;
    position: absolute;
    left: 18px;
`;

const LevelHeightHorizonT = styled.div`
    border-bottom : 3px solid #000;
    border-top : 3px solid #000;
    height: 574px;
    width : 40px;
    position: absolute;
`;

const TextT = styled.p`
    position: absolute;
    right: 60px;
    top: 33px;
    text-align: right;
    font-size: 15px;
`;

const GoalText = styled.div`
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
    font-size: 20px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const Current = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 25px;
    // 600px이 최대
    bottom: ${({ $userGoal, $currReviewCnt }) => {
                if ($userGoal >= $currReviewCnt) {
                    return `${ ($currReviewCnt / $userGoal * 100) * (570 / 100) + 30}px`
                } else if ($userGoal <= $currReviewCnt) {
                    return '600px'
                } else {
                        return  '30px'
                }
            }};
`;

const TextB = styled.div`
    text-align: right;
    font-size: 15px;
    ${({ $userGoal, $currReviewCnt }) => {
        if ($userGoal <= $currReviewCnt) {
                return css`
                opacity: 0;
            `;
        } else {
            return css`
                opacity: 1;
            `;
        }
    }};
`;

const Line = styled.div`
    border-bottom : 1px solid #000;
    width : 30px;
    height: 9px;
    margin-left: 10px;
`;

const Category = styled.div`
    grid-area: category;
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
`; 

const CategoryText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 145px;
    bottom: 300px;
`;

const CategoryContainer = styled.div`
    width: 445px;
    height: 300px;
    border-radius: 61px;
    background: #4659A9;
    opacity: 0.3;
    margin-bottom: 30px;
`;

const DrawChart11 = styled(DrawChart1)`
`;

const DrawChartContainer = styled.div`
    position: absolute;
    left: 55px;
    bottom: 70px;
`;

const Type = styled.div`
    grid-area: type;
    position: relative;
`;

const TypeText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 185px;
    bottom: 300px;
`;

const DrawChart22 = styled(DrawChart2)`
`;

const TypeContainer = styled.div`
    width: 445px;
    height: 300px;
    border-radius: 61px;
    background: #97A4E8;
    opacity: 0.3;
    margin-bottom: 30px;
`;

const Review = styled.div`
    grid-area: review;
    width: 400px;
    display: flex;
    flex-direction: column; 
    justify-self: center;
    align-items: center;
    margin-bottom: 20px;
`;

const ReviewText = styled.p`
    text-align: center;
    width: 310px;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    margin-bottom: 0;
`;

const StarText = styled.div`
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    font-size: 32px;
`

const BookText = styled.div`
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    font-size: 32px;
    margin-bottom: 30px;
`

const CalendarContainer = styled.div`
    grid-area: calendar;
    position: relative;
    display:flex;
    /* margin-top: 20px; */
`;

const CalendarText = styled.p`
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    position: absolute;
    left: 210px;
    top: 30px;
`;

const CalendarBox = styled.div`
    width: 540px;
    height: 980px;
    border-radius: 61px;
    background: #D4D0EE;
    margin-bottom: 50px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 30px;
    margin-top: 50px;

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
`;

const Content = styled.div`
    width: 316px;
    height: 357px;
    position: absolute;
    top: 30%;
    left: 40%;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding-top: 70px;
`;

const GoalModal = styled(Modal)`
`;

const Text = styled.p`
    width: 234px;
    height: 87px;
    margin-left: 40px;
    font-size: 25px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    text-align: center;
    position: relative;
    border-bottom: 3px solid #4659A9;
`;

const InputBox = styled.input`
    width: 208px;
    font-size: 20px;
    font-family: "KOTRA_BOLD";
    border: 0;
    margin-left: 55px;
    margin-top: 30px;
    text-align:center;
    color: #4659A9;
    &::placeholder{
		color: #B7B5B5;
	}
    &:focus{
        outline: none;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 35px;
`;

const Btn = styled.button`
    width: 136px;
    height: 53px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

const CloseBtn = styled(HiMiniXMark)`
    fill: #D9D9D9;
    position: absolute;
    top: 20px;
    right: 20px;
`;

// component
const BookImage = styled.img`
    display: flex;
    width: 65px;
    height: 100px;
    border-radius: 5px;
    background-color: #dddddd;
`;

export default StatisticsPage;