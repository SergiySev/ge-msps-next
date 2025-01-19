import { patient as Patient } from '@prisma/client';
import PatientForm from 'msps/lib/components/forms/PatientForm/PatientForm';
import prisma from 'msps/lib/prisma';

const emptyPatient: Partial<Patient> = {
  sex: 'male',
};

export default async function PatientCreatePage() {
  const regions = await prisma.region.findMany({
    orderBy: {
      weight: 'asc',
    },
  });

  emptyPatient.region_id = regions[0].id;

  return (
    <>
      <h4 className="text-xl font-semibold">პაციენტის დამატება</h4>
      <PatientForm className="mt-8" patient={emptyPatient} regions={regions} />
    </>
  );
}
