'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { MedicalCheck } from '@/types';

export function RecentMedicalChecks({ data }: { data: MedicalCheck[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Cow ID</TableHead>
                    <TableHead>Check Date</TableHead>
                    <TableHead>Disease</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((check) => (
                    <TableRow key={check.id}>
                        <TableCell>{check.cowId}</TableCell>
                        <TableCell>
                            {new Date(check.checkDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{check.disease}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
