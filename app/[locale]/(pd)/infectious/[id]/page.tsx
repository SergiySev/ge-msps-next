import InfectiousForm from 'msps/lib/components/forms/Infectious/InfectiousForm';
import { ProfileLink } from 'msps/lib/components/other';
import prisma from 'msps/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function InfectiousEditPage({ params }: { params: Promise<{ id: string }> }) {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const id = +(await params).id;

  const data = await prisma.infectious.findUnique({
    where: { id },
  });

  if (!data) notFound();

  return (
    <>
      <ProfileLink href={`/profile/${data.patient_id}/infectious/`} />
      <h4 className="text-xl font-semibold">{t('infectious_edit')}</h4>
      <InfectiousForm className="mt-8" data={data} />
    </>
  );
}
