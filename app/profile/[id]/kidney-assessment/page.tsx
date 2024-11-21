import prisma from 'msps/lib/prisma';
import { ReactNode } from 'react';
import { DataTableView } from 'msps/lib/components/other';
import { IPagination } from 'msps/lib/types';
import { d } from 'msps/lib/validation/helpers/date';
import { searchParamsCache } from 'msps/lib/params/searchParams';
import { Prisma } from '@prisma/client';

export default async function KidneyAssessmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  children: ReactNode;
}) {
  const id = +(await params).id;

  const { page, sorting, itemsPerPage } = await searchParamsCache.parse(searchParams);
  console.log('params: ', page, sorting, itemsPerPage);

  const orderBy: Prisma.kidney_assessmentOrderByWithRelationInput[] = sorting
    ? [{ created_at: Prisma.SortOrder.desc }, { updated_at: Prisma.SortOrder.desc }]
    : [{ check_date: Prisma.SortOrder.desc }];

  const [kidneyAssessments, totalCount] = await prisma.$transaction([
    prisma.kidney_assessment.findMany({
      where: { patient_id: id },
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      orderBy: orderBy,
      include: {
        patient: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        staff_kidney_assessment_created_byTostaff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    }),
    prisma.kidney_assessment.count({
      where: { patient_id: id },
    }),
  ]);

  const data = kidneyAssessments.map(ka => {
    return {
      id: ka.id,
      patient_id: ka.patient_id,
      patient: ka.patient.last_name + ' ' + ka.patient.first_name,
      doctor:
        ka.staff_kidney_assessment_created_byTostaff.last_name +
        ' ' +
        ka.staff_kidney_assessment_created_byTostaff.first_name,
      gfr: ka.gfr,
      pet: ka.pet,
      ktv: ka.ktv,
      date: d(ka.check_date),
      comment: ka.ka_comment,
    };
  });

  const linkValue = 'kidney-assessment';
  const title = 'შეფასებები';

  const columns = [
    { key: 'doctor', value: 'ექიმი' },
    { key: 'gfr', value: 'GFR' },
    { key: 'ktv', value: 'Kt/V' },
    { key: 'pet', value: 'PET' },
    { key: 'edit', value: ' ' },
  ];

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalCount / itemsPerPage),
    totalItems: totalCount,
    itemsPerPage,
  } as IPagination;

  return <DataTableView pagination={pagination} data={data} linkValue={linkValue} title={title} columns={columns} />;
}
