import KidneyAssessmentForm from 'msps/lib/components/forms/KidneyAssessmentForm/KidneyAssessmentForm';
import ProfileLink from 'msps/lib/components/other/ProfileLink/ProfileLInk';
import prisma from 'msps/lib/prisma';
import { notFound } from 'next/navigation';

export default async function AssessmentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  const assessment = await prisma.kidney_assessment.findUnique({
    where: { id },
  });

  if (!assessment) notFound();

  return (
    <>
      <ProfileLink href={`/profile/${assessment.patient_id}/kidney-assessment/`} />
      <h4 className="text-xl font-semibold">შეფასების რედაქტირება</h4>
      <KidneyAssessmentForm className="mt-8" kidneyAssessment={assessment} />
    </>
  );
}
