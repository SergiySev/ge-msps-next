'use client';

import { CheckIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/16/solid';
import {
  Button,
  getKeyValue,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { IPagination } from 'msps/lib/types';
import { searchParamsParsers } from 'msps/lib/params/searchParams';
import { useQueryStates } from 'nuqs';
import SortingSwitch from 'msps/lib/components/other/SortingSwitch/SortingSwitch';
import WhoMadeIt from '../WhoMadeIt/WhoMadeIt';
import { useTranslations } from 'next-intl';
import { usePermissions } from 'msps/lib/hooks/usePermissions';

interface DataTableViewProps<T extends { id: number }> {
  linkValue: string;
  linkValueForNew: string;
  title: string;
  columns: { key: string; value: string }[];
  pagination: IPagination;
  data: T[];
}

export default function DataTableView<T extends { id: number }>({
  pagination,
  data,
  title,
  linkValue,
  linkValueForNew,
  columns,
}: DataTableViewProps<T>) {
  const [{ page, sorting }, setParams] = useQueryStates(searchParamsParsers);
  const t = useTranslations();
  const { isAdmin, isManager } = usePermissions();

  // Hide add button for admin and manager roles
  const showAddButton = !isAdmin && !isManager;

  return (
    <div className="mt-4">
      <div className="flex w-full items-center space-x-2 p-2">
        <div className="w-1/2 font-bold">
          {title} ({pagination.totalItems})
        </div>
        <div className="w-1/4 text-right">
          <SortingSwitch
            onValueChange={isSorted => setParams({ sorting: isSorted, page: 1 })}
            defaultSelected={sorting}
          />
        </div>

        <div className="w-1/4 text-right">
          {showAddButton && (
            <Button href={`/${linkValueForNew}`} as={Link} color="default" variant="light" size="sm">
              <PlusIcon className="h-4 w-4" /> {t('add')}
            </Button>
          )}
        </div>
      </div>
      <Table
        aria-label={linkValue}
        removeWrapper
        bottomContent={
          pagination.totalPages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                total={pagination.totalPages}
                initialPage={page}
                onChange={page => setParams({ page })}
                page={page}
              />
            </div>
          )
        }
      >
        <TableHeader>
          {columns.map(({ key, value }) => (
            <TableColumn key={key}>{value}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={data} emptyContent={t('no_data_found')}>
          {item => (
            <TableRow key={item.id} className="even:bg-gray-50 odd:bg-white">
              {columnKey =>
                columnKey === 'edit' ? (
                  <TableCell className="text-right">
                    <Button
                      href={`/${linkValue}/${item.id}`}
                      as={Link}
                      color="default"
                      isIconOnly
                      variant="light"
                      size="sm"
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                ) : columnKey === 'log' ? (
                  <TableCell>
                    <WhoMadeIt {...(item as any)} />
                  </TableCell>
                ) : typeof getKeyValue(item, columnKey) === 'boolean' && getKeyValue(item, columnKey) ? (
                  <TableCell>
                    <CheckIcon className="h-4 w-4" />
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
