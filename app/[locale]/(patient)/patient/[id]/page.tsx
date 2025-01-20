import PatientForm from 'msps/lib/components/forms/PatientForm/PatientForm';
import { ProfileLink } from 'msps/lib/components/other';
import prisma from 'msps/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function PatientEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  const locale = getLocale();
  const t = await getTranslations({ locale });

  const [patient, regions] = await Promise.all([
    prisma.patient.findUnique({
      where: { id },
    }),
    prisma.region.findMany({
      orderBy: {
        weight: 'asc',
      },
    }),
  ]);

  if (!patient) notFound();

  return (
    <>
      <ProfileLink href={`/profile/${patient.id}/diseases/`} />
      <h4 className="text-xl font-semibold">{t('patient_edit')}</h4>
      <PatientForm className="mt-8" patient={patient} regions={regions} />
    </>
  );
}
