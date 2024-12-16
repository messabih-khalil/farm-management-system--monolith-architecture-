'use client';
import { Cow } from '@/types';
import { ReactNode } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function CowOverview({ data }: { data: Cow[] }) {
    // Calculate breed distribution
    const breedDistribution = data.reduce((acc: any, cow: Cow) => {
        acc[cow.breed] = (acc[cow.breed] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(breedDistribution)?.map(
        ([name, value]) => ({ name, value })
    );

    return (
        <div className='flex flex-col  items-center space-y-4 md:space-y-0 md:space-x-6'>
            {/* Pie Chart Container */}
            <div className='w-full  max-w-[250px] aspect-square'>
                <ResponsiveContainer
                    width='100%'
                    height='100%'
                >
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx='50%'
                            cy='50%'
                            innerRadius='60%'
                            outerRadius='80%'
                            fill='#8884d8'
                            paddingAngle={5}
                            dataKey='value'
                        >
                            {chartData?.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend Container */}
            <div className='w-full  space-y-2'>
                {chartData?.map((entry, index) => (
                    <div
                        key={entry.name}
                        className='flex items-center justify-between p-2 bg-gray-100 rounded-md'
                    >
                        <div className='flex items-center'>
                            <div
                                className='w-4 h-4 rounded-full mr-3'
                                style={{
                                    backgroundColor:
                                        COLORS[index % COLORS.length],
                                }}
                            />
                            <span className='font-medium'>{entry.name}</span>
                        </div>
                        <span className='font-bold'>
                            {entry.value as ReactNode}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
