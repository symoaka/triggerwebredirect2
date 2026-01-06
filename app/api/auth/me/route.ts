import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// GET: Check if user is logged in
export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ user: null });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return NextResponse.json({ user: decoded });
        } catch {
            return NextResponse.json({ user: null });
        }
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
