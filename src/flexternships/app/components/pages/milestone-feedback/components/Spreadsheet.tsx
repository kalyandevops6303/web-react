import Spreadsheet from 'react-spreadsheet';
import React, { useState, useEffect } from 'react';
import type { CellBase, DataEditorProps, Matrix } from 'react-spreadsheet';
import { ExcelGridProps } from '@/flexternships/constraints/types/form-types';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '../../../ui/dropdown-menu';

type Option = {
  value: string;
  label: string;
};

type MyCell = CellBase<string | number | string[]> & {
  id: string;
  rowId: string;
  colId: string;
  options?: Option[];
  inputType?: 'number' | 'dropdown' | 'text';
  min?: number;
  max?: number;
  placeholder?: string;
};

interface DropdownEditorProps {
  cell: MyCell;
  onChange: (cell: MyCell) => void;
  exitEditMode: () => void;
}

function DropdownEditor({ cell, onChange, exitEditMode }: DropdownEditorProps) {
  if (!Array.isArray(cell.options)) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full text-left px-2 py-1 border rounded hover:bg-gray-50">
        {cell.value || cell.placeholder || 'Select...'}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {cell.options!.map((option: Option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              onChange({ ...cell, value: option.value });
              exitEditMode();
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NumberEditorProps {
  cell: MyCell;
  onChange: (cell: MyCell) => void;
  exitEditMode: () => void;
}

function NumberEditor({ cell, onChange, exitEditMode }: NumberEditorProps) {
  return (
    <input
      type="number"
      min={cell.min}
      max={cell.max}
      placeholder={cell.placeholder}
      value={cell.value === undefined ? '' : String(cell.value)}
      onChange={(e) => onChange({ ...cell, value: e.target.value })}
      onBlur={exitEditMode}
      autoFocus
      className="w-full border rounded px-2 py-1"
    />
  );
}

interface DefaultEditorProps {
  cell: MyCell;
  onChange: (cell: MyCell) => void;
  exitEditMode: () => void;
}

function DefaultEditor({ cell, onChange, exitEditMode }: DefaultEditorProps) {
  return (
    <input
      type="text"
      value={cell.value === undefined ? '' : String(cell.value)}
      onChange={(e) => onChange({ ...cell, value: e.target.value })}
      onBlur={exitEditMode}
      autoFocus
      className="w-full border rounded px-2 py-1"
    />
  );
}

const ExcelGrid: React.FC<ExcelGridProps> = ({
  headers,
  firstColumn,
  className = '',
  onChange,
  matrix = [],
  inputConfig = false,
}) => {
  const [spreadsheetData, setSpreadsheetData] = useState<MyCell[][]>([]);

  // Convert matrix data to spreadsheet format
  useEffect(() => {
    const convertedData: MyCell[][] = [];

    if (firstColumn) {
      firstColumn.forEach((rowCell, rowIndex) => {
        const row: MyCell[] = [];

        // Add data cells
        headers.forEach((header, colIndex) => {
          const cellData = matrix[rowIndex]?.[colIndex];
          const cell: MyCell = {
            id: `${rowCell.identifier}-${header.identifier}`,
            rowId: rowCell.identifier,
            colId: header.identifier,
            value: cellData?.value || '',
            inputType:
              inputConfig && header.inputConfig?.type === 'number'
                ? 'number'
                : inputConfig && header.inputConfig?.type === 'dropdown'
                ? 'dropdown'
                : 'text',
            min: header.inputConfig?.min,
            max: header.inputConfig?.max,
            placeholder: header.inputConfig?.placeholder,
            options: header.inputConfig?.options?.map((opt: Option) => ({
              value: opt.value,
              label: opt.label,
            })),
          };
          row.push(cell);
        });

        convertedData.push(row);
      });
      console.log(convertedData);
    }

    setSpreadsheetData(convertedData);
  }, [headers, firstColumn, matrix, inputConfig]);

  const handleDataChange = (newData: Matrix<CellBase<any>>) => {
    const convertedMatrix = newData.map((row, rowIndex) =>
      row.slice(1).map((cell, colIndex) => ({
        value: (cell as MyCell)?.value || '',
        rowId: firstColumn?.[rowIndex]?.identifier || '',
        colId: headers?.[colIndex]?.identifier || '',
      })),
    );

    onChange?.(convertedMatrix);
  };

  const DataEditor = (props: DataEditorProps<CellBase<any>>) => {
    const { cell, onChange, exitEditMode } = props;
    if (!cell) return null;

    const myCell = cell as MyCell;

    switch (myCell.inputType) {
      case 'dropdown':
        return (
          <DropdownEditor cell={myCell} onChange={onChange as (cell: MyCell) => void} exitEditMode={exitEditMode} />
        );
      case 'number':
        return <NumberEditor cell={myCell} onChange={onChange as (cell: MyCell) => void} exitEditMode={exitEditMode} />;
      default:
        return (
          <DefaultEditor cell={myCell} onChange={onChange as (cell: MyCell) => void} exitEditMode={exitEditMode} />
        );
    }
  };

  const columnLabels = ['', ...headers.map((h) => h.value)];
  const rowLabels = firstColumn?.map((fc) => fc.value) || [];

  return (
    <div className={`overflow-x-auto border rounded ${className}`}>
      <Spreadsheet
        data={spreadsheetData}
        onChange={handleDataChange}
        columnLabels={columnLabels}
        rowLabels={rowLabels}
        DataEditor={DataEditor}
        // className="border rounded overflow-auto"
      />
    </div>
  );
};

export default ExcelGrid;
