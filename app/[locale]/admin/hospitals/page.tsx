import { isUserAdmin } from 'msps/lib/auth/authenticated';
import prisma from 'msps/lib/prisma';
import { redirect } from 'next/navigation';
import HospitalList from 'msps/lib/components/hospitals/HospitalList';

export default async function HospitalsPage() {
  // Check if user is admin
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect('/');
  }

  // Fetch all hospitals
  const hospitals = await prisma.hospital.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="container mx-auto p-4">
      <HospitalList hospitals={hospitals} />
    </div>
  );
}
