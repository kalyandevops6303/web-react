import { Row } from '@tanstack/react-table';

export default function TopCompetenciesCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div>
      <div className="flex items-center gap-[8px] flex-wrap max-w-[400px]">
        {row.original.topCompetencies.map((competency: any) => (
          <div
            key={competency.name}
            className="flex items-center gap-[3px] px-[9px] py-[1px] rounded-[28px]"
            style={{
              backgroundColor: competency.backgroundColor,
              color: competency.color,
            }}
          >
            <div className="flex items-center justify-center font-montserrat text-[12px] font-semibold leading-[20px]">
              {competency.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
