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
import { addMedicalCheck } from '@/lib/api';

// Updated formSchema with non-empty checkDate validation
const formSchema = z.object({
    cowId: z.string().nonempty('this field is required'),
    checkDate: z.string().nonempty('Check date is required'),
    disease: z.string().nonempty('this field is required'),
});

export function AddMedicalCheckForm() {
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addMedicalCheck,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicalChecks'] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cowId: '',
            checkDate: '',
            disease: '',
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
                    name='cowId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cow ID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter Cow ID'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='checkDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Check Date</FormLabel>
                            <FormControl>
                                <Input
                                    type='date'
                                    placeholder='Select a check date'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='disease'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Disease</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter disease details'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Add Medical Check</Button>
            </form>
        </Form>
    );
}
