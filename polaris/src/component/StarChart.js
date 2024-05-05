import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { useQueryClient } from '@tanstack/react-query'

const data = [
    {
        name: '0',
        count: 0,
    },
    {
        name: '0.5',
        count: 0,
    },
    {
        name: '1',
        count: 0,
    },
    {
        name: '1.5',
        count: 0,
    },
    {
        name: '2',
        count: 0,
    },
    {
        name: '2.5',
        count: 0,
    },
    {
        name: '3',
        count: 0,
    },
    {
        name: '3.5',
        count: 0,
    },
    {
        name: '4',
        count: 0,
    },
    {
        name: '4.5',
        count: 0,
    },
    {
        name: '5',
        count: 0,
    }
];

const StarChart = () => {
    const queryClient = useQueryClient();
    const [starData, setStarData] = useState([]);
    
    const loadReview = async () => {
        try {
            const fetchReview = await queryClient.getQueryData(["review-list"]);
            const reviewList = fetchReview.reviewList
            if (reviewList && reviewList.length > 0) {
                const userStar = [...data];
                reviewList.forEach(review => {
                    const evaluation = review.evaluation;
                    const index = userStar.findIndex(item => item.name === String(evaluation));
                    if (index !== -1) {
                        userStar[index].count += 1; 
                    }
                });
                setStarData(userStar);
            }
        } catch (error) {
            console.error("Error loading review data:", error);
        }
    }

    useEffect(() => {
        loadReview();
    }, []);

    return (
        <ResponsiveContainer width="60%" height={240} >
            <BarChart data={starData} style={{ marginBottom: '10px' }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} ticks={['0', '1', '2', '3', '4', '5']} style={{ fontFamily: 'KOTRA_BOLD' }}/>
            <Bar dataKey="count" fill="#D9D9D9" radius={10} barSize={10} label={{ position: 'top' }}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StarChart;