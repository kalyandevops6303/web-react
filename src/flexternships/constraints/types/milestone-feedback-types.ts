import { MilestoneFeedbackType } from '../enums/core-enums';

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
      abbreviation?: string;
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
