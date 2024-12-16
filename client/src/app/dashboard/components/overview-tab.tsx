'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CowOverview } from './cow-overview';
import { MilkProductionChart } from './milk-production-chart';
import { RecentMedicalChecks } from './recent-medical-checks';
import { RecentBirths } from './recent-births';
import {
    fetchCows,
    fetchMilkProduction,
    fetchMedicalChecks,
    fetchBirths,
} from '@/lib/api';

export function OverviewTab() {
    const {
        data: cows,
        isLoading: cowsLoading,
        isError: cowsError,
    } = useQuery({ queryKey: ['cows'], queryFn: fetchCows });
    const {
        data: milkProduction,
        isLoading: milkLoading,
        isError: milkError,
    } = useQuery({
        queryKey: ['milkProduction'],
        queryFn: fetchMilkProduction,
    });
    const {
        data: medicalChecks,
        isLoading: checksLoading,
        isError: checksError,
    } = useQuery({ queryKey: ['medicalChecks'], queryFn: fetchMedicalChecks });
    const {
        data: births,
        isLoading: birthsLoading,
        isError: birthsError,
    } = useQuery({ queryKey: ['births'], queryFn: fetchBirths });

    if (cowsLoading || milkLoading || checksLoading || birthsLoading) {
        return <div>Loading overview...</div>;
    }

    if (cowsError || milkError || checksError || birthsError) {
        return <div>Error loading overview data</div>;
    }

    const generatedMilk = milkProduction?.productions ?? [];

    const totalCows = cows?.length;
    const todayMilkProduction =
        generatedMilk[generatedMilk.length - 1]?.milkQuantityLiters ?? 0;
    const weeklyMedicalChecks = medicalChecks?.filter((check) => {
        const checkDate = new Date(check.checkDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return checkDate >= weekAgo;
    }).length;
    const monthlyBirths = births?.filter((birth) => {
        if (birth.birthDate) {
            const birthDate = new Date(birth.birthDate);
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return birthDate >= monthAgo;
        }
    }).length;

    return (
        <>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Cows
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-2xl font-bold'>{totalCows}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Milk Production (Today)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-2xl font-bold'>
                            {todayMilkProduction.toFixed(2)} L
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Medical Checks (This Week)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-2xl font-bold'>
                            {weeklyMedicalChecks}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Births (This Month)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-2xl font-bold'>{monthlyBirths}</p>
                    </CardContent>
                </Card>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                <Card className='lg:col-span-4'>
                    <CardHeader>
                        <CardTitle>Milk Production Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='pl-2'>
                        <MilkProductionChart
                            data={milkProduction?.productions ?? []}
                        />
                    </CardContent>
                </Card>
                <Card className='lg:col-span-3'>
                    <CardHeader>
                        <CardTitle>Cow Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CowOverview data={cows ?? []} />
                    </CardContent>
                </Card>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                <Card className='lg:col-span-4'>
                    <CardHeader>
                        <CardTitle>Recent Medical Checks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentMedicalChecks
                            data={medicalChecks?.slice(0, 5) ?? []}
                        />
                    </CardContent>
                </Card>
                <Card className='lg:col-span-3'>
                    <CardHeader>
                        <CardTitle>Recent Births</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentBirths data={births?.slice(0, 5) ?? []} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
