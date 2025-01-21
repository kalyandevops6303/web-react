import { Row } from '@tanstack/react-table';

export default function TopCompetenciesCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap max-w-[400px]">
        {row.original.topCompetencies.map((competency: any) => (
          <div
            key={competency.name}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: competency.backgroundColor,
              color: competency.color,
            }}
          >
            <div className="flex items-center justify-center font-montserrat text-xs font-semibold leading-5">
              {competency.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
