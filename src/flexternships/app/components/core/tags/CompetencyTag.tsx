import { Competency } from '@/flexternships/constraints/types/competency-types';

export default function CompetencyTag(props: CompetencyTagProps) {
  const { competency } = props;
  console.log(competency);
  return (
    <div
      className={`text-xs font-semibold leading-5 px-[9px] py-[1px] rounded-full`}
      style={{ color: competency.colorCode, backgroundColor: `${competency.colorCode}1F` }}
    >
      {competency.name}
    </div>
  );
}

type CompetencyTagProps = {
  competency: Partial<Competency>;
};
