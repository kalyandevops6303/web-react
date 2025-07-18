import { cn } from '@/flexternships/lib/utils';
import { AlertCircle } from 'react-feather';

interface InfoCardProps {
  children: React.ReactNode | string;
  className?: string;
}

export default function InfoCard(props: InfoCardProps) {
  const { children, className } = props;
  return (
    <div className={cn('flex flex-row items-center gap-x-2 rounded-md bg-trublue-light p-4', className)}>
      <AlertCircle size={18} className="text-trublue-secondary-500" />
      <div className="text-[15px] text-trublue-secondary-500 leading-4 font-normal flex-1">{children}</div>
    </div>
  );
}
