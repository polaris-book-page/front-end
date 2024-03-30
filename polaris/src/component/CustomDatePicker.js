
import DatePicker from 'react-datepicker';
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const CustomDatePicker = ({ setDate, page, onDate}) => {
    const [selectedDate, setSelectedDate] = useState(new Date(setDate));
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <>
            <DatePicker
                calendarClassName='datePicker-wrapper'
                dayClassName={(d) => (d.getDate() === selectedDate.getDate() ? "datePicker-select" : "datePicker-unselect")}
                className={ page == "addreview" ? "datePicker-header-white" : "datePicker-header-blue" }
                
                dateFormat='yyyy.MM.dd'
                shouldCloseOnSelect
                minDate={new Date('2000-01-01')}
                maxDate={new Date()}
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date)
                    setCurrentDate(date)
                    onDate(date)
                }
                }
                withPortal
                formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                renderCustomHeader={
                    ({
                        date,
                        changeYear,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled
                    }) => (
                        <CustomHeaderContainer>
                            <MonthBox>
                                <MonthBtn
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}>
                                    <ArrowLeft color='#CBCDFA' width={10}  />
                                </MonthBtn>
                                <TitleText color={'#4659A9'} size={'17px'}>
                                    {date.getFullYear() + "년 "  + (date.getMonth() + 1) + "월"}
                                </TitleText>
                                <MonthBtn
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}>
                                    {currentDate.getMonth() == date.getMonth() && date.getFullYear() == currentDate.getFullYear() ? "" : <ArrowRight color='#CBCDFA' width={10}/>}
                                </MonthBtn>
                            </MonthBox>
                        </CustomHeaderContainer>
                    )
                        
                    
                }
            />
        </>
    )
}

// text
const TitleText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
`;

// container
const CustomHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
`;

// box
const MonthBox = styled.div`
    display: flex;
    align-items:center;
    gap: 30px;
`;

// component
const MonthBtn = styled.button`
    border: none;
    background: none;
`;


export default CustomDatePicker;