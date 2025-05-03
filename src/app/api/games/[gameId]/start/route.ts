import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { generateInitialEmployees } from '@/lib/ai/employeeGenerator';

export async function POST(
  request: Request,
  context: { params: { gameId: string } }
) {
  try {
    const { gameId } = context.params;
    
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    // Start a transaction
    const client = await sql.connect();
    try {
      await client.query('BEGIN');

      // 1. Create initial strategy document
      const initialStrategy = `# ${gameId} Strategy Document

## Vision
Our vision is to build a successful startup that delivers value to our customers.

## Mission
To create innovative solutions that solve real problems.

## Strategy
We will focus on building a strong team and developing our product iteratively.`;

      await client.query(
        `INSERT INTO documents (game_id, type, content)
         VALUES ($1, 'strategy', $2)`,
        [gameId, initialStrategy]
      );

      // 2. Generate initial employees
      const employees = await generateInitialEmployees();
      
      // 3. Insert employees
      for (const employee of employees) {
        await client.query(
          `INSERT INTO employees (game_id, name, role, traits)
           VALUES ($1, $2, $3, $4)`,
          [gameId, employee.name, employee.role, employee.traits]
        );
      }

      // 4. Create initial turn
      await client.query(
        `INSERT INTO turns (game_id, turn_number, status)
         VALUES ($1, 1, 'active')`,
        [gameId]
      );

      // 5. Update game status
      await client.query(
        `UPDATE games 
         SET status = 'active',
             started_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [gameId]
      );

      await client.query('COMMIT');

      return NextResponse.json({ 
        success: true,
        message: 'Game started successfully',
        gameId 
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error starting game:', error);
    return NextResponse.json(
      { error: 'Failed to start game' },
      { status: 500 }
    );
  }
} 