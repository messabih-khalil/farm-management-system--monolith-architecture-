'use client';
import { Metadata } from 'next';
import { SignInForm } from './components/sign-in-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/');
        }
    }, [router]);
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden'>
                {/* Right Side: Form */}
                <div className='w-full lg:w-1/2 p-8'>
                    <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
                        Sign In
                    </h1>
                    <SignInForm />
                </div>
                {/* Left Side: Image */}
                <div
                    className='hidden lg:block w-1/2 bg-cover bg-center'
                    style={{
                        backgroundImage:
                            'url("https://images.pexels.com/photos/4919737/pexels-photo-4919737.jpeg?auto=compress&cs=tinysrgb&w=1200)',
                    }}
                ></div>
            </div>
        </div>
    );
}
