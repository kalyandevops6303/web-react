import { MilestoneFeedbackInputCellType } from '../enums/beta-feedback-enums';

export interface CellProps {
  value: string;
  identifier: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  inputConfig?: {
    type: MilestoneFeedbackInputCellType;
    min?: number;
    max?: number;
    placeholder?: string;
    options?: DropdownOption[];
    isMultiSelect?: boolean;
  };
  width?: number;
}

export interface MatrixCell {
  rowId: string;
  colId: string;
  value: string | number | string[];
}

export interface ExcelGridProps {
  firstColumn: CellProps[];
  headers: CellProps[];
  onChange?: (matrix: MatrixCell[][]) => void;
  matrix: MatrixCell[][];
  className?: string;
  inputConfig?: boolean;
}

// type InputType = 'string' | 'number' | 'dropdown';
export type RowData = Record<string, string | number | string[] | number[]>;

export interface DropdownOption {
  label: string;
  value: string;
}
