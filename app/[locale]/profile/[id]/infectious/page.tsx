import prisma from 'msps/lib/prisma';
import { DataTableView } from 'msps/lib/components/other';
import { IPagination } from 'msps/lib/types';
import { d } from 'msps/lib/validation/helpers/date';
import { searchParamsCache } from 'msps/lib/params/searchParams';
import { Prisma } from '@prisma/client';
import { getLocale, getTranslations } from 'next-intl/server';

type PageProps = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function InfectiousPage({ params, searchParams }: PageProps) {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  const id = +(await params).id;

  const { page, sorting, itemsPerPage } = await searchParamsCache.parse(searchParams);

  const orderBy: Prisma.infectiousOrderByWithRelationInput[] = sorting
    ? [{ created_at: Prisma.SortOrder.desc }, { updated_at: Prisma.SortOrder.desc }]
    : [{ date: Prisma.SortOrder.desc }];

  const [dbData, totalCount] = await prisma.$transaction([
    prisma.infectious.findMany({
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
        staff_infectious_created_byTostaff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        staff_infectious_updated_byTostaff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    }),
    prisma.infectious.count({
      where: { patient_id: id },
    }),
  ]);

  const data = dbData.map(item => {
    return {
      id: item.id,
      patient_id: item.patient_id,
      patient: item.patient.last_name + ' ' + item.patient.first_name,
      doctor:
        item.staff_infectious_created_byTostaff.last_name + ' ' + item.staff_infectious_created_byTostaff.first_name,
      date: d(item.date),
      creator: item.staff_infectious_created_byTostaff
        ? item.staff_infectious_created_byTostaff.last_name + ' ' + item.staff_infectious_created_byTostaff.first_name
        : '',
      updater: item.staff_infectious_updated_byTostaff
        ? item.staff_infectious_updated_byTostaff.last_name + ' ' + item.staff_infectious_updated_byTostaff.first_name
        : '',
      createdAt: d(item.created_at),
      updatedAt: d(item.updated_at),
    };
  });

  const linkValue = 'infectious';
  const title = t('tables.titles.assessments');

  const columns = [
    { key: 'log', value: t('tables.columns.log') },
    { key: 'doctor', value: t('tables.columns.doctor') },
    { key: 'edit', value: t('tables.columns.edit') },
  ];

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalCount / itemsPerPage),
    totalItems: totalCount,
    itemsPerPage,
  } as IPagination;

  return <DataTableView pagination={pagination} data={data} linkValue={linkValue} title={title} columns={columns} />;
}
