import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { useState, useEffect } from 'react';
import { MatrixCell, DropdownOption, CellProps } from '@/flexternships/constraints/types/beta-feedback-form-types';
import { teamColumns } from '@/flexternships/static/content/beta-feedback-content';
import MatrixElements from './MatrixElements';
import IndividualFeedback from './IndividualFeedback';
import TeamFeedback from './TeamFeedback';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import { submitMilestoneFeedbackService } from '@/flexternships/services/beta-service';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { FeedbackData } from '@/flexternships/constraints/types/beta-feedback-types';
import {
  FeedbackSkeletonItemType,
  MilestoneFeedbackInputCellType,
} from '@/flexternships/constraints/enums/beta-feedback-enums';
import { useMilestoneFeedbackStore } from '@/flexternships/stores/beta-store';

interface FeedbackItemProps {
  milestoneId: string;
  teamDetails: CellProps[];
  teamId: string;
  teamMembers: any[];
}
type Leader = {
  id: string;
  name: string;
};

const FeedbackItem: React.FC<FeedbackItemProps> = ({ milestoneId, teamDetails, teamId, teamMembers }) => {
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
        value: col.inputConfig?.type === MilestoneFeedbackInputCellType.NUMBER ? 0 : '',
        rowId: row.identifier,
        colId: col.identifier,
        type: col.inputConfig?.type || MilestoneFeedbackInputCellType.STRING,
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
        value: col.inputConfig?.type === MilestoneFeedbackInputCellType.NUMBER ? 0 : '',
        rowId: row.identifier,
        colId: col.identifier,
        type: col.inputConfig?.type || MilestoneFeedbackInputCellType.STRING,
      })),
    );

  useEffect(() => {
    if (teamHeaders.length > 0 && teamMatrix.length === 0) {
      setTeamMatrix(initializeTeamMatrix(teamHeaders, teamColumns));
    }
  }, [teamHeaders.length]);

  const { feedbackSkeletons } = useMilestoneFeedbackStore();
  const feedbackSkeleton = feedbackSkeletons.find(
    (skeleton) => skeleton.type === MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  );
  const competencyChoices = feedbackSkeleton?.elements?.find(
    (element) => element.type === FeedbackSkeletonItemType.WOW_GROUP,
  )?.competency?.choices;

  const handleSubmit = async () => {
    const manager_to_peer_request = {
      milestone_id: milestoneId,
      rating_matrix: ratingMatrix.map((row) => {
        return row
          .map((cell) => {
            if (cell.colId === 'competency') {
              return;
            }
            if (cell.colId === 'recognition') {
              const competencies = row.find((c) => c.colId === 'competency')?.value;
              const competencyList = Array.isArray(competencies)
                ? competencies.map((competency) => {
                    return competencyChoices?.find((c) => c.id === competency);
                  })
                : [competencyChoices?.find((c) => c.id === competencies)];

              return {
                row_id: cell.rowId,
                column_id: cell.colId,
                value: {
                  recognition: Array.isArray(cell.value) ? (cell.value[0] as string) : (cell.value as string),
                  competencies: competencyList,
                },
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

    let teamFeedback: { row_id: string; comment?: string; rating?: number; leaders?: Leader[] }[] = teamMatrix.map(
      (row) => {
        const row_id = row[0].rowId;
        const comment = String(row[0].value);
        const rating = Number(row[1].value);
        return {
          row_id,
          comment,
          rating,
        };
      },
    );
    teamFeedback.push({
      row_id: 'qualitativeFeedback',
      comment: qualitativeFeedback,
    });
    teamFeedback.push({
      row_id: 'top_leaders',
      leaders: topLeaders.map((leader) => teamMembers.find((member) => member._id === leader.value)),
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
      const response = await submitMilestoneFeedbackService(data as FeedbackData);
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
