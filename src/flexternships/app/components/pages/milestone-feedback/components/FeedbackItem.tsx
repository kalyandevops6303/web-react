import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { useState, useEffect } from 'react';
import { MatrixCell, DropdownOption, CellProps } from '@/flexternships/constraints/types/form-types';
import { teamColumns } from '@/flexternships/mocks/meeting-feedback';
import MatrixElements from './MatrixElements';
import IndividualFeedback from './IndividualFeedback';
import TeamFeedback from './TeamFeedback';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import { submitMilestoneFeedbackService } from '@/flexternships/services/feedback-service';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
interface FeedbackItemProps {
  milestoneId: string;
  teamDetails: CellProps[];
  teamId: string;
}
type Leader = {
  id: string;
  name: string;
};

const FeedbackItem: React.FC<FeedbackItemProps> = ({ milestoneId, teamDetails, teamId }) => {
  const [ratingMatrix, setRatingMatrix] = useState<MatrixCell[][]>([]);
  const [teamMatrix, setTeamMatrix] = useState<MatrixCell[][]>([]);
  const [topLeaders, setTopLeaders] = useState<DropdownOption[]>([]);
  const [qualitativeFeedback, setQualitativeFeedback] = useState('');
  const { headers } = MatrixElements({
    feedbackType: MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  });
  const teamHeaders = MatrixElements({
    feedbackType: MilestoneFeedbackType.TEAM_FEEDBACK,
  }).headers;

  const initializeMatrix = (memberList: CellProps[], headers: CellProps[]): MatrixCell[][] => {
    return memberList.map((row) =>
      headers.map((col) => ({
        value: '',
        rowId: row.identifier,
        colId: col.identifier,
      })),
    );
  };

  useEffect(() => {
    if (headers.length > 0 && ratingMatrix.length === 0) {
      setRatingMatrix(initializeMatrix(teamDetails, headers));
    }
  }, [headers.length]);

  const initializeTeamMatrix = (rows: CellProps[], cols: CellProps[]) =>
    rows.map((row) =>
      cols.map((col) => ({
        value: '',
        rowId: row.identifier,
        colId: col.identifier,
      })),
    );

  useEffect(() => {
    if (teamHeaders.length > 0 && teamMatrix.length === 0) {
      setTeamMatrix(initializeTeamMatrix(teamHeaders, teamColumns));
    }
  }, [teamHeaders.length]);

  const handleSubmit = async () => {
    const manager_to_peer_request = {
      milestone_id: milestoneId,
      rating_matrix: ratingMatrix.map((row) => {
        let competencies: string[] = [];
        return row
          .map((cell) => {
            if (cell.colId === 'competency') {
              competencies = cell.value as string[];
              return;
            }
            if (cell.colId === 'recognition') {
              return {
                row_id: cell.rowId,
                column_id: cell.colId,
                value: { competencies, recognition: cell.value },
              };
            }
            return {
              row_id: cell.rowId,
              column_id: cell.colId,
              value: cell.value,
            };
          })
          .filter(Boolean);
      }),
    };

    let teamFeedback: { row_id: string; comment?: string; rating?: string; leaders?: Leader[] }[] = teamMatrix.map(
      (row) => {
        const row_id = row[0].rowId;
        const comment = String(row[0].value);
        const rating = String(row[1].value);
        return {
          row_id,
          comment,
          rating,
        };
      },
    );
    teamFeedback.push({
      row_id: 'comment',
      comment: qualitativeFeedback,
    });
    teamFeedback.push({
      row_id: 'top_leaders',
      leaders: topLeaders.map((leader) => ({
        id: leader.value,
        name: leader.label,
      })),
    });
    const manager_to_team_request = {
      milestone_id: milestoneId,
      team_id: teamId,
      team_feedback_matrix: teamFeedback,
    };
    const data = {
      manager_to_peer_request,
      manager_to_team_request,
    };
    console.log('Data to be sent:', data);
    try {
      const response = await submitMilestoneFeedbackService(data);
      showToastMessage(ToastType.SUCCESS, response?.message || 'Feedback submitted successfully');
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, (error as Error).message || 'Error submitting feedback');
    }
  };

  return (
    <div>
      <IndividualFeedback ratingMatrix={ratingMatrix} setRatingMatrix={setRatingMatrix} memberList={teamDetails} />
      <TeamFeedback
        teamMatrix={teamMatrix}
        setTeamMatrix={setTeamMatrix}
        topLeaders={topLeaders}
        setTopLeaders={setTopLeaders}
        teamDetails={teamDetails}
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
