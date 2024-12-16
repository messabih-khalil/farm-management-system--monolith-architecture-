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
import { MedicalCheck } from '@/types';

const formSchema = z.object({
    cowId: z.string(),
    checkDate: z.string(),
    disease: z.string(),
});

export function EditMedicalCheckForm({
    check,
    onSubmit,
}: {
    check: MedicalCheck;
    onSubmit: any;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cowId: check.cowId,
            checkDate: check.checkDate,
            disease: check.disease,
        },
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-8'
            >
                <FormField
                    control={form.control}
                    name='cowId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cow ID</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Update Medical Check</Button>
            </form>
        </Form>
    );
}
