'use client';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import { Header } from './components/header';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

// export const metadata: Metadata = {
//     title: 'Milk Farm Management',
//     description: 'Manage your milk farm operations efficiently',
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
