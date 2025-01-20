import { infectious_infection_type } from '@prisma/client';
import InfectiousForm from 'msps/lib/components/forms/Infectious/InfectiousForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function InfectiousAddPage() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  return (
    <>
      <h4 className="text-xl font-semibold">{t('infectious_add')}</h4>
      <InfectiousForm
        className="mt-8"
        data={{
          infection_type: infectious_infection_type.peritonitis,
          other_comment: '',
        }}
      />
    </>
  );
}
