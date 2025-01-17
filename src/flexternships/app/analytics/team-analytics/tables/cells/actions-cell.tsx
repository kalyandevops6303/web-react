import { Row } from '@tanstack/react-table';
import { Activity } from 'react-feather';
import { Link, useParams } from 'react-router-dom';

export default function ActionsCell({ row }: Readonly<{ row: Row<any> }>) {
  const { projectId } = useParams();

  return (
    <div className="flex items-center gap-2">
      {row.original.actions.map((action: string) => (
        <div key={action} className="flex items-center gap-2">
          {action === 'View' && (
            <Link to={`/analytics/project/${projectId}/individual/${row.original.userId}`}>
              <div key={action} className="cursor-pointer p-1 bg-primary-light rounded-full w-min">
                <Activity color="#0185E4" size={24} />
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
