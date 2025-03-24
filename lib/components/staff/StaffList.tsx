'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { Badge } from '@heroui/badge';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/table';
import { PencilSquareIcon } from '@heroicons/react/16/solid';

interface StaffMember {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string | null;
  active: boolean | null;
}

interface StaffListProps {
  staff: StaffMember[];
}

export const StaffList = ({ staff }: StaffListProps) => {
  const t = useTranslations();

  return (
    <Table aria-label="Staff list">
      <TableHeader>
        <TableColumn>{t('first_name')}</TableColumn>
        <TableColumn>{t('last_name')}</TableColumn>
        <TableColumn>{t('username')}</TableColumn>
        <TableColumn>{t('role')}</TableColumn>
        <TableColumn>{t('active')}</TableColumn>
        <TableColumn>{t('manage')}</TableColumn>
      </TableHeader>
      <TableBody>
        {staff.map(member => (
          <TableRow key={member.id}>
            <TableCell>{member.first_name}</TableCell>
            <TableCell>{member.last_name}</TableCell>
            <TableCell>{member.username}</TableCell>
            <TableCell>
              <Badge color="primary" variant="flat">
                {member.role || t('noRole')}
              </Badge>
            </TableCell>
            <TableCell className="text-center">{member.active ? '✅' : '❌'}</TableCell>
            <TableCell>
              <Link href={`/staff/${member.id}`}>
                <Button size="sm" color="primary" variant="flat">
                  <PencilSquareIcon className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
