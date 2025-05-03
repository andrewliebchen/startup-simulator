import { NextResponse } from 'next/server';
import { createDocument, getDocument } from '@/lib/db/client';

export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { content, type } = await request.json();

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Content and type are required' },
        { status: 400 }
      );
    }

    if (type !== 'strategy' && type !== 'other') {
      return NextResponse.json(
        { error: 'Type must be either "strategy" or "other"' },
        { status: 400 }
      );
    }

    const document = await createDocument(params.gameId, content, type);
    return NextResponse.json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
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
    const type = searchParams.get('type') as 'strategy' | 'other';

    if (!type) {
      return NextResponse.json(
        { error: 'Document type is required' },
        { status: 400 }
      );
    }

    if (type !== 'strategy' && type !== 'other') {
      return NextResponse.json(
        { error: 'Type must be either "strategy" or "other"' },
        { status: 400 }
      );
    }

    const document = await getDocument(params.gameId, type);
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
} 