import KidneyAssessmentForm from 'msps/lib/components/forms/KidneyAssessmentForm/KidneyAssessmentForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function AssessmentAddPage({
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
      <h4 className="text-xl font-semibold">{t('kidney_assessment_add')}</h4>
      <KidneyAssessmentForm
        className="mt-8"
        data={{
          patient_id,
        }}
      />
    </>
  );
}
