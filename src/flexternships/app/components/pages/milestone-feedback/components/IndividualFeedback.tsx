import { CellProps, MatrixCell } from '@/flexternships/constraints/types/form-types';
import Spreadsheet from '../../../core/tables/Spreadsheet';
import ExcelGrid from '../../../core/tables/ExcelGrid';
import MatrixElements from './MatrixElements';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';

interface IndividualFeedbackProps {
  ratingMatrix: MatrixCell[][];
  setRatingMatrix: (matrix: MatrixCell[][]) => void;
  memberList: CellProps[];
}

const IndividualFeedback = ({ ratingMatrix, setRatingMatrix, memberList }: IndividualFeedbackProps) => {
  const { headers } = MatrixElements({
    feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  });
  return (
    <div className="flex flex-col gap-8 py-4 px-6 max-w-full border border-gray-200 rounded-lg overflow-x-auto">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold text-grey-heading">Individual Feedback</div>
        <div className="flex flex-row">
          <Spreadsheet headers={headers} firstColumn={memberList} matrix={ratingMatrix} onChange={setRatingMatrix} />
          <ExcelGrid
            headers={headers}
            firstColumn={memberList}
            matrix={ratingMatrix}
            onChange={setRatingMatrix}
            inputConfig
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualFeedback;
