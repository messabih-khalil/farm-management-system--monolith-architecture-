'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { login } from '@/lib/api';

const formSchema = z.object({
    username: z.string().nonempty('Username is required'),
    password: z
        .string()
        .min(2, { message: 'Password must be at least 2 characters' })
        .nonempty('Password is required'),
});

export function SignInForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // @ts-ignore
            localStorage.setItem('user', JSON.stringify(data.user));

            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({ queryKey: ['cows'] });
            queryClient.invalidateQueries({ queryKey: ['medicalChecks'] });
            queryClient.invalidateQueries({ queryKey: ['births'] });
            queryClient.invalidateQueries({ queryKey: ['milkProduction'] });

            // Redirect to dashboard
            router.push('/dashboard');
        },
        onError: (error) => {
            // Handle login error
            console.error('Login failed:', error);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        loginMutation.mutate(values);
    }

    return (
        <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-semibold text-gray-700'>
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='Enter your username'
                                        className='px-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-red-500 text-xs mt-1' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-semibold text-gray-700'>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Enter your password'
                                        className='px-4 py-2 border rounded-md w-full focus:ring-2 '
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-red-500 text-xs mt-1' />
                            </FormItem>
                        )}
                    />
                    {loginMutation.isError && (
                        <Alert
                            variant='destructive'
                            className='mt-4'
                        >
                            <AlertDescription className='text-sm'>
                                Invalid username or password. Please try again.
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button
                        type='submit'
                        className='w-full py-3 mt-4 text-white rounded-md  focus:ring-2  transition-all'
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
