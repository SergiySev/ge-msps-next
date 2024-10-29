import PatientForm from 'msps/lib/components/PatientForm/PatientForm';
import prisma from 'msps/lib/prisma';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function PatientEditPage({ params }: { params: Promise<{ id: string }> }) {
    const id = +(await params).id;

    const data = await prisma.patient.findUnique({
        where: { id }
    });

    if (!data) notFound();

    return (
        <>
           <PatientForm patient={data} />
        </>
    );
}