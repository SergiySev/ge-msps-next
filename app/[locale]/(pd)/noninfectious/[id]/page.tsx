import NoninfectiousForm from 'msps/lib/components/forms/Noninfectious/NoninfectiousForm';
import { ProfileLink } from 'msps/lib/components/other';
import prisma from 'msps/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function NoninfectiousEditPage({ params }: { params: Promise<{ id: string }> }) {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const id = +(await params).id;

  const data = await prisma.noninfectious.findUnique({
    where: { id },
  });

  if (!data) notFound();

  return (
    <>
      <ProfileLink href={`/profile/${data.patient_id}/noninfectious/`} />
      <h4 className="text-xl font-semibold">{t('noninfectious_edit')}</h4>
      <NoninfectiousForm className="mt-8" data={data} />
    </>
  );
}
