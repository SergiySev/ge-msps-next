import prisma from 'msps/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = +(await params).id;

    if (!id || isNaN(id)) {
      return NextResponse.json(null, { status: 400 });
    }

    const result = await prisma.staff.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true,
      },
    });

    if (!result) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch staff member:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
