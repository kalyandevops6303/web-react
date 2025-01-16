import { cn } from '@/lib/utils';
import ImagePlaceholderIcon from '@flexternships/assets/icons/core/image-placeholder.svg';

interface ImageSkeletonProps {
  className?: string;
}

export default function ImageSkeleton({ className }: ImageSkeletonProps) {
  return (
    <div role="status" className={cn('animate-pulse flex items-center', className)}>
      <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded dark:bg-gray-700">
        <img src={ImagePlaceholderIcon} className="w-10 h-10" alt="" />
      </div>
    </div>
  );
}
