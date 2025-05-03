import { sql } from '@vercel/postgres';
import { Game, Employee, Message, Document, Turn } from '../types';

// Type mappings for database results
type DbGame = {
  id: string;
  company_name: string;
  user_id: string;
  current_turn: number;
  created_at: Date;
  updated_at: Date;
};

type DbEmployee = {
  id: string;
  name: string;
  role: string;
  traits: string[];
  game_id: string;
  created_at: Date;
  updated_at: Date;
};

type DbMessage = {
  id: string;
  employee_id: string;
  channel: string;
  content: string;
  is_private: boolean;
  turn_number: number;
  created_at: Date;
};

type DbDocument = {
  id: string;
  game_id: string;
  content: string;
  type: 'strategy' | 'other';
  version: number;
  created_at: Date;
  updated_at: Date;
};

type DbTurn = {
  id: string;
  game_id: string;
  number: number;
  strategy_snapshot: string;
  created_at: Date;
};

// Helper functions to map database types to application types
function mapGame(dbGame: DbGame): Game {
  return {
    id: dbGame.id,
    companyName: dbGame.company_name,
    userId: dbGame.user_id,
    currentTurn: dbGame.current_turn,
    createdAt: dbGame.created_at,
    updatedAt: dbGame.updated_at,
  };
}

function mapEmployee(dbEmployee: DbEmployee): Employee {
  return {
    id: dbEmployee.id,
    name: dbEmployee.name,
    role: dbEmployee.role,
    traits: dbEmployee.traits,
    gameId: dbEmployee.game_id,
    createdAt: dbEmployee.created_at,
    updatedAt: dbEmployee.updated_at,
  };
}

function mapMessage(dbMessage: DbMessage): Message {
  return {
    id: dbMessage.id,
    employeeId: dbMessage.employee_id,
    channel: dbMessage.channel,
    content: dbMessage.content,
    private: dbMessage.is_private,
    turnNumber: dbMessage.turn_number,
    createdAt: dbMessage.created_at,
  };
}

function mapDocument(dbDocument: DbDocument): Document {
  return {
    id: dbDocument.id,
    gameId: dbDocument.game_id,
    content: dbDocument.content,
    type: dbDocument.type,
    version: dbDocument.version,
    createdAt: dbDocument.created_at,
    updatedAt: dbDocument.updated_at,
  };
}

function mapTurn(dbTurn: DbTurn): Turn {
  return {
    id: dbTurn.id,
    gameId: dbTurn.game_id,
    number: dbTurn.number,
    strategySnapshot: dbTurn.strategy_snapshot,
    createdAt: dbTurn.created_at,
  };
}

export async function createGame(companyName: string, userId: string): Promise<Game> {
  const result = await sql<DbGame>`
    INSERT INTO games (company_name, user_id)
    VALUES (${companyName}, ${userId})
    RETURNING *
  `;
  return mapGame(result.rows[0]);
}

export async function getGame(gameId: string): Promise<Game | null> {
  const result = await sql<DbGame>`
    SELECT * FROM games WHERE id = ${gameId}
  `;
  return result.rows[0] ? mapGame(result.rows[0]) : null;
}

export async function createEmployee(
  gameId: string,
  name: string,
  role: string,
  traits: string[]
): Promise<Employee> {
  const result = await sql<DbEmployee>`
    INSERT INTO employees (game_id, name, role, traits)
    VALUES (${gameId}, ${name}, ${role}, ${traits})
    RETURNING *
  `;
  return mapEmployee(result.rows[0]);
}

export async function getEmployees(gameId: string): Promise<Employee[]> {
  const result = await sql<DbEmployee>`
    SELECT * FROM employees WHERE game_id = ${gameId}
  `;
  return result.rows.map(mapEmployee);
}

export async function createMessage(
  employeeId: string,
  channel: string,
  content: string,
  isPrivate: boolean,
  turnNumber: number
): Promise<Message> {
  const result = await sql<DbMessage>`
    INSERT INTO messages (employee_id, channel, content, is_private, turn_number)
    VALUES (${employeeId}, ${channel}, ${content}, ${isPrivate}, ${turnNumber})
    RETURNING *
  `;
  return mapMessage(result.rows[0]);
}

export async function getMessages(
  gameId: string,
  channel: string,
  turnNumber?: number
): Promise<Message[]> {
  const result = await sql<DbMessage>`
    SELECT m.* FROM messages m
    JOIN employees e ON m.employee_id = e.id
    WHERE e.game_id = ${gameId}
    AND m.channel = ${channel}
    ${turnNumber ? sql`AND m.turn_number = ${turnNumber}` : sql``}
    ORDER BY m.created_at ASC
  `;
  return result.rows.map(mapMessage);
}

export async function createDocument(
  gameId: string,
  content: string,
  type: 'strategy' | 'other'
): Promise<Document> {
  const result = await sql<DbDocument>`
    INSERT INTO documents (game_id, content, type)
    VALUES (${gameId}, ${content}, ${type})
    RETURNING *
  `;
  return mapDocument(result.rows[0]);
}

export async function getDocument(
  gameId: string,
  type: 'strategy' | 'other'
): Promise<Document | null> {
  const result = await sql<DbDocument>`
    SELECT * FROM documents
    WHERE game_id = ${gameId}
    AND type = ${type}
    ORDER BY version DESC
    LIMIT 1
  `;
  return result.rows[0] ? mapDocument(result.rows[0]) : null;
}

export async function createTurn(
  gameId: string,
  number: number,
  strategySnapshot: string
): Promise<Turn> {
  const result = await sql<DbTurn>`
    INSERT INTO turns (game_id, number, strategy_snapshot)
    VALUES (${gameId}, ${number}, ${strategySnapshot})
    RETURNING *
  `;
  return mapTurn(result.rows[0]);
}

export async function getTurn(gameId: string, number: number): Promise<Turn | null> {
  const result = await sql<DbTurn>`
    SELECT * FROM turns
    WHERE game_id = ${gameId}
    AND number = ${number}
  `;
  return result.rows[0] ? mapTurn(result.rows[0]) : null;
} 