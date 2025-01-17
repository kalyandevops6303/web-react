import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'react-feather';
import { Column } from '@tanstack/react-table';

export default function ManagerFeedbackHeader({ column }: Readonly<{ column: Column<any> }>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex items-center justify-between gap-[8px] p-0"
    >
      <span className="text-[#5E5873] font-montserrat text-[12px] font-semibold leading-none tracking-[1px] uppercase">
        MANAGER FEEDBACK
      </span>
      <div className="flex flex-col items-center justify-center gap-0">
        <ChevronUp size={12} />
        <ChevronDown size={12} />
      </div>
    </Button>
  );
}
