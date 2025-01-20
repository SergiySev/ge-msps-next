import { patient as Patient } from '@prisma/client';
import PatientForm from 'msps/lib/components/forms/PatientForm/PatientForm';
import prisma from 'msps/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';

const emptyPatient: Partial<Patient> = {
  sex: 'male',
};

export default async function PatientCreatePage() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const regions = await prisma.region.findMany({
    orderBy: {
      weight: 'asc',
    },
  });

  emptyPatient.region_id = regions[0].id;

  return (
    <>
      <h4 className="text-xl font-semibold">{t('patient_add')}</h4>
      <PatientForm className="mt-8" patient={emptyPatient} regions={regions} />
    </>
  );
}
