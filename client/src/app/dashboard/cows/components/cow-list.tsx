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
import { EditCowForm } from './edit-cow-form';
import { updateCow, deleteCow, fetchCows } from '@/lib/api';
import { Cow, SelectedCow } from '@/types';

export function CowList() {
    const [selectedCow, setSelectedCow] = useState<SelectedCow>(null);

    const {
        data: cows,
        isLoading,
        isError,
    } = useQuery<Cow[]>({
        queryKey: ['cows'],
        queryFn: fetchCows,
    });

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateCow,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cows'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCow,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cows'] });
        },
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching cows</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Entry Date</TableHead>
                        <TableHead>Breed</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cows?.map((cow) => (
                        <TableRow key={cow.id}>
                            <TableCell>{cow.id}</TableCell>
                            <TableCell>{cow.entryDate}</TableCell>
                            <TableCell>{cow.breed}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            onClick={() => setSelectedCow(cow)}
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Cow</DialogTitle>
                                        </DialogHeader>
                                        {selectedCow && (
                                            <EditCowForm
                                                cow={selectedCow}
                                                onSubmit={(data: any) =>
                                                    updateMutation.mutate({
                                                        id: selectedCow.id,
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
                                    onClick={() => handleDelete(cow.id)}
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
