import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export default class Example extends PureComponent {
	static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';

	render() {
		return (
			<ResponsiveContainer width="60%" height={240} >
				<BarChart data={data} style={{ marginBottom: '10px' }}>
					<XAxis dataKey="name" axisLine={false} tickLine={false} ticks={['0', '1', '2', '3', '4', '5']} style={{ fontFamily: 'KOTRA_BOLD' }}/>
				<Bar dataKey="count" fill="#D9D9D9" radius={10} barSize={10} label={{ position: 'top' }}/>
				</BarChart>
			</ResponsiveContainer>
		);
	}
}
