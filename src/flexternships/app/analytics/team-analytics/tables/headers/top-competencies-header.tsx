import { Info } from 'react-feather';

export default function TopCompetenciesHeader() {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="text-[#5E5873] font-montserrat text-[12px] font-semibold leading-none tracking-[1px] uppercase">
        TOP COMPETENCIES
      </span>
      <Info size={12} color="#5E5873" className="cursor-pointer" />
    </div>
  );
}
