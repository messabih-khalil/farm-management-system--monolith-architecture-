'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './components/sidebar-nav';

// Navigation items for the sidebar
const sidebarNavItems = [
    { title: 'Overview', href: '/dashboard' },
    { title: 'Cows', href: '/dashboard/cows' },
    { title: 'Medical Checks', href: '/dashboard/medical-checks' },
    { title: 'Births', href: '/dashboard/births' },
    { title: 'Milk Production', href: '/dashboard/milk-production' },
];

// Props for the DashboardLayout component
interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter();

    // Uncomment and implement this for authentication check
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className='space-y-6 lg:space-y-0'>
            <MainContent>{children}</MainContent>
        </div>
    );
}

function Header() {
    return (
        <div className='hidden lg:block space-y-0.5'>
            <h2 className='text-2xl font-bold tracking-tight text-white'>
                Dashboard
            </h2>
            <p className='text-muted-foreground text-xs'>
                Manage your milk farm operations and view insights.
            </p>
        </div>
    );
}

function MainContent({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col lg:flex-row lg:space-x-12'>
            <aside className='lg:w-64 lg:flex lg:flex-col lg:fixed lg:h-screen lg:overflow-y-auto bg-gray-800 p-5'>
                <Header />
                <Separator className='my-6 hidden lg:block' />
                <div className='flex-1'>
                    <SidebarNav items={sidebarNavItems} />
                </div>
            </aside>
            <div className='flex-1 px-4 py-6 lg:pl-64 lg:pr-10 lg:my-10'>
                {children}
            </div>
        </div>
    );
}
