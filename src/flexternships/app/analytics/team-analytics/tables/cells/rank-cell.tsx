import { Row } from '@tanstack/react-table';

export default function RankCell({ row }: Readonly<{ row: Row<any> }>) {
  return <div className="capitalize">#{row.getValue('rank')}</div>;
}
