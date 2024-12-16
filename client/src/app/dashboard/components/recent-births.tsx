'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Birth } from '@/types';

export function RecentBirths({ data } : {data: Birth[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Mother Cow ID</TableHead>
                    <TableHead>Birth Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((birth) => (
                    <TableRow key={birth.id}>
                        <TableCell>{birth.motherCowId}</TableCell>
                        <TableCell>
                            {new Date(birth.birthDate).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
