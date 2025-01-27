import { cn } from '@/flexternships/lib/utils';

export default function Spinner(props: SpinnerProps) {
  const { className } = props;
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={cn(
          'w-full h-full min-w-[20px] min-h-[20px] animate-spin aspect-square border-trublue',
          className,
          'border-t-transparent border-4 rounded-full',
        )}
      ></div>
    </div>
  );
}

type SpinnerProps = {
  className?: string;
};
