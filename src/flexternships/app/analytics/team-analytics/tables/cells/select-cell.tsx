import { Checkbox } from '@radix-ui/react-checkbox';
import { Row } from '@tanstack/react-table';

export default function SelectCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}
