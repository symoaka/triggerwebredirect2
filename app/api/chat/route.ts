export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Send a message
export async function POST(req: Request) {
    try {
        const { sessionId, text, sender } = await req.json();

        if (!sessionId || !text) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Find or create conversation
        let conversation = await prisma.conversation.findUnique({
            where: { sessionId },
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: { sessionId },
            });
        }

        // Create message
        const message = await prisma.message.create({
            data: {
                text,
                sender, // 'user' or 'admin'
                conversationId: conversation.id,
            },
        });

        // Update conversation timestamp
        await prisma.conversation.update({
            where: { id: conversation.id },
            data: { updatedAt: new Date() },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET: Get messages for a session
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
        return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    try {
        const conversation = await prisma.conversation.findUnique({
            where: { sessionId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        return NextResponse.json(conversation ? conversation.messages : []);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
