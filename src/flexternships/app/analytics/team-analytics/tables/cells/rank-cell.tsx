import { Row } from '@tanstack/react-table';

export default function RankCell({ row }: Readonly<{ row: Row<any> }>) {
  return <div className="text-grey font-montserrat text-sm font-medium leading-5.5">#{row.getValue('rank')}</div>;
}
