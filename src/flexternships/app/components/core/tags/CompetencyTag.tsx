import { Competency } from '@/flexternships/constraints/enums/miscellaneous-enums';
import { competencyText } from '@/flexternships/static/core-content';

const css = {
  [Competency.COLLABORATION]: 'bg-aqua-light text-aqua',
  [Competency.LEADERSHIP]: 'bg-purple-light text-purple',
  [Competency.COMMUNICATION]: 'bg-orange-light text-orange',
  [Competency.INNOVATION]: 'bg-yellow-light bg-opacity-10 text-yellow-gold',
  [Competency.EFFECTIVENESS]: 'bg-blue-light text-blue',
  [Competency.PROBLEM_SOLVING]: 'bg-success bg-opacity-10 text-success',
};

export default function CompetencyTag(props: CompetencyTagProps) {
  const { competency } = props;
  return (
    <div className={`text-xs font-semibold leading-5 px-[9px] py-[1px] rounded-full ${css[competency]}`}>
      {competencyText[competency]}
    </div>
  );
}

type CompetencyTagProps = {
  competency: Competency;
};
