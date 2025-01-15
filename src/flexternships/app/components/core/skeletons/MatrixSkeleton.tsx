import { cn } from '@/lib/utils';
import BoxSkeleton from './BoxSkeleton';

interface MatrixSkeletonProps {
  rows: number;
  cols: number;
  className?: string;
  gridItemClassName?: string;
}

export default function MatrixSkeleton({ rows, cols, className, gridItemClassName }: MatrixSkeletonProps) {
  // Create grid template columns style dynamically since Tailwind needs static values
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  };

  return (
    <div style={gridStyle} className={cn('gap-3', className)}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <BoxSkeleton key={index} className={cn('rounded-md h-10 w-full', gridItemClassName)} />
      ))}
    </div>
  );
}
