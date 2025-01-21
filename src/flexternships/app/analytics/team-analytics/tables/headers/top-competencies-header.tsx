import { Info } from 'react-feather';

export default function TopCompetenciesHeader() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-grey-heading font-montserrat text-xs font-semibold leading-none tracking-wider uppercase">
        TOP COMPETENCIES
      </span>
      <Info size={12} color="#5E5873" className="cursor-pointer" />
    </div>
  );
}
