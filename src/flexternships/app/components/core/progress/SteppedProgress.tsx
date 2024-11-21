import { cn } from '@/flexternships/lib/utils';
import { cva } from 'class-variance-authority';

export default function SteppedProgress(props: SteppedProgressProps) {
  const { value, muted } = props;

  const progressStepVariants = cva(
    `w-[30px] h-[10px] gap-[4px] mr-2 rounded-[6px] border ${muted ? 'border-[#0185E480]' : 'border-[#0185E4]'}`,
    {
      variants: {
        variant: {
          filledPartial: muted
            ? `bg-[#0185E480] bg-[linear-gradient(90deg,_#0185E4_50%,_#fff_50%)]`
            : 'bg-[#0185E4] bg-[linear-gradient(90deg,_#0185E4_50%,_#fff_50%)]',
          filled: muted ? `bg-[#0185E480]` : 'bg-[#0185E4]',
          empty: 'bg-transparent',
        },
      },
      defaultVariants: {
        variant: 'empty',
      },
    },
  );

  const steps = 5;
  const stepsToFill = Math.floor(value);

  const getFilledState = (index: number) => {
    if (Math.floor(value) === index && value > index) return 'filledPartial';
    else return 'empty';
  };

  return (
    <div className="h-2 flex">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={cn(progressStepVariants({ variant: index >= stepsToFill ? getFilledState(index) : 'filled' }))}
        ></div>
      ))}
    </div>
  );
}

type SteppedProgressProps = {
  value: number;
  muted?: boolean;
};
