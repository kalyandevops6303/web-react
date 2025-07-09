import { MilestoneFeedbackType } from '@/flexternships/constraints/enums/core-enums';
import { useState, useEffect } from 'react';
import { MatrixCell, DropdownOption, CellProps } from '@/flexternships/constraints/types/beta-feedback-form-types';
import { teamColumns } from '@/flexternships/static/content/beta-feedback-content';
import MatrixElements from './MatrixElements';
import IndividualFeedback from './IndividualFeedback';
import TeamFeedback from './TeamFeedback';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import {
  submitFeedbackDraftService,
  submitMilestoneFeedbackService,
  getFeedbackDraftService,
} from '@/flexternships/services/beta-service';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { FeedbackData, RatingMatrix, TeamFeedbackEntry } from '@/flexternships/constraints/types/beta-feedback-types';
import {
  FeedbackSkeletonItemType,
  MilestoneFeedbackInputCellType,
} from '@/flexternships/constraints/enums/beta-feedback-enums';
import { useMilestoneFeedbackStore } from '@/flexternships/stores/beta-store';
import { MilestoneFeedbackErrorType } from '@/flexternships/constraints/enums/beta-feedback-enums';
import SecondaryButton from '../../../core/buttons/SecondaryButton';
import Spinner from '../../../core/Spinner';

interface FeedbackItemProps {
  milestoneId: string;
  teamDetails: CellProps[];
  teamId: string;
  teamMembers: any[];
  setErrorType: (errorType: MilestoneFeedbackErrorType) => void;
}
type Leader = {
  id: string;
  name: string;
};

