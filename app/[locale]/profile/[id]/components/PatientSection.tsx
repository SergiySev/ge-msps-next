import prisma from 'msps/lib/prisma';
import PatientView from './PatientView';
import { notFound } from 'next/navigation';

export default async function PatientSection({ id }: { id: number }) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      staff_patient_doctor_idTostaff: {
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
