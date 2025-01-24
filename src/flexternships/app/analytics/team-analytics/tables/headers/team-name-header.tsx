import { Button } from '@/flexternships/app/components/ui/button';
import { Column } from '@tanstack/react-table';

export default function TeamNameHeader({ column }: Readonly<{ column: Column<any> }>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() !== 'desc')}
      className="flex items-center justify-between gap-2 p-0"
    >
      <span className="text-grey-heading font-montserrat text-xs font-semibold leading-none tracking-wider uppercase">
        TEAM
      </span>
    </Button>
  );
}
