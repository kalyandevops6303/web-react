'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@flexternships/components/ui/dropdown-menu';
import { Input } from '@flexternships/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@flexternships/components/ui/table';
import { useState } from 'react';

type TanstackTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  allowPagination?: boolean;
  allowColumnFilters?: boolean;
  allowSelection?: boolean;
  className?: string;
  highlightByKey?: string;
  highlightedValues?: string[];
};

const styles = {
  row: {
    default: 'bg-white',
    highlighted: 'bg-[#0185E41F]',
    border: '!border !border-trublue-secondary-500',
  },
};

export default function TanstackTable<T>({
  data,
  columns,
  allowPagination,
  allowColumnFilters,
  allowSelection,
  className,
  highlightByKey,
  highlightedValues,
}: TanstackTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: allowSelection ?? false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 1, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    ...(allowPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(allowPagination ? { pagination } : {}),
    },
  });

  const isRowHighlighted = (row: Row<T>) => {
    return highlightedValues?.includes(row.original[highlightByKey as keyof typeof row.original] as string) ?? false;
  };

  return (
    <div className={`${className} w-full`}>
      {allowColumnFilters && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="rounded-lg border border-[#EBE9F1] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
        <Table className={`rounded-lg relative`}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-[#F3F2F7] text-[#5E5873] font-montserrat text-[12px] font-semibold leading-none tracking-[1px] uppercase px-[12px]"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={`${className} relative`}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`bg-white ${isRowHighlighted(row) ? styles.row.border : styles.row.default}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        isRowHighlighted(row) ? styles.row.highlighted : styles.row.default
                      } text-[#6E6B7B] font-montserrat text-[14px] font-medium leading-[22px] px-[12px]`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {allowPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          {allowSelection && (
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
          )}
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
