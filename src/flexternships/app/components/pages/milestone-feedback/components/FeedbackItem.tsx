import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { useState, useEffect } from 'react';
import { MatrixCell, DropdownOption, CellProps } from '@/flexternships/constraints/types/form-types';
import { firstColumn, teamColumns } from '@/flexternships/mocks/meeting-feedback';
import MatrixElements from './MatrixElements';
import IndividualFeedback from './IndividualFeedback';
import TeamFeedback from './TeamFeedback';
import PrimaryButton from '../../../core/buttons/PrimaryButton';

const FeedbackItem = () => {
  const { headers } = MatrixElements({
    feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  });

  const initializeMatrix = (firstColumn: CellProps[], headers: CellProps[]): MatrixCell[][] => {
    return firstColumn.map((row) =>
      headers.map((col) => ({
        value: '',
        rowId: row.identifier,
        colId: col.identifier,
      })),
    );
  };

  const [ratingMatrix, setRatingMatrix] = useState<MatrixCell[][]>([]);

  useEffect(() => {
    if (headers.length > 0 && ratingMatrix.length === 0) {
      setRatingMatrix(initializeMatrix(firstColumn, headers));
    }
  }, [headers.length]);

  const teamHeaders = MatrixElements({
    feedbackType: MilestoneFeedbackType.TEAM_FEEDBACK,
  }).headers;

  const initializeTeamMatrix = (rows: CellProps[], cols: CellProps[]) =>
    rows.map((row) =>
      cols.map((col) => ({
        value: '',
        rowId: row.identifier,
        colId: col.identifier,
      })),
    );
  const [teamMatrix, setTeamMatrix] = useState<MatrixCell[][]>([]);
  useEffect(() => {
    if (teamHeaders.length > 0 && teamMatrix.length === 0) {
      setTeamMatrix(initializeTeamMatrix(teamHeaders, teamColumns));
    }
  }, [teamHeaders.length]);
  const [topLeaders, setTopLeaders] = useState<DropdownOption[]>([]);
  const [qualitativeFeedback, setQualitativeFeedback] = useState('');

  const handleSubmit = () => {
    console.log('Rating Matrix:', ratingMatrix);
    let teamFeedback: { rowId: string; comment?: string; rating?: string; names?: string[] }[] = teamMatrix.map(
      (row) => {
        const rowId = row[0].rowId;
        const comment = String(row[0].value);
        const rating = String(row[1].value);
        return {
          rowId,
          comment,
          rating,
        };
      },
    );
    teamFeedback.push({
      rowId: 'comment',
      comment: qualitativeFeedback,
    });
    teamFeedback.push({
      rowId: 'topLeaders',
      names: topLeaders.map((l) => l.value),
    });
    console.log('teamFeedback', teamFeedback);
  };
  return (
    <div>
      <IndividualFeedback ratingMatrix={ratingMatrix} setRatingMatrix={setRatingMatrix} />;
      <TeamFeedback
        teamMatrix={teamMatrix}
        setTeamMatrix={setTeamMatrix}
        topLeaders={topLeaders}
        setTopLeaders={setTopLeaders}
        qualitativeFeedback={qualitativeFeedback}
        setQualitativeFeedback={setQualitativeFeedback}
      />
      <div className="flex justify-end mt-4">
        <PrimaryButton onClick={handleSubmit}>Submit Feedback</PrimaryButton>
      </div>
    </div>
  );
};

export default FeedbackItem;
