import prisma from 'msps/lib/prisma';
import PatientView from './PatientView';
import { notFound } from 'next/navigation';

export default async function PatientSection({ id }: { id: number }) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      doctor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      region: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!patient) notFound();

  return <PatientView patient={patient} />;
}
