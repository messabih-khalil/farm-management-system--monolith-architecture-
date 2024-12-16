'use client';

import { useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { EditMedicalCheckForm } from './edit-medical-check-form';
import {
    updateMedicalCheck,
    deleteMedicalCheck,
    fetchMedicalChecks,
} from '@/lib/api';
import { MedicalCheck, SelectedMedicalCheck } from '@/types';

export function MedicalCheckList() {
    const [selectedCheck, setSelectedCheck] =
        useState<SelectedMedicalCheck>(null);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateMedicalCheck,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicalChecks'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteMedicalCheck,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicalChecks'] });
        },
    });

    const {
        data: medicalChecks,
        isLoading,
        isError,
    } = useQuery<MedicalCheck[]>({
        queryKey: ['medicalChecks'],
        queryFn: fetchMedicalChecks,
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching medical checks</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cow ID</TableHead>
                        <TableHead>Check Date</TableHead>
                        <TableHead>Disease</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medicalChecks?.map((check) => (
                        <TableRow key={check.id}>
                            <TableCell>{check.id}</TableCell>
                            <TableCell>{check.cowId}</TableCell>
                            <TableCell>{check.checkDate}</TableCell>
                            <TableCell>{check.disease}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            onClick={() =>
                                                setSelectedCheck(check)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit Medical Check
                                            </DialogTitle>
                                        </DialogHeader>
                                        {selectedCheck && (
                                            <EditMedicalCheckForm
                                                check={selectedCheck}
                                                onSubmit={(data: any) =>
                                                    updateMutation.mutate({
                                                        id: selectedCheck.id,
                                                        ...data,
                                                    })
                                                }
                                            />
                                        )}
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant='destructive'
                                    className='ml-2'
                                    onClick={() => handleDelete(check.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
