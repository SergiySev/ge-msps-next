import prisma from 'msps/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get('q')?.trim();

  if (!searchTerm || searchTerm.length < 3) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    const result = await prisma.patient.findMany({
      where: {
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
    return NextResponse.json(null, { status: 500 });
  }
}