const FeedbackItem: React.FC<FeedbackItemProps> = ({ milestoneId, teamDetails, teamId, teamMembers, setErrorType }) => {
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
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [peerDraft, setPeerDraft] = useState<RatingMatrix>([]);
  const [teamDraft, setTeamDraft] = useState<TeamFeedbackEntry[]>([]);

  useEffect(() => {
    const fetchFeedbackDraft = async () => {
      try {
        const response = await getFeedbackDraftService(milestoneId);
        if (response) {
          setPeerDraft(response.manager_to_peer_matrix);
          setTeamDraft(response.manager_to_team_matrix);
        }
      } catch (error: unknown) {
        showToastMessage(ToastType.ERROR, (error as Error).message || 'Error fetching feedback draft');
      }
    };
    fetchFeedbackDraft();
  }, [milestoneId]);

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

  const deProcessIndividualFeedbackData = (data: RatingMatrix) => {
    const newRatingMatrix = [...ratingMatrix];
    data.forEach((row, rowIndex) => {
      row.forEach((item) => {
        const colIndex = headers.findIndex((header) => header.identifier === item.column_id);
        if (colIndex !== -1) {
          if (item.column_id === 'recognition') {
            // Handle recognition data structure
            const recognitionData = item.value as { recognition: string; competencies: any[] };
            if (recognitionData.recognition) {
              newRatingMatrix[rowIndex][colIndex] = {
                ...newRatingMatrix[rowIndex][colIndex],
                value: [recognitionData.recognition],
              };
            }
            if (recognitionData.competencies.length > 0 && recognitionData.competencies[0] !== null) {
              const competencyColIndex = headers.findIndex((header) => header.identifier === 'competency');
              if (competencyColIndex !== -1) {
                newRatingMatrix[rowIndex][competencyColIndex] = {
                  ...newRatingMatrix[rowIndex][competencyColIndex],
                  value: recognitionData.competencies.map((comp) => comp.id),
                };
              }
            }
          } else if (item.column_id === 'areasOfDevelopment') {
            // Handle areas of development
            newRatingMatrix[rowIndex][colIndex] = {
              ...newRatingMatrix[rowIndex][colIndex],
              value: item.value as string[],
            };
          } else {
            // Handle regular values
            const cellValue = item.value;
            newRatingMatrix[rowIndex][colIndex] = {
              ...newRatingMatrix[rowIndex][colIndex],
              value: cellValue as string | number | string[],
            };
          }
        }
      });
    });

    setRatingMatrix(newRatingMatrix);
  };

  useEffect(() => {
    if (headers.length > 0 && ratingMatrix.length === 0) {
      setRatingMatrix(initializeMatrix(teamDetails, headers));
    }
    if (peerDraft && peerDraft.length > 0 && ratingMatrix.length > 0) {
      deProcessIndividualFeedbackData(peerDraft);
    }
  }, [headers.length, peerDraft]);

  const initializeTeamMatrix = (rows: CellProps[], cols: CellProps[]) =>
    rows.map((row) =>
      cols.map((col) => ({
        value: col.inputConfig?.type === MilestoneFeedbackInputCellType.NUMBER ? 0 : '',
        rowId: row.identifier,
        colId: col.identifier,
        type: col.inputConfig?.type || MilestoneFeedbackInputCellType.STRING,
      })),
    );

  const deProcessTeamFeedbackData = (data: TeamFeedbackEntry[]) => {
    const newTeamMatrix = [...teamMatrix];

    data.forEach((item) => {
      if (item.row_id === 'qualitativeFeedback') {
        const comment = typeof item.comment === 'string' ? item.comment : '';
        setQualitativeFeedback(comment);
      } else if (item.row_id === 'top_leaders' && 'leaders' in item && Array.isArray(item.leaders)) {
        const leaders = item.leaders.map((leader: any) => ({
          value: leader._id || leader.id,
          label: `${leader.first_name} ${leader.last_name}`,
        }));
        setTopLeaders(leaders);
      } else if ('comment' in item && 'rating' in item) {
        // Handle regular team feedback matrix items
        const rowIndex = teamHeaders.findIndex((header) => header.identifier === item.row_id);
        if (rowIndex !== -1) {
          // Comment column
          newTeamMatrix[rowIndex][0] = {
            ...newTeamMatrix[rowIndex][0],
            value: typeof item.comment === 'string' ? item.comment : '',
          };
          // Rating column
          newTeamMatrix[rowIndex][1] = {
            ...newTeamMatrix[rowIndex][1],
            value: typeof item.rating === 'number' ? item.rating : 0,
          };
        }
      }
    });

    setTeamMatrix(newTeamMatrix);
  };

  useEffect(() => {
    if (teamHeaders.length > 0 && teamMatrix.length === 0) {
      setTeamMatrix(initializeTeamMatrix(teamHeaders, teamColumns));
    }
    if (teamDraft && teamDraft.length > 0 && teamMatrix.length > 0) {
      deProcessTeamFeedbackData(teamDraft);
    }
  }, [teamHeaders.length, teamDraft]);

  const { feedbackSkeletons } = useMilestoneFeedbackStore();
  const feedbackSkeleton = feedbackSkeletons.find(
    (skeleton) => skeleton.type === MilestoneFeedbackType.INDIVIDUAL_FEEDBACK,
  );
  const competencyChoices = feedbackSkeleton?.elements?.find(
    (element) => element.type === FeedbackSkeletonItemType.WOW_GROUP,
  )?.competency?.choices;

  const processFeedbackData = () => {
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
            if (cell.colId === 'areasOfDevelopment') {
              return {
                row_id: cell.rowId,
                column_id: cell.colId,
                value: Array.isArray(cell.value) ? cell.value : [cell.value].filter(Boolean),
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
    const processedData = {
      manager_to_peer_request,
      manager_to_team_request,
    };
    return processedData;
  };

  const handleSubmit = async () => {
    const processedData = processFeedbackData();
    console.log('Data to be sent:', processedData);
    try {
      setIsSubmittingFeedback(true);
      const response = await submitMilestoneFeedbackService(processedData as FeedbackData);
      showToastMessage(ToastType.SUCCESS, response?.message || 'Feedback submitted successfully');
      setErrorType(MilestoneFeedbackErrorType.FEEDBACK_ALREADY_SUBMITTED);
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, (error as Error).message || 'Error submitting feedback');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleSaveDraft = async () => {
    const processedData = processFeedbackData();
    try {
      setIsSavingDraft(true);
      const response = await submitFeedbackDraftService(processedData as FeedbackData);
      showToastMessage(ToastType.SUCCESS, response?.message || 'Feedback saved successfully');
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, (error as Error).message || 'Error saving feedback');
    } finally {
      setIsSavingDraft(false);
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
      <div className="flex justify-end mt-4 gap-4">
        <SecondaryButton onClick={handleSaveDraft} disabled={isSavingDraft || isSubmittingFeedback}>
          {isSavingDraft ? <Spinner /> : 'Save as Draft'}
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit} disabled={isSubmittingFeedback || isSavingDraft}>
          {isSubmittingFeedback ? <Spinner /> : 'Submit Feedback'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FeedbackItem;
