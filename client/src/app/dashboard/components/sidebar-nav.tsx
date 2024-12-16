'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        destroyCookie(null, 'user');
        router.push('/');
    };

    const NavLinks = () => (
        <div
            className={cn(
                'flex flex-col justify-between space-y-1 lg:space-y-2 flex-1',
                className
            )}
        >
            <div className='flex-1 flex flex-col space-y-1 lg:space-y-2'>
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDrawerOpen(false)}
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            pathname === item.href
                                ? 'bg-gray-500 hover:bg-muted'
                                : 'hover:bg-transparent hover:underline',
                            'justify-start',
                            'text-white'
                        )}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <Button
                onClick={handleLogout}
                className={cn('mt-auto hover:underline text-white bg-red-400')}
            >
                Logout
            </Button>
        </div>
    );

    return (
        <>
            {/* Mobile Drawer */}
            <div className='lg:hidden'>
                <Sheet
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                >
                    <SheetTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            className='fixed top-4 left-4 z-50'
                        >
                            <Menu className='h-6 w-6' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side='left'
                        className='bg-black text-white'
                    >
                        <NavLinks />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <nav
                className={cn(
                    'hidden lg:flex lg:flex-col lg:justify-between lg:space-y-1 lg:h-full',
                    className
                )}
                {...props}
            >
                <NavLinks />
            </nav>
        </>
    );
}
