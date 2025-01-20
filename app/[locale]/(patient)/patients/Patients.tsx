'use client';

import { PencilSquareIcon } from '@heroicons/react/16/solid';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';
import clsx from 'clsx';
import { d } from 'msps/lib/validation/helpers/date';
import { useTranslations } from 'next-intl';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  staff_patient_doctor_idTostaff: {
    first_name: string;
    last_name: string;
  };
}

interface PatientsProps {
  patients: Patient[];
  className?: string;
}

const Patients = ({ patients, className }: PatientsProps) => {
  const t = useTranslations('patients_page.table');

  const columns = [
    { key: 'patient_name', label: t('columns.patient') },
    { key: 'birth_date', label: t('columns.birthDate') },
    { key: 'doctor', label: t('columns.doctor') },
    { key: 'actions', label: '' },
  ];

  const rows = patients.map(patient => ({
    key: patient.id,
    patient_name: `${patient.last_name} ${patient.first_name}`,
    birth_date: d(patient.birth_date),
    doctor: `${patient.staff_patient_doctor_idTostaff.last_name} ${patient.staff_patient_doctor_idTostaff.first_name}`,
    actions: (
      <Button href={`/patient/${patient.id}`} as={Link} color="default" isIconOnly variant="light" size="sm">
        <PencilSquareIcon className="h-4 w-4" />
      </Button>
    ),
  }));
  return (
    <Table aria-label={t('title')} className={clsx('min-w-full', className)} removeWrapper>
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={t('noRecords')}>
        {(item: { key: number }) => (
          <TableRow key={item.key} className="even:bg-gray-50 odd:bg-white">
            {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Patients;
