import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const user = req.cookies.get('user'); // Get the user data from cookies

    console.log(user);

    // If the user is logged in and visits the / page, redirect to /dashboard
    if (user && url.pathname === '/') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    // If the user is not logged in and tries to visit /dashboard or its sub-paths, redirect to /
    if (!user && url.pathname.startsWith('/dashboard')) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Allow the request to continue
}

export const config = {
    matcher: ['/', '/dashboard/:path*'], // Apply middleware to the root and any /dashboard
};
