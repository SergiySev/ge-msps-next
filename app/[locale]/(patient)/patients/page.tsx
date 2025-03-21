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
      doctor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: [
      {
        created_at: 'desc',
      },
      {
        updated_at: 'desc',
      },
    ],
  });

  return (
    <>
      <h4 className="text-xl font-semibold">{t('last_30_patients')}</h4>
      <Patients patients={latestPatients} className="pt-8 pb-8" />
    </>
  );
}
