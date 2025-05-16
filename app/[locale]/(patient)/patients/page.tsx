import prisma from 'msps/lib/prisma';
import Patients from './Patients';
import { getTranslations } from 'next-intl/server';
import ServerPagination from 'msps/lib/components/ui/ServerPagination';

export default async function PatientsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string; [key: string]: string | undefined }>;
  params: { locale: string };
}) {
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale: params.locale });

  // Get the current page from the searchParams or default to 1
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const patientsPerPage = 50;
  const skip = (currentPage - 1) * patientsPerPage;

  // Fetch patients for the current page
  const patients = await prisma.patient.findMany({
    take: patientsPerPage,
    skip: skip,
    select: {
      id: true,
      last_name: true,
      first_name: true,
      birth_date: true,
      doctor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: [
      {
        created_at: 'desc',
      },
      {
        updated_at: 'desc',
      },
    ],
  });

  // Count total patients for pagination
  const totalPatients = await prisma.patient.count();
  const totalPages = Math.ceil(totalPatients / patientsPerPage);

  // Create base URL for pagination using params.locale which is directly available
  const baseUrl = `/${params.locale}/patients`;

  // Prepare query params for pagination
  const queryParams: Record<string, string> = {};
  // Copy all search params except 'page' to queryParams
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (key !== 'page' && value !== undefined) {
      queryParams[key] = value;
    }
  });

  return (
    <>
      <h4 className="text-xl font-semibold">
        {t('all_patients')}: {totalPatients}
      </h4>
      <ServerPagination totalPages={totalPages} currentPage={currentPage} baseUrl={baseUrl} queryParams={queryParams} />
      <Patients patients={patients} className="pt-8 pb-8" />
      <ServerPagination totalPages={totalPages} currentPage={currentPage} baseUrl={baseUrl} queryParams={queryParams} />
    </>
  );
}
