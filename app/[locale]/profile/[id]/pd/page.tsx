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

export default async function PDPage({ params, searchParams }: PageProps) {
  const id = +(await params).id;

  const { page, sorting, itemsPerPage } = await searchParamsCache.parse(searchParams);

  const orderBy: Prisma.pdOrderByWithRelationInput[] = sorting
    ? [{ created_at: Prisma.SortOrder.desc }, { updated_at: Prisma.SortOrder.desc }]
    : [{ date: Prisma.SortOrder.desc }];

  const [pd, totalCount] = await prisma.$transaction([
    prisma.pd.findMany({
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
        staff_pd_created_byTostaff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        staff_pd_updated_byTostaff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    }),
    prisma.pd.count({
      where: { patient_id: id },
    }),
  ]);

  const locale = getLocale();
  const t = await getTranslations({ locale });

  const data = pd.map(item => {
    return {
      id: item.id,
      patient_id: item.patient_id,
      doctor: item.staff_pd_created_byTostaff.last_name + ' ' + item.staff_pd_created_byTostaff.first_name,
      pd_modality: t(item.pd_modality),
      solution_per_input: t(item.solution_per_input),
      pd_ch_solution_136: item.pd_ch_solution_136,
      pd_ch_solution_227: item.pd_ch_solution_227,
      pd_ch_solution_386: item.pd_ch_solution_386,
      icodextrin: item.icodextrin,
      date: d(item.date),
      creator: item.staff_pd_created_byTostaff
        ? item.staff_pd_created_byTostaff.last_name + ' ' + item.staff_pd_created_byTostaff.first_name
        : '',
      updater: item.staff_pd_updated_byTostaff
        ? item.staff_pd_updated_byTostaff.last_name + ' ' + item.staff_pd_updated_byTostaff.first_name
        : '',
      createdAt: d(item.created_at),
      updatedAt: d(item.updated_at),
    };
  });

  const linkValue = 'pd';
  const title = 'პერიტონეული დიალიზი';

  const columns = [
    { key: 'log', value: ' ' },
    { key: 'doctor', value: 'ექიმი' },
    { key: 'date', value: 'თარიღი' },
    { key: 'pd_modality', value: 'PD მოდალობა' },
    { key: 'solution_per_input', value: 'ხსნარის დღის რაოდენობა' },
    { key: 'pd_ch_solution_136', value: '1.36%' },
    { key: 'pd_ch_solution_227', value: '2.27%' },
    { key: 'pd_ch_solution_386', value: '3.86%' },
    { key: 'icodextrin', value: 'აიკოდექსტრინი' },
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
