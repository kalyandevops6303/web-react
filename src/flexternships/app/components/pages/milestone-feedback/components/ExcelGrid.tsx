import { ExcelGridProps } from '@/flexternships/constraints/types/form-types';
import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '../../../ui/dropdown-menu';

const ExcelGrid: React.FC<ExcelGridProps> = ({
  headers,
  firstColumn,
  className = '',
  onChange,
  matrix = [],
  inputConfig = false,
}) => {
  const handleCellChange = (rowIndex: number, colIndex: number, value: string | number | string[]) => {
    const newMatrix = matrix.map((row, rIndex) => {
      if (rIndex !== rowIndex) return row;
      return row.map((cell, cIndex) => (cIndex === colIndex ? { ...cell, value } : cell));
    });
    onChange?.(newMatrix);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {firstColumn && <th className="border border-gray-300 p-2 bg-gray-100" />}
            {headers.map((header) => (
              <th
                key={header?.identifier || ''}
                className="border border-gray-300 p-2 font-semibold items-center bg-gray-50"
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
              <td
                className="border border-gray-300 p-2 font-semibold bg-gray-50"
                style={{
                  backgroundColor: cell.backgroundColor || '#f9fafb',
                  color: cell.color || '#000',
                }}
              >
                {cell.value}
              </td>
              {headers.map((header, colIndex) => (
                <td key={`${cell?.identifier}-${header?.identifier}`} className="border border-gray-300 p-2">
                  {inputConfig && header.inputConfig?.type === 'number' ? (
                    <input
                      type="number"
                      // value={header.inputConfig.min}
                      min={header.inputConfig.min}
                      max={header.inputConfig.max}
                      placeholder={header.inputConfig?.placeholder}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className="w-full outline-none bg-transparent"
                    />
                  ) : inputConfig && header.inputConfig?.type === 'dropdown' ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full text-left px-2 py-1 border rounded hover:bg-gray-50">
                        {matrix[rowIndex]?.[colIndex]?.value || header.inputConfig?.placeholder || 'Select...'}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {header.inputConfig?.options?.map((option, optionIndex) => (
                          <DropdownMenuItem
                            key={optionIndex}
                            onClick={() => handleCellChange(rowIndex, colIndex, option.value)}
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <input
                      type="text"
                      value={matrix[rowIndex]?.[colIndex]?.value as string}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
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
