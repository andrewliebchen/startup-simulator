import { NextResponse } from 'next/server';
import { createGame, getGame } from '@/lib/db/client';

export async function POST(request: Request) {
  try {
    const { companyName, userId } = await request.json();

    if (!companyName || !userId) {
      return NextResponse.json(
        { error: 'Company name and user ID are required' },
        { status: 400 }
      );
    }

    const game = await createGame(companyName, userId);
    return NextResponse.json(game);
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('id');

    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const game = await getGame(gameId);
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game' },
      { status: 500 }
    );
  }
} 