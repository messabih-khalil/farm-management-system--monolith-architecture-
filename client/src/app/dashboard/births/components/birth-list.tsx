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
import { EditBirthForm } from './edit-birth-form';
import { updateBirth, deleteBirth, fetchBirths } from '@/lib/api';
import { Birth, SelectedBirth } from '@/types';

export function BirthList() {
    const [selectedBirth, setSelectedBirth] = useState<SelectedBirth>(null);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateBirth,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['births'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteBirth,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['births'] });
        },
    });

    const {
        data: births,
        isLoading,
        isError,
    } = useQuery<Birth[]>({
        queryKey: ['births'],
        queryFn: fetchBirths,
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching births</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Mother Cow ID</TableHead>
                        <TableHead>Birth Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {births?.map((birth) => (
                        <TableRow key={birth.id}>
                            <TableCell>{birth.id}</TableCell>
                            <TableCell>{birth.motherCowId}</TableCell>
                            <TableCell>{birth.birthDate}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            onClick={() =>
                                                setSelectedBirth(birth)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit Birth Record
                                            </DialogTitle>
                                        </DialogHeader>
                                        {selectedBirth && (
                                            <EditBirthForm
                                                birth={selectedBirth}
                                                onSubmit={(data: any) =>
                                                    updateMutation.mutate({
                                                        id: selectedBirth.id,
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
                                    onClick={() => handleDelete(birth.id)}
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
