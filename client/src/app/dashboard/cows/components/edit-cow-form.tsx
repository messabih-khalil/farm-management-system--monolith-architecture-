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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Cow } from '@/types';

const formSchema = z.object({
    entryDate: z.string(),
    breed: z.enum(['Holstein', 'Montbeliarde']),
});

export function EditCowForm({ cow, onSubmit }: { cow: Cow; onSubmit: any }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entryDate: cow.entryDate,
            breed: cow.breed,
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
                    name='entryDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entry Date</FormLabel>
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
                <Button type='submit'>Update Cow</Button>
            </form>
        </Form>
    );
}
