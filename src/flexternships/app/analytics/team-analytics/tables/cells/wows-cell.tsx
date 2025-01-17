import { Row } from '@tanstack/react-table';

export default function WowsCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div className="lowercase">
      <div>
        <span className="text-[#6E6B7B] font-montserrat text-[18px] font-semibold leading-[26px]">
          {row.original.wows}
        </span>
      </div>
    </div>
  );
}
