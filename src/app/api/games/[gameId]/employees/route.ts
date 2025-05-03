import { NextResponse } from 'next/server';
import { createEmployee, getEmployees } from '@/lib/db/client';

export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { name, role, traits } = await request.json();

    if (!name || !role || !traits) {
      return NextResponse.json(
        { error: 'Name, role, and traits are required' },
        { status: 400 }
      );
    }

    const employee = await createEmployee(params.gameId, name, role, traits);
    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const employees = await getEmployees(params.gameId);
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
} 