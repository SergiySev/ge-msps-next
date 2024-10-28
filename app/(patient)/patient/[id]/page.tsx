import PatientForm from 'msps/lib/components/PatientForm/PatientForm';
import prisma from 'msps/lib/prisma';
import { notFound } from 'next/navigation';
import { type patient as Patient } from "@prisma/client";


export default async function PatientEditPage(props: { params: Promise<{id: string}> }) {
    const params = await props.params;
    const id = +params.id;

    const data = await prisma.patient.findUnique({
        where: { id }
    }) as Patient;

    if (!data) notFound();

    return (
        <>
           <PatientForm patient={data} />
        </>
    );
}