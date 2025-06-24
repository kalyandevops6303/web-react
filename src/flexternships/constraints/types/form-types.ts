import { MilestoneFeedbackInputCellType } from '../enums/feedback-enums';

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
}

export interface MatrixCell {
  value: string | number | string[];
  rowId: string;
  colId: string;
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
