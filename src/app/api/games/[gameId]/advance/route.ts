import { NextResponse } from 'next/server';
import { getGame, getEmployees, getDocument, getMessages, createMessage, createTurn } from '@/lib/db/client';
import { generateEmployeeMessages } from '@/lib/openai/client';

export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    // Get current game state
    const game = await getGame(params.gameId);
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Get all employees
    const employees = await getEmployees(params.gameId);
    if (employees.length === 0) {
      return NextResponse.json(
        { error: 'No employees found in the game' },
        { status: 400 }
      );
    }

    // Get current strategy document
    const strategyDoc = await getDocument(params.gameId, 'strategy');

    // Get recent messages from all channels
    const recentMessages = await Promise.all([
      getMessages(params.gameId, '#general', game.currentTurn),
      getMessages(params.gameId, '#product', game.currentTurn),
      getMessages(params.gameId, '#random', game.currentTurn),
    ]).then(messages => messages.flat());

    // Generate new messages using OpenAI
    const newMessages = await generateEmployeeMessages({
      gameId: params.gameId,
      employees,
      strategyDoc,
      currentTurn: game.currentTurn + 1,
      recentMessages,
    });

    // Save new messages to database
    const savedMessages = await Promise.all(
      newMessages.map(msg => createMessage(
        msg.employeeId,
        msg.channel,
        msg.content,
        msg.private,
        msg.turnNumber
      ))
    );

    // Create new turn
    const newTurn = await createTurn(
      params.gameId,
      game.currentTurn + 1,
      strategyDoc?.content || ''
    );

    return NextResponse.json({
      messages: savedMessages,
      turn: newTurn,
    });
  } catch (error) {
    console.error('Error advancing turn:', error);
    return NextResponse.json(
      { error: 'Failed to advance turn' },
      { status: 500 }
    );
  }
} 