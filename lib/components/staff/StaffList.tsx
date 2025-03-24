'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { Badge } from '@heroui/badge';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/table';

interface StaffMember {
  id: number;
  username: string;
  role: string | null;
  active: boolean | null;
  created_at: Date | null;
}

interface StaffListProps {
  staff: StaffMember[];
}

export const StaffList = ({ staff }: StaffListProps) => {
  const t = useTranslations();

  return (
    <Table aria-label="Staff list">
      <TableHeader>
        <TableColumn>{t('username')}</TableColumn>
        <TableColumn>{t('role')}</TableColumn>
        <TableColumn>{t('active')}</TableColumn>
        <TableColumn>{t('createdAt')}</TableColumn>
        <TableColumn>{t('manage')}</TableColumn>
      </TableHeader>
      <TableBody>
        {staff.map(member => (
          <TableRow key={member.id}>
            <TableCell>{member.username}</TableCell>
            <TableCell>
              <Badge color="primary" variant="flat">
                {member.role || t('noRole')}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge color={member.active ? 'success' : 'danger'} variant="flat">
                {member.active ? t('active') : t('inactive')}
              </Badge>
            </TableCell>
            <TableCell>{member.created_at ? new Date(member.created_at).toLocaleDateString() : '-'}</TableCell>
            <TableCell>
              <Link href={`/staff/${member.id}`}>
                <Button size="sm" color="primary" variant="flat">
                  {t('manage')}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
