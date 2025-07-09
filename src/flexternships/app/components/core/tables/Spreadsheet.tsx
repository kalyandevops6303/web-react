import React, { useState } from 'react';
import { ExcelGridProps } from '@/flexternships/constraints/types/beta-feedback-form-types';
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '../../../ui/dropdown-menu';
import { ReactGrid, Column, Row, CellChange, NumberCell, HeaderCell, TextCell } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';

const Spreadsheet: React.FC<ExcelGridProps> = ({
  headers,
  firstColumn,
  // className = '',
  onChange,
  matrix = [],
  // inputConfig = false,
}) => {
  // State for dropdown management
  const [dropdownStates, setDropdownStates] = useState<{ [key: string]: { isOpen: boolean; selectedValue?: string } }>(
    {},
  );
  const spreadsheetHeaders = headers.filter((header) => header.inputConfig?.type !== 'dropdown');

  const columns: Column[] = [
    { columnId: 'rowLabel', width: 200, resizable: true },
    ...spreadsheetHeaders.map((header) => ({
      columnId: header.identifier,
      width: header?.width || 150,
      resizable: true,
    })),
  ];

  const getRows = (): Row<HeaderCell | NumberCell | TextCell>[] => [
    {
      rowId: 'header',
      cells: [
        { type: 'header', text: '', className: 'border-b border-gray-300' },
        ...spreadsheetHeaders.map((header) => ({
          type: 'header' as const,
          text: header.value,
          style: {
            backgroundColor: header?.backgroundColor || '#f0f0f0',
            color: header?.color,
            borderColor: header?.borderColor || '#e5e7eb',
          },
          className: 'border-b border-gray-300 items-center justify-center font-semibold',
        })),
      ],
    },
    ...firstColumn.map<Row<HeaderCell | NumberCell | TextCell>>((row, rowIndex) => ({
      rowId: row.identifier,
      cells: [
        {
          type: 'header',
          text: row.value,
          className: 'border-b border-gray-300 items-center font-semibold justify-center',
          style: {
            background: row?.backgroundColor || '#f0f0f0',
            color: row?.color,
            borderColor: row?.borderColor || '#e5e7eb',
          },
        },
        ...spreadsheetHeaders.map((column) => {
          const colIndex = headers.findIndex((header) => header.identifier === column.identifier);
          const cellValue = matrix[rowIndex]?.[colIndex]?.value ?? '';

          if (column.inputConfig?.type === 'number') {
            return {
              type: 'number' as const,
              value: typeof cellValue === 'number' ? cellValue : cellValue === '' ? 0 : Number(cellValue),
              className: 'border-b border-gray-300 items-center justify-center',
            };
          } else {
            return {
              type: 'text' as const,
              text: String(cellValue),
              className: 'border-b border-gray-300 items-center justify-center',
            };
          }
        }),
      ],
    })),
  ];

  const rows = getRows();

  const handleChanges = (changes: CellChange<any>[]) => {
    if (!changes.length) return;

    let newMatrix = matrix.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        ...cell,
        rowId: firstColumn[rowIndex]?.identifier,
        colId: headers[colIndex]?.identifier,
      })),
    );

    let newDropdownStates = { ...dropdownStates };

    changes.forEach((change) => {
      const rowId = change.rowId;
      const colId = change.columnId;

      const value = change.newCell.type === 'number' ? change.newCell.value : change.newCell.text;
      const rowIndex = firstColumn.findIndex((row) => row.identifier === rowId);
      const colIndex = headers.findIndex((header) => header.identifier === colId);
      if (rowIndex !== -1 && colIndex !== -1) {
        newMatrix[rowIndex][colIndex] = {
          ...newMatrix[rowIndex][colIndex],
          value,
          rowId: String(rowId),
          colId: String(colId),
        };
      }
    });

    // Update both matrix and dropdown states
    setDropdownStates(newDropdownStates);
    onChange?.(newMatrix);
  };

  return (
    <ReactGrid
      rows={rows}
      columns={columns}
      onCellsChanged={handleChanges}
      enableRangeSelection
      enableColumnSelection
      enableRowSelection
      enableColumnResizeOnAllHeaders
    />
  );
};

export default Spreadsheet;
