'use client';

import { useState } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCow } from '@/lib/api';

// Updated formSchema with non-empty entryDate validation
const formSchema = z.object({
    entryDate: z.string().nonempty('Entry date is required'),
    breed: z.enum(['Holstein', 'Montbeliarde']),
});

export function AddCowForm() {
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addCow,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cows'] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entryDate: '',
            breed: 'Holstein',
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
                    name='entryDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entry Date</FormLabel>
                            <FormControl>
                                <Input
                                    type='date'
                                    placeholder='Select an entry date'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='breed'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Breed</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a breed' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='Holstein'>
                                        Holstein
                                    </SelectItem>
                                    <SelectItem value='Montbeliarde'>
                                        Montbeliarde
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Add Cow</Button>
            </form>
        </Form>
    );
}
