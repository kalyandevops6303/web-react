import { Button } from '@/flexternships/app/components/ui/button';
import { Column } from '@tanstack/react-table';

export default function TeamNameHeader({ column }: Readonly<{ column: Column<any> }>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() !== 'desc')}
      className="flex items-center justify-between gap-[8px] p-0"
    >
      <span className="text-[#5E5873] font-montserrat text-[12px] font-semibold leading-none tracking-[1px] uppercase">
        TEAM
      </span>
    </Button>
  );
}
