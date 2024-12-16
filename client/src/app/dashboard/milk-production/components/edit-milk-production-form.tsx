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
import { MilkProduction } from '@/types';

const formSchema = z.object({
    date: z.string(),
    milkQuantityLiters: z.number().positive(),
});

export function EditMilkProductionForm({
    production,
    onSubmit,
}: {
    production: MilkProduction;
    onSubmit: any;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: production.date,
            milkQuantityLiters: production.milkQuantityLiters,
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
                    name='date'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
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
                    name='milkQuantityLiters'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Milk Quantity (Liters)</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
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
                <Button type='submit'>Update Milk Production Record</Button>
            </form>
        </Form>
    );
}
