import { ExcelGridProps } from '@/flexternships/constraints/types/form-types';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '../../ui/dropdown-menu';
import { ChevronDown } from 'react-feather';

const ExcelGrid: React.FC<ExcelGridProps> = ({
  headers,
  firstColumn,
  className = '',
  onChange,
  matrix = [],
  inputConfig = false,
}) => {
  const excelGridHeaders = headers.filter((header) => header.inputConfig?.type === 'dropdown');
  const handleCellChange = (rowId: string, colId: string, value: string | number | string[]) => {
    const rowIndex = firstColumn.findIndex((row) => row.identifier === rowId);
    const colIndex = headers.findIndex((header) => header.identifier === colId);
    const newMatrix = matrix.map((row, rIndex) => {
      if (rIndex !== rowIndex) return row;
      return row.map((cell, cIndex) => (cIndex === colIndex ? { ...cell, value } : cell));
    });
    onChange?.(newMatrix);
  };

  return (
    <div className={className}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {/* {firstColumn && <th className="border border-gray-300 p-2 bg-gray-100" />} */}
            {excelGridHeaders.map((header) => (
              <th
                key={header?.identifier || ''}
                className="text-m px-4 items-center h-2 w-32 max-w-48 overflow-x-auto"
                style={{
                  backgroundColor: header.backgroundColor || '#f9fafb',
                  borderColor: header.borderColor || '#e5e7eb',
                  color: header.color || '#000',
                }}
              >
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {firstColumn?.map((cell, rowIndex) => (
            <tr key={cell.identifier}>
              {/* <td
                className="border border-gray-300 p-2 font-semibold bg-gray-50"
                style={{
                  backgroundColor: cell.backgroundColor || '#f9fafb',
                  color: cell.color || '#000',
                }}
              >
                {cell.value}
              </td> */}
              {excelGridHeaders.map((header, colIndex) => (
                <td
                  key={`${cell?.identifier}-${header?.identifier}`}
                  className="border border-gray-300 text-xs px-2 py-1 h-4 w-48 whitespace-nowrap"
                >
                  {inputConfig && header.inputConfig?.type === 'number' ? (
                    <input
                      type="number"
                      // value={header.inputConfig.min}
                      min={header.inputConfig.min}
                      max={header.inputConfig.max}
                      placeholder={header.inputConfig?.placeholder}
                      onChange={(e) => handleCellChange(cell.identifier, header.identifier, e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  ) : inputConfig && header.inputConfig?.type === 'dropdown' ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-between w-full px-2 h-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-xs">
                        <span className="text-xs text-gray-700 truncate">
                          {(() => {
                            const columnIndex = headers.findIndex((h) => h.identifier === header.identifier);
                            if (header.inputConfig?.isMultiSelect) {
                              const currentValues = matrix[rowIndex]?.[columnIndex]?.value as string[];
                              if (Array.isArray(currentValues) && currentValues.length > 0) {
                                return `${currentValues.length} selected`;
                              }
                              return header.inputConfig?.placeholder || 'Select...';
                            } else {
                              const currentValues = matrix[rowIndex]?.[columnIndex]?.value as string;
                              return currentValues || header.inputConfig?.placeholder || 'Select...';
                            }
                          })()}
                        </span>
                        <ChevronDown className="h-3 w-3 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 bg-white">
                        {header.inputConfig?.options?.map((option) => {
                          const columnIndex = headers.findIndex((h) => h.identifier === header.identifier);
                          const currentValues = matrix[rowIndex]?.[columnIndex]?.value as string[];
                          const isSelected =
                            Array.isArray(currentValues) && currentValues.some((val) => val === option.value);
                          return (
                            <DropdownMenuCheckboxItem
                              key={option.value}
                              checked={isSelected}
                              onCheckedChange={() => {
                                // const currentValues = matrix[rowIndex]?.[colIndex]?.value as string[] || [];
                                let newValues: string[];

                                if (isSelected) {
                                  newValues = currentValues.filter((val) => val !== option.value);
                                } else {
                                  if (header.inputConfig?.isMultiSelect) {
                                    newValues = [...currentValues, option.value];
                                  } else {
                                    newValues = [option.value];
                                  }
                                }
                                handleCellChange(cell.identifier, header.identifier, newValues);
                              }}
                            >
                              {option.label}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <input
                      type="text"
                      value={matrix[rowIndex]?.[colIndex]?.value as string}
                      onChange={(e) => handleCellChange(cell.identifier, header.identifier, e.target.value)}
                      className="w-full outline-none bg-transparent"
                      // placeholder={header.inputConfig?.placeholder}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelGrid;
