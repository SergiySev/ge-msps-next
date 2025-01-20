import { pd_pd_modality, pd_solution_per_input } from '@prisma/client';
import { PDForm } from 'msps/lib/components/forms';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function PDAddPage() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  return (
    <>
      <h4 className="text-xl font-semibold">{t('pd_add')}</h4>
      <PDForm
        className="mt-8"
        data={{
          pd_modality: pd_pd_modality.CAPD,
          solution_per_input: pd_solution_per_input.lt_8,
        }}
      />
    </>
  );
}
