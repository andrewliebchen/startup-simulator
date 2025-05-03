import { Game, Employee, Message, Document, Turn } from '../types';

export async function createNewGame(companyName: string, userId: string): Promise<Game> {
  // TODO: Implement actual API call
  return {
    id: crypto.randomUUID(),
    companyName,
    userId,
    currentTurn: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function advanceTurn(gameId: string): Promise<{
  messages: Message[];
  turn: Turn;
}> {
  // TODO: Implement actual API call
  return {
    messages: [],
    turn: {
      id: crypto.randomUUID(),
      gameId,
      number: 1,
      strategySnapshot: '',
      createdAt: new Date(),
    },
  };
}

export async function hireEmployee(
  gameId: string,
  name: string,
  role: string,
  traits: string[]
): Promise<Employee> {
  // TODO: Implement actual API call
  return {
    id: crypto.randomUUID(),
    name,
    role,
    traits,
    gameId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function updateStrategy(
  gameId: string,
  content: string
): Promise<Document> {
  // TODO: Implement actual API call
  return {
    id: crypto.randomUUID(),
    gameId,
    content,
    type: 'strategy',
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
} 