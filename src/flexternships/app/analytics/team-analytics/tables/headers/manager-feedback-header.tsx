import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'react-feather';
import { Column } from '@tanstack/react-table';

export default function ManagerFeedbackHeader({ column }: Readonly<{ column: Column<any> }>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex items-center justify-between gap-2 p-0"
    >
      <span className="text-grey-heading font-montserrat text-xs font-semibold leading-none tracking-wider uppercase text-wrap">
        <div className="flex flex-col items-start justify-start gap-1">
          <div>MANAGER</div>
          <div className="flex flex-row items-center justify-start gap-2">
            <div>FEEDBACK</div>
          </div>
        </div>
      </span>
      <div className="flex flex-col items-center justify-center gap-0">
        <ChevronUp size={12} />
        <ChevronDown size={12} />
      </div>
    </Button>
  );
}
