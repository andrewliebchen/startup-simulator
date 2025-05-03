export interface Employee {
  id: string;
  name: string;
  role: string;
  traits: string[];
  gameId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  employeeId: string;
  channel: string;
  content: string;
  private: boolean;
  turnNumber: number;
  createdAt: Date;
}

export interface Game {
  id: string;
  companyName: string;
  userId: string;
  currentTurn: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  gameId: string;
  content: string;
  type: 'strategy' | 'other';
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Turn {
  id: string;
  gameId: string;
  number: number;
  strategySnapshot: string;
  createdAt: Date;
}

export type Channel = '#general' | '#product' | '#random' | string; 