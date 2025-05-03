import { NextResponse } from 'next/server';
import { createTurn, getTurn } from '@/lib/db/client';

export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { number, strategySnapshot } = await request.json();

    if (number === undefined || !strategySnapshot) {
      return NextResponse.json(
        { error: 'Turn number and strategy snapshot are required' },
        { status: 400 }
      );
    }

    const turn = await createTurn(params.gameId, number, strategySnapshot);
    return NextResponse.json(turn);
  } catch (error) {
    console.error('Error creating turn:', error);
    return NextResponse.json(
      { error: 'Failed to create turn' },
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
    const number = searchParams.get('number');

    if (!number) {
      return NextResponse.json(
        { error: 'Turn number is required' },
        { status: 400 }
      );
    }

    const turn = await getTurn(params.gameId, parseInt(number));
    if (!turn) {
      return NextResponse.json(
        { error: 'Turn not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(turn);
  } catch (error) {
    console.error('Error fetching turn:', error);
    return NextResponse.json(
      { error: 'Failed to fetch turn' },
      { status: 500 }
    );
  }
} 