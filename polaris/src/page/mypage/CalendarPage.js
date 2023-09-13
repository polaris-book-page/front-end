import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendarPage = () => {

    // react-query

    // save mark book: start date, end date
     const [mark, setMark] = useState([]);

    return (
        <>
            <Calendar
                minDetail="month"
                maxDetail="month"
                navigationLabel={null}
                showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                className="mx-auto w-full text-sm border-b"
                />
        </>
    )
}

export default CalendarPage;