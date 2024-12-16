'use client';

import { MilkProduction } from '@/types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export function MilkProductionChart({ data }: { data: MilkProduction[] }) {
    const chartData = data?.map((record: MilkProduction) => ({
        date: new Date(record.date).toLocaleDateString(),
        milkQuantityLiters: record.milkQuantityLiters,
    }));

    return (
        <ResponsiveContainer
            width='100%'
            height={350}
        >
            <LineChart data={chartData}>
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
    );
}
