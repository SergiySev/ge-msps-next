import { infectious_infection_type } from '@prisma/client';
import InfectiousForm from 'msps/lib/components/forms/Infectious/InfectiousForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function InfectiousAddPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const { patientId } = await searchParams;
  const patient_id = +(patientId as string) || undefined;

  return (
    <>
      <h4 className="text-xl font-semibold">{t('infectious_add')}</h4>
      <InfectiousForm
        className="mt-8"
        data={{
          infection_type: infectious_infection_type.peritonitis,
          other_comment: '',
          patient_id,
        }}
      />
    </>
  );
}
