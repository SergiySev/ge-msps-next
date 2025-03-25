import prisma from 'msps/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from 'msps/lib/auth/authenticated';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = +(await params).id;
    const session = await getAuthSession();

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid patient ID' }, { status: 400 });
    }

    // Get the patient record with hospital_id filter
    const patient = await prisma.patient.findUnique({
      where: {
        id,
        hospital_id: session.hospitalId, // Filter by user's hospital
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        personal_id: true,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Failed to fetch patient:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
