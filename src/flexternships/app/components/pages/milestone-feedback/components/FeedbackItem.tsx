import { FeedbackProgress } from '@/flexternships/constraints/types/milestone-insight-types';
import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { useState } from 'react';
import { MatrixCell, DropdownOption, CellProps } from '@/flexternships/constraints/types/form-types';
import { firstColumn, teamColumns } from '@/flexternships/mocks/meeting-feedback';
import MatrixElements from './MatrixElements';
import IndividualFeedback from './IndividualFeedback';
import TeamFeedback from './TeamFeedback';

const FeedbackItem = ({ feedback }: { feedback: FeedbackProgress }) => {
  const initializeMatrix = (firstColumn: CellProps[], headers: CellProps[]): MatrixCell[][] => {
    return firstColumn.map((row) =>
      headers.map((col) => ({
        value: '',
        rowId: row.identifier,
        colId: col.identifier,
      })),
    );
  };
  const { headers } = MatrixElements({
    feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  });
  // const headers = individualHeaders;

  const [ratingMatrix, setRatingMatrix] = useState<MatrixCell[][]>(() => initializeMatrix(firstColumn, headers));

  const initializeTeamMatrix = (rows: CellProps[], cols: CellProps[]) =>
    rows.map((row) =>
      cols.map((col) => ({
        value: '',
        rowId: row.identifier,
        colId: col.identifier,
      })),
    );
  const teamHeaders = MatrixElements({
    feedbackType: MilestoneFeedbackType.TEAM_FEEDBACK,
  }).headers;
  const [teamMatrix, setTeamMatrix] = useState<MatrixCell[][]>(() => initializeTeamMatrix(teamHeaders, teamColumns));
  const [topLeaders, setTopLeaders] = useState<DropdownOption[]>([]);
  const [qualitativeFeedback, setQualitativeFeedback] = useState('');

  const getFeedbackComponent = (feedbackType: MilestoneFeedbackType) => {
    switch (feedbackType) {
      case MilestoneFeedbackType.INDIVIDUAL_FEEDBACK:
        return <IndividualFeedback ratingMatrix={ratingMatrix} setRatingMatrix={setRatingMatrix} />;
      case MilestoneFeedbackType.TEAM_FEEDBACK:
        return (
          <TeamFeedback
            teamMatrix={teamMatrix}
            setTeamMatrix={setTeamMatrix}
            topLeaders={topLeaders}
            setTopLeaders={setTopLeaders}
            qualitativeFeedback={qualitativeFeedback}
            setQualitativeFeedback={setQualitativeFeedback}
          />
        );
    }
  };

  return getFeedbackComponent(feedback.type);
};

export default FeedbackItem;
