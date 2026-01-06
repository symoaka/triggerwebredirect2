export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Submit a review request
export async function POST(req: Request) {
    try {
        const { sessionId, gameName, rank, link, notes } = await req.json();

        if (!sessionId || !gameName || !rank || !link) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const request = await prisma.reviewRequest.create({
            data: {
                sessionId,
                gameName,
                rank,
                link,
                notes,
            },
        });

        return NextResponse.json(request);
    } catch (error) {
        console.error('Error submitting review request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET: Get requests for a session
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
        return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    try {
        const requests = await prisma.reviewRequest.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(requests);
    } catch (error) {
        console.error('Error fetching review requests:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
