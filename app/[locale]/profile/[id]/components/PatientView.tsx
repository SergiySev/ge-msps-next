'use client';

import { CheckIcon } from '@heroicons/react/16/solid';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { patient as Patient } from '@prisma/client';
import { d } from 'msps/lib/validation/helpers/date';
import { useTranslations } from 'next-intl';

export default function PatientView({ patient }: { patient: Patient }) {
  const data = patient;

  const t = useTranslations();

  return (
    <div className="space-y-2">
      <Table removeWrapper aria-label="პაციენტი">
        <TableHeader>
          <TableColumn>გვარი სახელი</TableColumn>
          <TableColumn>დაბადების თარიღი</TableColumn>
          <TableColumn>პირადი ნომერი</TableColumn>
          <TableColumn>სქესი</TableColumn>
          <TableColumn>BMI</TableColumn>
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
            <TableCell>{data.sex === 'male' ? 'მამრობითი' : 'მდედრობითი'}</TableCell>
            <TableCell>{data.bmi}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table removeWrapper aria-label="aaa">
        <TableHeader>
          <TableColumn>რეგიონი</TableColumn>
          <TableColumn>მისამართი</TableColumn>
          <TableColumn>ტელეფონის ნომერი</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{data.region.name}</TableCell>
            <TableCell>{data.address}</TableCell>
            <TableCell>{data.phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table removeWrapper aria-label="aaa">
        <TableHeader>
          <TableColumn>მკურნალი ექიმი</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.staff_patient_doctor_idTostaff.last_name} {data.staff_patient_doctor_idTostaff.first_name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table removeWrapper aria-label="aaa">
        <TableHeader>
          <TableColumn>ჰემოდიალიზზე გადასვლის თარიღი</TableColumn>
          <TableColumn>ტრანსპლანტაციის თარიღი</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{d(data.pd_transit_date)}</TableCell>
            <TableCell>{d(data.transplantation_date)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {data.mors && (
        <Table removeWrapper aria-label="aaa">
          <TableHeader>
            <TableColumn>MORS</TableColumn>
            <TableColumn>MORS თარიღი</TableColumn>
            <TableColumn>MORS მიზეზი</TableColumn>
            <TableColumn>MORS კომენტარი</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data.mors ? <CheckIcon className="w-6 h-6" /> : null}</TableCell>
              <TableCell>{d(data.mors_date)}</TableCell>
              <TableCell>{t(data.mors_reason)}</TableCell>
              <TableCell>{data.mors_comment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
