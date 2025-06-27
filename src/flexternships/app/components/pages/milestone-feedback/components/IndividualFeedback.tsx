import { MatrixCell } from '@/flexternships/constraints/types/form-types';
import Spreadsheet from '../../../core/tables/Spreadsheet';
import ExcelGrid from '../../../core/tables/ExcelGrid';
import { firstColumn } from '@/flexternships/mocks/meeting-feedback';
import MatrixElements from './MatrixElements';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
// import { headers } from '@/flexternships/mocks/meeting-feedback';

interface IndividualFeedbackProps {
  ratingMatrix: MatrixCell[][];
  setRatingMatrix: (matrix: MatrixCell[][]) => void;
}

const IndividualFeedback = ({ ratingMatrix, setRatingMatrix }: IndividualFeedbackProps) => {
  const { headers } = MatrixElements({
    feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  });
  const spreadsheetHeaders = headers.filter((header) => header.inputConfig?.type !== 'dropdown');
  return (
    <div className="flex flex-col gap-8 py-4 px-6 w-full border border-gray-200 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold text-grey-heading">Individual Feedback</div>
        <div className="flex flex-row">
          <Spreadsheet
            headers={spreadsheetHeaders}
            firstColumn={firstColumn}
            matrix={ratingMatrix}
            onChange={setRatingMatrix}
          />
          <ExcelGrid
            headers={headers}
            firstColumn={firstColumn}
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
