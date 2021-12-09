import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function TrainingsChart(props) {
    const data = props.data; 

    return (
    <ResponsiveContainer >
        <BarChart width={50} height={15} data={data}>
            <Bar         
                dataKey="duration" 
                fill="#8884d8"
                width={50} />
            <XAxis dataKey="activity" />
            <YAxis dataKey="duration" />
        </BarChart>
    </ResponsiveContainer>
    );
}
