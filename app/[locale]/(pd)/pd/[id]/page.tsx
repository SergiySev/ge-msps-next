import { PDForm } from 'msps/lib/components/forms';
import ProfileLink from 'msps/lib/components/other/ProfileLink/ProfileLInk';
import prisma from 'msps/lib/prisma';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function PDEditPage({ params }: { params: Promise<{ id: string }> }) {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const id = +(await params).id;

  const pd = await prisma.pd.findUnique({
    where: { id },
  });

  if (!pd) notFound();

  return (
    <>
      <ProfileLink href={`/profile/${pd.patient_id}/pd/`} />
      <h4 className="text-xl font-semibold">{t('pd_edit')}</h4>
      <PDForm className="mt-8" data={pd} />
    </>
  );
}
