import { notFound } from 'next/navigation';
import prisma from 'msps/lib/prisma';
import ProfileHeader from './components/ProfileHeader';
import PatientSection from './components/PatientSection';
import { ReactNode } from 'react';
import { Divider } from "@heroui/react";
import ProfileNavigation from './components/ProfileNavigation';

export default async function ProfileLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string; id: string }>;
  children: ReactNode;
}) {
  const { id } = await params;
  const numericId = +id;

  const patient = await prisma.patient.findUnique({
    where: { id: numericId },
  });
  if (!patient) notFound();

  return (
    <div className="mb-8">
      <ProfileHeader patient={patient} />
      <PatientSection id={numericId} />
      <Divider className="md:col-span-2 border-dashed my-4" />
      <ProfileNavigation />
      <Divider className="md:col-span-2 border-dashed my-4" />
      {children}
    </div>
  );
}
