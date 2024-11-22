import KidneyAssessmentForm from 'msps/lib/components/forms/KidneyAssessmentForm/KidneyAssessmentForm';

export default async function AssessmentAddPage() {
  return (
    <>
      <h4 className="text-xl font-semibold">შეფასების დამატება</h4>
      <KidneyAssessmentForm className="mt-8" kidneyAssessment={{}} />
    </>
  );
}
