import prisma from 'msps/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from 'msps/lib/auth/authenticated';

export async function GET(request: NextRequest) {
  try {
    const searchTerm = request.nextUrl.searchParams.get('q')?.trim();
    const session = await getAuthSession();

    if (!searchTerm || searchTerm.length < 3) {
      return NextResponse.json({ error: 'Search term must be at least 3 characters' }, { status: 400 });
    }

    const result = await prisma.patient.findMany({
      where: {
        hospital_id: session.hospitalId, // Filter by user's hospital
        OR: [
          { personal_id: { startsWith: searchTerm } },
          { last_name: { contains: searchTerm } },
          { first_name: { contains: searchTerm } },
        ],
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        personal_id: true,
      },
      take: 10,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Patient search failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
