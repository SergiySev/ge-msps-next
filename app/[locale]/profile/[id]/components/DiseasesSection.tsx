'use client';

import { CheckIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import { Button, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { patient as Patient } from '@prisma/client';
import { useTranslations } from 'next-intl';

type DiseaseKey = keyof Pick<
  Patient,
  | 'md_diabetes'
  | 'md_hypertension'
  | 'md_glomerulonephritis'
  | 'md_adptd'
  | 'md_lupus'
  | 'md_vasculitis'
  | 'md_amyloidosis'
  | 'md_unknown'
  | 'md_other'
  | 'cd_heart'
  | 'cd_cancer'
  | 'cd_a_pressure'
  | 'cd_p_pressure'
  | 'cd_cirrhosis'
  | 'cd_pqod'
  | 'cd_demention'
  | 'cd_other'
>;

export default function DiseasesView({ data }: { data: Patient }) {
  const t = useTranslations();
  const td = useTranslations('diseases');

  const mainDiseases: Array<{ key: DiseaseKey; value: string }> = [
    { key: 'md_diabetes', value: t('md_diabetes') },
    { key: 'md_hypertension', value: t('md_hypertension') },
    { key: 'md_glomerulonephritis', value: t('md_glomerulonephritis') },
    { key: 'md_adptd', value: t('md_adptd') },
    { key: 'md_lupus', value: t('md_lupus') },
    { key: 'md_vasculitis', value: t('md_vasculitis') },
    { key: 'md_amyloidosis', value: t('md_amyloidosis') },
    { key: 'md_unknown', value: t('md_unknown') },
    { key: 'md_other', value: t('md_other') },
  ];

  const comorbidDiseases: Array<{ key: DiseaseKey; value: string }> = [
    { key: 'cd_heart', value: t('cd_heart') },
    { key: 'cd_cancer', value: t('cd_cancer') },
    { key: 'cd_a_pressure', value: t('cd_a_pressure') },
    { key: 'cd_p_pressure', value: t('cd_p_pressure') },
    { key: 'cd_cirrhosis', value: t('cd_cirrhosis') },
    { key: 'cd_pqod', value: t('cd_pqod') },
    { key: 'cd_demention', value: t('cd_demention') },
    { key: 'cd_other', value: t('cd_other') },
  ];

  return (
    <div className="mt-4">
      <div className="flex w-full items-center space-x-2 p-2">
        <div className="w-1/2 font-bold">{td('title')}</div>
        <div className="w-1/2 text-right">
          <Button href={`/diseases/${data.id}`} as={Link} color="default" variant="light" size="sm">
            <PencilSquareIcon className="h-4 w-4" /> {td('edit')}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Table removeWrapper aria-label={td('sections.main')}>
          <TableHeader>
            <TableColumn>{td('sections.main')}</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {mainDiseases
              .filter(({ key }) => data[key])
              .map(({ key, value }) => (
                <TableRow key={key}>
                  <TableCell>{value}</TableCell>
                  <TableCell>
                    <CheckIcon className="w-6 h-6" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Table removeWrapper aria-label={td('sections.comorbid')}>
          <TableHeader>
            <TableColumn>{td('sections.comorbid')}</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {comorbidDiseases
              .filter(({ key }) => data[key])
              .map(({ key, value }) => (
                <TableRow key={key}>
                  <TableCell>{value}</TableCell>
                  <TableCell>
                    <CheckIcon className="w-6 h-6" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 italic text-sm">
        {data?.md_other_comment && <div className="p-2 border rounded-lg">{data.md_other_comment}</div>}
        {data?.cd_other_comment && <div className="p-2 border rounded-lg">{data.cd_other_comment}</div>}
      </div>
    </div>
  );
}
