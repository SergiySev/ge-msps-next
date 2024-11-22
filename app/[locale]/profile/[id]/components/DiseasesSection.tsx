'use client';

import { CheckIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import { Button, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { patient as Patient } from '@prisma/client';

export default function DiseasesView({ data }: { data: Patient }) {
  const mainDiseases = [
    { key: 'md_diabetes', value: 'დიაბეტი' },
    { key: 'md_hypertension', value: 'ჰიპერტენზია' },
    { key: 'md_glomerulonephritis', value: 'გლომერულონეფრიტი' },
    { key: 'md_adptd', value: 'ადპთდ' },
    { key: 'md_lupus', value: 'ლუპუს ნეფრიტი' },
    { key: 'md_vasculitis', value: 'ვასკულიტი' },
    { key: 'md_amyloidosis', value: 'ამილოიდოზი' },
    { key: 'md_unknown', value: 'უცნობი' },
    { key: 'md_other', value: 'სხვა (ძირითადი)' },
  ];

  const comorbidDiseases = [
    { key: 'cd_heart', value: 'გულის უკმარისობა' },
    { key: 'cd_cancer', value: 'სიმსივნე' },
    { key: 'cd_a_pressure', value: 'კორონარული არტერიების დაავადება' },
    { key: 'cd_p_pressure', value: 'პერიფერიული არტერიების დაავადება' },
    { key: 'cd_cirrhosis', value: 'ღვიძლის ციროზი' },
    { key: 'cd_pqod', value: 'ფქოდ' },
    { key: 'cd_demention', value: 'დემენცია' },
    { key: 'cd_other', value: 'სხვა (კომორბიდული)' },
  ];

  return (
    <div className="mt-4">
      <div className="flex w-full items-center space-x-2 p-2">
        <div className="w-1/2 font-bold">დაავადებები</div>
        <div className="w-1/2 text-right">
          <Button href={`/diseases/${data.id}`} as={Link} color="default" variant="light" size="sm">
            <PencilSquareIcon className="h-4 w-4" /> რედაქტირება
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Table removeWrapper aria-label="aaa">
          <TableHeader>
            <TableColumn>ძირითადი დაავადებები</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {mainDiseases.map(
              ({ key, value }) =>
                data[key] && (
                  <TableRow key={key}>
                    <TableCell>{value}</TableCell>
                    <TableCell>
                      <CheckIcon className="w-6 h-6" />
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>

        <Table removeWrapper aria-label="aaa">
          <TableHeader>
            <TableColumn>კომორბიდული დაავადებები</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {comorbidDiseases.map(
              ({ key, value }) =>
                data[key] && (
                  <TableRow key={key}>
                    <TableCell>{value}</TableCell>
                    <TableCell>
                      <CheckIcon className="w-6 h-6" />
                    </TableCell>
                  </TableRow>
                )
            )}
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
