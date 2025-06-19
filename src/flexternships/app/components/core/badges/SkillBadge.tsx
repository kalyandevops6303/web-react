import { cn } from '@/lib/utils';
import classNames from 'classnames';

interface SkillBadgeProps {
  name: string;
  type: 'cohort' | 'project';
  className?: string;
}

export default function SkillBadge({ name, type, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        classNames('rounded-[4px] px-[8px] py-[1px] text-xs font-semibold leading-4.5', {
          'bg-trublue-light text-trublue-secondary-500': type === 'cohort',
          'bg-[#FFB7011F] text-yellow-secondary-500': type === 'project',
        }),
        className,
      )}
    >
      {name}
    </span>
  );
}
