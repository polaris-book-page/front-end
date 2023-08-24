import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { styled } from 'styled-components';

// exanple data
const data = [
    {
        name: '0',
        count: 1,
    },
    {
        name: '0.5',
        count: 1,
    },
    {
        name: '1',
        count: 5,
    },
    {
        name: '1.5',
        count: 1,
    },
    {
        name: '2',
        count: 3,
    },
    {
        name: '2.5',
        count: 1,
    },
    {
        name: '3',
        count: 4,
    },
    {
        name: '3.5',
        count: 1,
    },
    {
        name: '4',
        count: 2,
    },
    {
        name: '4.5',
        count: 1,
    },
    {
        name: '5',
        count: 1,
    }
];

const ReviewRatingChart = () => {
    
    return (
        <BarChart
            width={450}
            height={200}
            data={data}
            barSize={12}
            >
            <XAxis dataKey='name' tick={{ fill: '#ffffff', fontFamily: 'KOTRA_BOLD', fontSize: 16 }} axisLine={false} tickLine={false} />
            <Bar dataKey='count' fill='#ffffff' label={{ position: 'top', fill: '#ffffff', fontFamily: 'KOTRA_GOTHIC', fontSize: 12  }} />
        </BarChart>
    );
}

export default ReviewRatingChart;