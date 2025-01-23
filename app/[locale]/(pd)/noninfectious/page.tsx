import NoninfectiousForm from 'msps/lib/components/forms/Noninfectious/NoninfectiousForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NonifectiousAddPage({
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
      <h4 className="text-xl font-semibold">{t('noninfectious_add')}</h4>
      <NoninfectiousForm
        className="mt-8"
        data={{
          other_comment: '',
          patient_id,
        }}
      />
    </>
  );
}
