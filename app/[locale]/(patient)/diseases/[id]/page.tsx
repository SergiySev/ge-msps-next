import DiseasesForm from 'msps/lib/components/forms/DiseasesForm/DiseasesForm';
import { ProfileLink } from 'msps/lib/components/other';
import prisma from 'msps/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function PatientEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  const data = await prisma.patient.findUnique({
    where: { id },
  });

  const locale = getLocale();
  const t = await getTranslations({ locale });

  if (!data) notFound();

  return (
    <>
      <ProfileLink href={`/profile/${data.id}/diseases/`} />
      <h4 className="text-xl font-semibold">{t('patient_diseases')}</h4>
      <DiseasesForm data={data} />
    </>
  );
}
