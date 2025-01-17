import { Row } from '@tanstack/react-table';

export default function ManagerFeedbackCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div className="lowercase">
      <div>
        <span className="text-[#6E6B7B] font-montserrat text-[18px] font-semibold leading-[26px]">
          {row.original.managerFeedback.score}
        </span>
        <span className="text-[#6E6B7B] font-montserrat text-[14px] font-normal leading-[21px]">
          /{row.original.managerFeedback.total}
        </span>
      </div>
    </div>
  );
}
