import TooltipInfo from '@/flexternships/app/components/core/tooltips/TooltipInfo';

export default function TopCompetenciesHeader() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-grey-heading font-montserrat text-xs font-semibold leading-none tracking-wider uppercase">
        TOP COMPETENCIES
      </span>
      <TooltipInfo>
        <p>Top Competencies</p>
      </TooltipInfo>
    </div>
  );
}
