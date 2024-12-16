'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMilkProduction } from '@/lib/api';

// Updated formSchema with non-empty date validation
const formSchema = z.object({
    date: z.string().nonempty('Date is required'),
    milkQuantityLiters: z
        .number()
        .positive('Milk quantity must be greater than 0'),
});

export function AddMilkProductionForm() {
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addMilkProduction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['milkProduction'] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '',
            milkQuantityLiters: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        addMutation.mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
            >
                <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input
                                    type='date'
                                    placeholder='Select production date'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='milkQuantityLiters'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Milk Quantity (Liters)</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    placeholder='Enter milk quantity'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Add Milk Production Record</Button>
            </form>
        </Form>
    );
}
