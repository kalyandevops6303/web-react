import { Row } from '@tanstack/react-table';

export default function TeamNameCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div className="lowercase">
      <div>
        <span className="text-grey font-montserrat text-lg font-semibold leading-xxl-custom">{row.original.name}</span>
        <span className="text-grey font-montserrat text-sm font-normal leading-sm-custom"></span>
      </div>
    </div>
  );
}
