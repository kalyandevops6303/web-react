import { Checkbox } from '@/flexternships/app/components/ui/checkbox';
import { Table } from '@tanstack/react-table';

export default function SelectHeader({ table }: Readonly<{ table: Table<any> }>) {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}
