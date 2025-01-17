import { Row } from '@tanstack/react-table';
import { Activity } from 'react-feather';
import { Link, useParams } from 'react-router-dom';

export default function ActionsCell({ row }: Readonly<{ row: Row<any> }>) {
  const { projectId } = useParams();

  return (
    <div className="flex items-center gap-[8px]">
      {row.original.actions.map((action: string) => (
        <div key={action} className="flex items-center gap-[8px]">
          {action === 'View' && (
            <Link to={`/analytics/project/${projectId}/individual/${row.original.userId}`}>
              <div key={action} className="cursor-pointer p-1 bg-[#0185E41F] rounded-full w-min">
                <Activity color="#0185E4" size={24} />
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
