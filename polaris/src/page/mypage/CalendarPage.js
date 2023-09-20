import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from 'moment/moment';

const CalendarPage = () => {
    const [value, onChange] = useState(new Date());

    const port = process.env.REACT_APP_PORT
    const host = process.env.REACT_APP_API_URL

    // react-query

    const obj = [
        {
            endDate: "2023-09-20",
            image: "https://polaris-book.s3.ap-northeast-2.amazonaws.com/book/1691744659471_app_logo.png"
        },
        {
            endDate: "2023-09-21",
            image: "https://polaris-book.s3.ap-northeast-2.amazonaws.com/book/1691744659471_app_logo.png"
        },
        {
            endDate: "2023-09-24",
            image: "https://polaris-book.s3.ap-northeast-2.amazonaws.com/book/1691744659471_app_logo.png"
        }
    
    ]

    // save mark book: start date, end date

    return (
        <>
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
                            const review = Object.entries(obj).reduce((total, [id, item]) => {        
                                // if (item.endDate === moment(date).format("YYYY-MM-DD")) {
                                //     total.endDate = item.endDate;
                                //     total.image = item.image;
                                // }
                                const res = item.filter(i => i.endDate === moment(date).format("YYYY-MM-DD"))
                                
                                return res;
                            })
                            console.log("res: ", review)
                            // if (obj.find((x) => x.endDate === moment(date).format("YYYY-MM-DD"))) review.push(res) 
                            // if (obj.find((x) => x.endDate === moment(date).format("YYYY-MM-DD"))) {                         
                                return (
                                <>
                                    <BookImage>
                                            {/* <div>{review[0].endDate}</div> */}
                                        {/* <img src={} /> */}
                                    </BookImage>
                                </>
                            )
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
const BookImage = styled.div`

`;


export default CalendarPage;