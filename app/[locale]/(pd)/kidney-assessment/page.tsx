import KidneyAssessmentForm from 'msps/lib/components/forms/KidneyAssessmentForm/KidneyAssessmentForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function AssessmentAddPage() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  return (
    <>
      <h4 className="text-xl font-semibold">{t('kidney_assessment_add')}</h4>
      <KidneyAssessmentForm className="mt-8" data={{}} />
    </>
  );
}
