import prisma from 'msps/lib/prisma';
import Patients from './Patients';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function PatientsPage() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const latestPatients = await prisma.patient.findMany({
    take: 30,
    select: {
      id: true,
      last_name: true,
      first_name: true,
      birth_date: true,
      doctor_id: true,
      doctor: {
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
  }));

  return (
    <>
      <h4 className="text-xl font-semibold">{t('last_30_patients')}</h4>
      <Patients patients={formattedPatients} className="pt-8 pb-8" />
    </>
  );
}
