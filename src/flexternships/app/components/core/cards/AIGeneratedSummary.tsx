import { cn } from '@/flexternships/lib/utils';
import AIGeneratedIcon from '@flexternships/assets/icons/core/AIGenerated.svg';
import BoxSkeleton from '../skeletons/BoxSkeleton';
import ParagraphSkeleton from '../skeletons/ParagraphSkeleton';
import { ReactNode } from 'react';

const DEFAULT_NOTE =
  'Generative AI may produce inaccurate or incomplete information. Verify critical details while reviewing the content.';

export default function AIGeneratedSummary({
  children,
  title,
  note = DEFAULT_NOTE,
  className,
  isLoading = false,
}: Readonly<{ children: ReactNode; title: string; note?: string; className?: string; isLoading?: boolean }>) {
  return (
    <div className={cn('w-full flex flex-col gap-2 rounded-10 bg-white shadow-card h-full', className)}>
      <div className="p-[16px_16px_0] flex flex-col flex-grow gap-2">
        <div className="flex md:items-center gap-2 flex-col md:flex-row">
          <div className="text-trublue-secondary-500 font-montserrat text-xs leading-5 flex px-2 py-1 justify-center items-center gap-1 rounded-52 border border-trublue-secondary-500">
            <img src={AIGeneratedIcon} alt="AIGenerated" />
            <span className="font-semibold">AI Generated</span>
          </div>
          {isLoading ? (
            <BoxSkeleton className="h-4 min-w-40" />
          ) : (
            <div className="text-dark-100 font-montserrat text-sm leading-5.5 font-medium">{title ?? 'AI Summary'}</div>
          )}
        </div>
        {isLoading ? (
          <ParagraphSkeleton />
        ) : (
          <div className="text-dark-200 font-montserrat text-sm leading-5.5">{children}</div>
        )}
      </div>

      <div className="bg-primary-light bottom-0 left-0 w-full p-[12px_16px] rounded-b-10">
        <span className="text-primary font-montserrat text-xs leading-4">Note: </span>
        <span className="text-dark-200 font-montserrat text-xs leading-4">{note}</span>
      </div>
    </div>
  );
}
