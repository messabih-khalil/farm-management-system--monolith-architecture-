'use clien';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './components/overview-tab';
import { AnalyticsTab } from './components/analytics-tab';
import { ReportsTab } from './components/reports-tab';

export default function DashboardPage() {
    return (
        <>
            <div className='flex-col md:flex'>
                <div className='flex-1 space-y-4'>
                    <div className='flex items-center justify-between space-y-2'>
                        <h2 className='text-3xl font-bold tracking-tight'>
                            Dashboard
                        </h2>
                    </div>
                    <Tabs
                        defaultValue='overview'
                        className='space-y-4'
                    >
                        <TabsList>
                            <TabsTrigger value='overview'>Overview</TabsTrigger>
                            <TabsTrigger value='analytics'>
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value='reports'>Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value='overview'
                            className='space-y-4'
                        >
                            <OverviewTab />
                        </TabsContent>
                        <TabsContent
                            value='analytics'
                            className='space-y-4'
                        >
                            <AnalyticsTab />
                        </TabsContent>
                        <TabsContent
                            value='reports'
                            className='space-y-4'
                        >
                            <ReportsTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
