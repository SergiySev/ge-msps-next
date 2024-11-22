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
} from '@nextui-org/react';
import { IPagination } from 'msps/lib/types';
import { searchParamsParsers } from 'msps/lib/params/searchParams';
import { useQueryStates } from 'nuqs';
import SortingSwitch from 'msps/lib/components/other/SortingSwitch/SortingSwitch';

interface DataTableViewProps<T extends { id: number }> {
  linkValue: string;
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
  columns,
}: DataTableViewProps<T>) {
  const [{ page, sorting }, setParams] = useQueryStates(searchParamsParsers);

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
          <Button href={`/${linkValue}`} as={Link} color="default" variant="light" size="sm">
            <PlusIcon className="h-4 w-4" /> დამატება
          </Button>
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
        <TableBody items={data} emptyContent={'ჩანაწერები ვერ მოიძებნა'}>
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
