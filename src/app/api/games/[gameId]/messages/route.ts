import { NextResponse } from 'next/server';
import { createMessage } from '@/lib/db/client';
import { sql } from '@vercel/postgres';

export async function POST(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: { params: { gameId: string } }
) {
  try {
    const { employeeId, channel, content, isPrivate, turnNumber } = await request.json();

    if (!employeeId || !channel || !content || turnNumber === undefined) {
      return NextResponse.json(
        { error: 'Employee ID, channel, content, and turn number are required' },
        { status: 400 }
      );
    }

    const message = await createMessage(
      employeeId,
      channel,
      content,
      isPrivate || false,
      turnNumber
    );
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get('channel');
    const gameId = params.gameId;

    if (!channel) {
      return NextResponse.json(
        { error: 'Channel is required' },
        { status: 400 }
      );
    }

    const { rows } = await sql`
      SELECT * FROM messages 
      WHERE game_id = ${gameId} 
      AND channel = ${channel}
      ORDER BY created_at ASC
    `;

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
} 