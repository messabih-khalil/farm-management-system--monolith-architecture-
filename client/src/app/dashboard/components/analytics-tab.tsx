'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { fetchMilkProduction } from '@/lib/api';
import { MilkProduction } from '@/types';

export function AnalyticsTab() {
    const {
        data: milkProduction,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['milkProduction'],
        queryFn: fetchMilkProduction,
    });

    if (isLoading) return <div>Loading analytics...</div>;
    if (isError) return <div>Error loading analytics</div>;

    const productionMilk = milkProduction?.productions;

    // Calculate total milk production
    const totalMilkProduction =
        productionMilk?.reduce(
            (total: number, record: MilkProduction) =>
                total + record.milkQuantityLiters,
            0
        ) ?? 0;

    // Calculate average daily production
    const averageDailyProduction =
        totalMilkProduction / (productionMilk?.length ?? 1);

    // Prepare data for the chart
    const chartData = productionMilk?.map((record: MilkProduction) => ({
        date: new Date(record.date).toLocaleDateString(),
        milkQuantityLiters: record.milkQuantityLiters,
    }));

    return (
        <div className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Milk Production
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {totalMilkProduction.toFixed(2)} L
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Average Daily Production
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>
                            {averageDailyProduction.toFixed(2)} L
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Milk Production Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='h-[300px]'>
                        <ResponsiveContainer
                            width='100%'
                            height='100%'
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
