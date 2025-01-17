import { Row } from '@tanstack/react-table';

export default function AttractivenessScoreCell({ row }: Readonly<{ row: Row<any> }>) {
  return (
    <div className="lowercase">
      <div>
        <span className="text-grey font-montserrat text-lg font-semibold leading-xxl-custom">
          {row.original.attractivenessScore.score}
        </span>
        <span className="text-grey font-montserrat text-sm font-normal leading-sm-custom">
          /{row.original.attractivenessScore.total}
        </span>
      </div>
    </div>
  );
}
