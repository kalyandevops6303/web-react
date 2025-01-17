import { Row } from '@tanstack/react-table';

export default function ManagerFeedbackCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div className="lowercase">
      <div>
        <span className="text-grey font-montserrat text-lg font-semibold leading-xxl-custom">
          {row.original.managerFeedback.score}
        </span>
        <span className="text-grey font-montserrat text-sm font-normal leading-sm-custom">
          /{row.original.managerFeedback.total}
        </span>
      </div>
    </div>
  );
}
