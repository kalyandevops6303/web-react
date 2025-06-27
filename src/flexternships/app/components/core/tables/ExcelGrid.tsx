import { ExcelGridProps } from '@/flexternships/constraints/types/form-types';
import React from 'react';
import { Dropdown } from '../dynamic-select/Dropdown';

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
                    // <DropdownMenu>
                    //   <DropdownMenuTrigger className="text-left border-none hover:bg-gray-50">
                    //     {matrix[rowIndex]?.[colIndex]?.value || header.inputConfig?.placeholder || 'Select...'}
                    //   </DropdownMenuTrigger>
                    //   <DropdownMenuContent>
                    //     {header.inputConfig?.options?.map((option, optionIndex) => (
                    //       <DropdownMenuItem
                    //         key={optionIndex}
                    //         onClick={() => handleCellChange(rowIndex, colIndex, option.value)}
                    //       >
                    //         {option.label}
                    //       </DropdownMenuItem>
                    //     ))}
                    //   </DropdownMenuContent>
                    // </DropdownMenu>
                    <Dropdown
                      label=""
                      options={header.inputConfig?.options || []}
                      // selected={value}
                      multi={header.inputConfig?.isMultiSelect}
                      placeholder={header.inputConfig?.placeholder}
                      onChange={(selected) => {
                        if (Array.isArray(selected)) {
                          const selectedValues = selected.map((option: { value: string }) => option.value);
                          handleCellChange(cell.identifier, header.identifier, selectedValues);
                        } else {
                          const selectedValue = selected?.value;
                          handleCellChange(cell.identifier, header.identifier, selectedValue || '');
                        }
                      }}
                    />
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
