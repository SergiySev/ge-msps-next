import prisma from 'msps/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from 'msps/lib/auth/authenticated';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = +(await params).id;
    const session = await getAuthSession();

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid staff ID' }, { status: 400 });
    }

    // Get the staff record with hospital_id filter
    const staff = await prisma.staff.findUnique({
      where: {
        id,
        hospital_id: session.hospitalId, // Filter by user's hospital
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        role: true,
      },
    });

    if (!staff) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    return NextResponse.json(staff);
  } catch (error) {
    console.error('Failed to fetch staff member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
