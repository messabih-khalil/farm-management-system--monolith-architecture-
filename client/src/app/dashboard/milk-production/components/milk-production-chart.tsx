'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export function MilkProductionChart({ data }: { data: any }) {
    return (
        <div className='h-[400px] w-full'>
            <ResponsiveContainer
                width='100%'
                height='100%'
            >
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type='monotone'
                        dataKey='milkQuantityLiters'
                        stroke='#8884d8'
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
