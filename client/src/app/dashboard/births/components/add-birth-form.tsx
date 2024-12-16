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
import { addBirth } from '@/lib/api';

const formSchema = z.object({
    motherCowId: z.string().nonempty('this field is required'),
    birthDate: z.string().nonempty('this field is required'),
});

export function AddBirthForm() {
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: addBirth,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['births'] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            motherCowId: '',
            birthDate: '',
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
                    name='motherCowId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mother Cow ID</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='birthDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                                <Input
                                    type='date'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Add Birth Record</Button>
            </form>
        </Form>
    );
}
