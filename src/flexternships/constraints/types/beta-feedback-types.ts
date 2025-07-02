import { MilestoneFeedbackType } from '../enums/core-enums';
import { MilestoneFeedbackStatus } from '../enums/beta-feedback-enums';

export type FeedbackProgress = {
  type: MilestoneFeedbackType;
  status: MilestoneFeedbackStatus;
};

export type MilestoneFeedbackProgress = {
  project: {
    id?: string;
    name: string;
  };
  milestone: {
    id?: string;
    name: string;
  };
  overallStatus?: MilestoneFeedbackStatus;
};
export type FeedbackElement = {
  type: string;
  name: string;
  rateType?: string;
  title: string;
  tag: {
    text: string;
    color: string;
    backgroundColor: string;
  };
  rateValues?: {
    value: number;
    text: string;
  }[];
  hasComment?: boolean;
  commentText?: string;
  commentPlaceHolder?: string;
  minRateDescription?: string;
  maxRateDescription?: string;
  isRequired: boolean;
  commentRequired?: boolean;
  placeholder?: string;
  choices?:
    | string[]
    | {
        text: string;
        value: string;
      }[];
  competency?: {
    choices?: {
      name: string;
      abbreviation: string;
      id: string;
      colorCode: string;
    }[];
  };
};

export type FeedbackSkeleton = {
  id: string;
  type: MilestoneFeedbackType;
  elements: FeedbackElement[];
};

export type MilestoneFeedbackState = {
  isFeedbackSkeletonsLoading: boolean;
  feedbackSkeletons: FeedbackSkeleton[];
};

export type MilestoneFeedbackActions = {
  populateFeedbackSkeletons: (options?: { force?: boolean }) => void;
};

export type MilestoneFeedbackStore = MilestoneFeedbackState & MilestoneFeedbackActions;

// Type for a single rating matrix cell
type RatingMatrixCell =
  | {
      row_id: string;
      column_id: string;
      value: {
        competencies: string[] | '';
        recognition: string | string[];
      };
    }
  | {
      row_id: string;
      column_id: string; // for other columns
      value: string | string[] | number;
    };

// Type for the rating matrix (array of rows, each row is an array of cells)
type RatingMatrix = RatingMatrixCell[][];

type ManagerToPeerRequest = {
  milestone_id: string;
  rating_matrix: RatingMatrix;
};

// Type for individual team feedback entry
type TeamFeedbackEntry =
  | {
      row_id: string; // metric ID
      comment: string;
      rating: number;
    }
  | {
      row_id: string;
      comment: string | string[];
    };

type ManagerToTeamRequest = {
  milestone_id: string;
  team_id: string;
  team_feedback_matrix: TeamFeedbackEntry[];
};

// Final shape of the entire object
export type FeedbackData = {
  manager_to_peer_request: ManagerToPeerRequest;
  manager_to_team_request: ManagerToTeamRequest;
};
