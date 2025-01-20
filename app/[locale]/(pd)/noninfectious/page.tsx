import NoninfectiousForm from 'msps/lib/components/forms/Noninfectious/NoninfectiousForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NonifectiousAddPage() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  return (
    <>
      <h4 className="text-xl font-semibold">{t('noninfectious_add')}</h4>
      <NoninfectiousForm
        className="mt-8"
        data={{
          other_comment: '',
        }}
      />
    </>
  );
}
