import { notFound } from 'next/navigation';
import prisma from 'msps/lib/prisma';
import DiseasesView from '../components/DiseasesSection';

export default async function DiseasePage({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  const patient = await prisma.patient.findUnique({
    where: { id },
  });

  if (!patient) notFound();

  return <DiseasesView data={patient} />;
}
