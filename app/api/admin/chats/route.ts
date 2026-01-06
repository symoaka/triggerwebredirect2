export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Fetch all conversations, ordered by most recently updated
        const conversations = await prisma.conversation.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1, // Only get the last message for preview
                },
            },
        });

        return NextResponse.json(conversations);
    } catch (error) {
        console.error('Error fetching admin chats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
