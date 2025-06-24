import { MatrixCell } from '@/flexternships/constraints/types/form-types';
import ExcelGrid from './ExcelGrid';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import { firstColumn, individualHeaders } from '@/flexternships/mocks/meeting-feedback';
// import MatrixElements from "./MatrixElements";
// import { MilestoneFeedbackType } from "@/flexternships/constraints/enums/core-enums";

interface IndividualFeedbackProps {
  ratingMatrix: MatrixCell[][];
  setRatingMatrix: (matrix: MatrixCell[][]) => void;
}

const IndividualFeedback = ({ ratingMatrix, setRatingMatrix }: IndividualFeedbackProps) => {
  const handleSubmit = () => {
    console.log('Rating Matrix:', ratingMatrix);
  };

  // const { headers } = MatrixElements({
  //     feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  // });

  return (
    <div className="flex flex-col gap-8 py-4 px-6 w-full">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold text-grey-heading">Ratings</div>
        <ExcelGrid
          headers={individualHeaders}
          firstColumn={firstColumn}
          matrix={ratingMatrix}
          onChange={setRatingMatrix}
          inputConfig
        />
      </div>
      <div className="flex justify-end mt-4">
        <PrimaryButton onClick={handleSubmit}>Submit Feedback</PrimaryButton>
      </div>
    </div>
  );
};

export default IndividualFeedback;
