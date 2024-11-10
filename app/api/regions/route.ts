import { NextResponse } from 'next/server';
import prisma from 'msps/lib/prisma';

export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      orderBy: {
        weight: 'asc',
      },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error('Failed to fetch regions:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
