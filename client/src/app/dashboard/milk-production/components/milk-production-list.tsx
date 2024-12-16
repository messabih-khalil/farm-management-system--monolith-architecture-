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
import { EditMilkProductionForm } from './edit-milk-production-form';
import {
    updateMilkProduction,
    deleteMilkProduction,
    fetchMilkProduction,
} from '@/lib/api';
import { MilkProduction, SelectedMilkProduction } from '@/types';

export function MilkProductionList() {
    const [selectedProduction, setSelectedProduction] =
        useState<SelectedMilkProduction>(null);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateMilkProduction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['milkProduction'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteMilkProduction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['milkProduction'] });
        },
    });

    const {
        data: milkProduction,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['milkProduction'],
        queryFn: fetchMilkProduction,
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching milk production data</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Milk Quantity (Liters)</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* @ts-ignore */}
                    {milkProduction?.productions.map(
                        (production: MilkProduction) => (
                            <TableRow key={production.id}>
                                <TableCell>{production.id}</TableCell>
                                <TableCell>{production.date}</TableCell>
                                <TableCell>
                                    {production.milkQuantityLiters}
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant='outline'
                                                onClick={() =>
                                                    setSelectedProduction(
                                                        production
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Edit Milk Production Record
                                                </DialogTitle>
                                            </DialogHeader>
                                            {selectedProduction && (
                                                <EditMilkProductionForm
                                                    production={
                                                        selectedProduction
                                                    }
                                                    onSubmit={(data: any) =>
                                                        updateMutation.mutate({
                                                            id: selectedProduction.id,
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
                                        onClick={() =>
                                            handleDelete(production.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
