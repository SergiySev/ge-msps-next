import prisma from 'msps/lib/prisma';
import Patients from './Patients';

export default async function PatientsPage() {
  const latestPatients = await prisma.patient.findMany({
    take: 30,
    select: {
      id: true,
      last_name: true,
      first_name: true,
      birth_date: true,
      doctor_id: true,
      staff_patient_doctor_idTostaff: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: [
      {
        updated_at: 'desc',
      },
      {
        created_at: 'desc',
      },
    ],
  });

  const formattedPatients = latestPatients.map(patient => ({
    ...patient,
    birth_date: patient.birth_date.toLocaleDateString('en-GB'),
  }));

  return (
    <>
      <h4 className="text-xl font-semibold">პაციენტები (ბოლო 30)</h4>
      <Patients patients={formattedPatients} className="pt-8 pb-8" />
    </>
  );
}
