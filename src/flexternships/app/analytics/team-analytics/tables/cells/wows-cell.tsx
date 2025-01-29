import { Row } from '@tanstack/react-table';

export default function WowsCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div className="lowercase">
      <div>
        <span className="text-grey font-montserrat text-lg font-semibold leading-xxl-custom">{row.original.wows}</span>
      </div>
    </div>
  );
}
