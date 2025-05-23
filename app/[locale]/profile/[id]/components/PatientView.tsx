'use client';

import { CheckIcon } from '@heroicons/react/16/solid';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { patient as Patient } from '@prisma/client';
import { d } from 'msps/lib/validation/helpers/date';
import { useTranslations } from 'next-intl';

// Define a new type that extends the Patient type
type ExtendedPatient = Patient & {
  region: {
    name: string;
  };
  staff_patient_doctor_idTostaff: {
    first_name: string;
    last_name: string;
  };
};

export default function PatientView({ patient }: { patient: ExtendedPatient }) {
  const data = patient;
  const t = useTranslations('patient_view.tables');

  return (
    <div className="space-y-2">
      <Table removeWrapper aria-label={t('personal.title')}>
        <TableHeader>
          <TableColumn>{t('personal.columns.fullName')}</TableColumn>
          <TableColumn>{t('personal.columns.birthDate')}</TableColumn>
          <TableColumn>{t('personal.columns.personalId')}</TableColumn>
          <TableColumn>{t('personal.columns.sex')}</TableColumn>
          <TableColumn>{t('personal.columns.bmi')}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <span className="font-bold">
                {data.last_name} {data.first_name}
              </span>
            </TableCell>
            <TableCell>{d(data.birth_date)}</TableCell>
            <TableCell>{data.personal_id}</TableCell>
            <TableCell>{data.sex === 'male' ? t('sex.male') : t('sex.female')}</TableCell>
            <TableCell>{data.bmi}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table removeWrapper aria-label={t('contact.title')}>
        <TableHeader>
          <TableColumn>{t('contact.columns.region')}</TableColumn>
          <TableColumn>{t('contact.columns.address')}</TableColumn>
          <TableColumn>{t('contact.columns.phone')}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{data.region.name}</TableCell>
            <TableCell>{data.address}</TableCell>
            <TableCell>{data.phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table removeWrapper aria-label={t('doctor.title')}>
        <TableHeader>
          <TableColumn>{t('doctor.title')}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.staff_patient_doctor_idTostaff.last_name} {data.staff_patient_doctor_idTostaff.first_name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table removeWrapper aria-label={t('dates.title')}>
        <TableHeader>
          <TableColumn>{t('dates.columns.pdTransit')}</TableColumn>
          <TableColumn>{t('dates.columns.transplantation')}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{d(data.pd_transit_date)}</TableCell>
            <TableCell>{d(data.transplantation_date)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {data.mors && (
        <Table removeWrapper aria-label={t('mors.title')}>
          <TableHeader>
            <TableColumn>{t('mors.columns.status')}</TableColumn>
            <TableColumn>{t('mors.columns.date')}</TableColumn>
            <TableColumn>{t('mors.columns.reason')}</TableColumn>
            <TableColumn>{t('mors.columns.comment')}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data.mors ? <CheckIcon className="w-6 h-6" /> : null}</TableCell>
              <TableCell>{d(data.mors_date)}</TableCell>
              <TableCell>{t('mors.' + data.mors_reason)}</TableCell>
              <TableCell>{data.mors_comment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
