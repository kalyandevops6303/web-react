import { cn } from '@/lib/utils';

interface BoxSkeletonProps {
  className: string; // Mandatory for height and width to be set
}

export default function BoxSkeleton({ className }: BoxSkeletonProps) {
  return (
    <div role="status" className={cn('animate-pulse', className)}>
      <div className="h-full w-full bg-gray-300 rounded dark:bg-gray-700" />
    </div>
  );
}
