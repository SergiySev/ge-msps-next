'use client';

import { PencilSquareIcon } from '@heroicons/react/16/solid';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import Link from 'next/link';
import clsx from 'clsx';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
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
  const columns = [
    { key: 'patient_name', label: 'პაციენტი' },
    { key: 'birth_date', label: 'დაბ. თარიღი' },
    { key: 'doctor', label: 'მკურნალი ექიმი' },
    { key: 'actions', label: '' },
  ];

  const rows = patients.map(patient => ({
    key: patient.id,
    patient_name: `${patient.last_name} ${patient.first_name}`,
    birth_date: patient.birth_date,
    doctor: `${patient.staff_patient_doctor_idTostaff.last_name} ${patient.staff_patient_doctor_idTostaff.first_name}`,
    actions: (
      <Link legacyBehavior href={`/patient/${patient.id}`}>
        <a className="text-blue-500 text-center">
          <PencilSquareIcon className="w-6 h-6" />
        </a>
      </Link>
    ),
  }));
  return (
    <Table aria-label="Patients Table" className={clsx('min-w-full', className)} isStriped isHeaderSticky>
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={''}>
        {(item: { key: number }) => (
          <TableRow key={item.key}>{columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Patients;
