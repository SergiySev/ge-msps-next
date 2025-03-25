import prisma from 'msps/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from 'msps/lib/auth/authenticated';

const STAFF_SELECT = {
  id: true,
  first_name: true,
  last_name: true,
  role: true,
} as const;

const VALID_ROLES = ['doctor', 'nurse'] as const;
type StaffRole = (typeof VALID_ROLES)[number];

export async function GET(request: NextRequest) {
  try {
    const searchTerm = request.nextUrl.searchParams.get('q')?.trim();
    const role = request.nextUrl.searchParams.get('role')?.trim();
    const session = await getAuthSession();

    if (!searchTerm && !role) {
      return NextResponse.json({ error: 'Search term or role is required' }, { status: 400 });
    }

    if (role && !VALID_ROLES.includes(role as StaffRole)) {
      return NextResponse.json({ error: `Role must be one of: ${VALID_ROLES.join(', ')}` }, { status: 400 });
    }

    if (searchTerm && searchTerm.length < 3) {
      return NextResponse.json({ error: 'Search term must be at least 3 characters' }, { status: 400 });
    }

    const where = {
      hospital_id: session.hospitalId, // Only search within user's hospital
      ...(role && { role: role as StaffRole }),
      ...(searchTerm && {
        OR: [{ last_name: { contains: searchTerm } }, { first_name: { contains: searchTerm } }],
        role: { in: [...VALID_ROLES] },
      }),
    };

    const result = await prisma.staff.findMany({
      select: STAFF_SELECT,
      where,
      take: 10,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Staff search failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
