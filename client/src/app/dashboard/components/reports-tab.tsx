'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { fetchCows, fetchMedicalChecks, fetchBirths } from '@/lib/api';

export function ReportsTab() {
    const {
        data: cows,
        isLoading: cowsLoading,
        isError: cowsError,
    } = useQuery({ queryKey: ['cows'], queryFn: fetchCows });
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

    if (cowsLoading || checksLoading || birthsLoading)
        return <div>Loading reports...</div>;
    if (cowsError || checksError || birthsError)
        return <div>Error loading reports</div>;

    // Calculate breed distribution
    const breedDistribution = cows?.reduce((acc: any, cow) => {
        acc[cow.breed] = (acc[cow.breed] || 0) + 1;
        return acc;
    }, {});

    // Calculate health statistics
    const totalChecks = medicalChecks?.length ?? 0;
    const healthyChecks =
        medicalChecks?.filter((check) => check.disease === 'None').length ??
        100;
    const healthPercentage = (healthyChecks / totalChecks) * 100;

    return (
        <div className='space-y-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Breed Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Breed</TableHead>
                                <TableHead>Count</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(breedDistribution)?.map(
                                ([breed, count]) => (
                                    <TableRow key={breed}>
                                        <TableCell>{breed}</TableCell>
                                        <TableCell>{count as string}</TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {/* <Card>
                <CardHeader>
                    <CardTitle>Health Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        {healthPercentage.toFixed(2)}% Healthy
                    </div>
                    <p className='text-sm text-muted-foreground'>
                        Based on {totalChecks} medical checks
                    </p>
                </CardContent>
            </Card> */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Births</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mother Cow ID</TableHead>
                                <TableHead>Birth Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {births?.slice(0, 5)?.map((birth) => (
                                <TableRow key={birth.id}>
                                    <TableCell>{birth.motherCowId}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            birth.birthDate
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
