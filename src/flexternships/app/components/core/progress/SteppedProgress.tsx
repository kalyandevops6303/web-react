import { cn } from '@/flexternships/lib/utils';
import { cva } from 'class-variance-authority';

const progressStepVariants = cva('w-[30px] h-[7px] gap-[4px] mx-2 rounded-[6px] border border-[#0185E4]', {
  variants: {
    variant: {
      filledPartial: 'bg-[#0185E4] bg-[linear-gradient(90deg,_#0185E4_50%,_#fff_50%)]',
      filled: 'bg-[#0185E4]',
      empty: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'empty',
  },
});

export default function SteppedProgress(props: SteppedProgressProps) {
  const { value } = props;

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
};
