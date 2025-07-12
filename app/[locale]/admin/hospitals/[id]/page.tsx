import { isUserAdmin } from 'msps/lib/auth/authenticated';
import prisma from 'msps/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { HospitalForm } from 'msps/lib/components/forms';
import { type hospital as Hospital } from '@prisma/client';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

interface HospitalPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function HospitalPage({ params }: HospitalPageProps) {
  // Check if user is admin
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect('/');
  }

  // Await the params
  const { id } = await params;

  const t = await getTranslations('hospital');

  // Check if this is a new hospital or editing an existing one
  const isNewHospital = id === 'new';

  let hospital: Hospital | Partial<Hospital> = { active: true };

  if (!isNewHospital) {
    // Parse the ID and fetch the hospital for editing
    const hospitalId = parseInt(id);
    if (isNaN(hospitalId)) {
      notFound();
    }

    // Fetch the hospital
    const existingHospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
    });

    if (!existingHospital) {
      notFound();
    }

    hospital = existingHospital;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/admin/hospitals"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800"
        aria-label={t('back_to_list')}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        {t('back_to_list')}
      </Link>

      <div>
        <h4 className="text-2xl font-semibold mb-6">
          {t(isNewHospital ? 'add' : 'edit')}
          {!isNewHospital && 'name' in hospital && `: ${hospital.name}`}
        </h4>

        <div className="p-6">
          <HospitalForm data={hospital} />
        </div>
      </div>
    </div>
  );
}
