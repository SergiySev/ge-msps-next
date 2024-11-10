import { NextResponse } from 'next/server';
import prisma from 'msps/lib/prisma';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        weight: 'asc',
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
