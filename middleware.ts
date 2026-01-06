import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the user is visiting the home page
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect('https://discord.gg/triggeraim', 307);
    }
}

// Ensure it only runs for the root path
export const config = {
    matcher: '/',
};
