import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment/moment';
import NavBar from "../../component/NavBar";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const CalendarPage = () => {
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

    return (
        !ReviewQuery.isLoading && ReviewQuery.data &&
        <>
            <NavBar/>
            <Container>
                <div style={{height: 50}} />
                <TitleText color={'#4659A9'} size={'25px'}>월별 달력</TitleText>
                <CalendarContainer>
                    <Calendar
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
                </CalendarContainer>
                <div style={{height: 50}} />
            </Container>
        </>
    )
}

// text
const TitleText = styled.text`
  color: ${(props) => props.color || 'gray'};
  font-family: "KOTRA_BOLD";
  font-size: ${(props) => props.size || '12px'};
  margin-bottom: 20px
`

// container
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CalendarContainer = styled.div`
    display: flex;
    background-color: #D4D0EE;
    padding: 50px;
    border-radius: 30px;
`;

// box

// component
const BookImage = styled.img`
    display: flex;
    width: 65px;
    height: 100px;
    border-radius: 5px;
    background-color: #dddddd;
`;


export default CalendarPage;