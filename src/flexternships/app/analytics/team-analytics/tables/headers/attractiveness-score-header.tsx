import { Button } from '@/flexternships/app/components/ui/button';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Column } from '@tanstack/react-table';

export default function AttractivenessScoreHeader({ column }: Readonly<{ column: Column<any> }>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex items-center justify-between gap-2 p-0"
    >
      <span className="text-grey-heading font-montserrat text-xs font-semibold leading-none tracking-wider uppercase">
        ATTRACTIVENESS SCORE
      </span>
      <div className="flex flex-col items-center justify-center gap-0">
        <ChevronUp size={12} />
        <ChevronDown size={12} />
      </div>
    </Button>
  );
}
