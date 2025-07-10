import { cn } from '@/lib/utils';
import classNames from 'classnames';
import { SkillBadgeType } from '@/flexternships/constraints/enums/miscellaneous-enums';

interface SkillBadgeProps {
  name: string;
  type: SkillBadgeType;
  className?: string;
}

export default function SkillBadge({ name, type, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        classNames('rounded-[4px] px-[8px] py-[1px] text-xs font-semibold leading-4.5', {
          'bg-trublue-light text-trublue-secondary-500': type === SkillBadgeType.COHORT,
          'bg-[#FFB7011F] text-yellow-secondary-500': type === SkillBadgeType.PROJECT,
        }),
        className,
      )}
    >
      {name}
    </span>
  );
}
