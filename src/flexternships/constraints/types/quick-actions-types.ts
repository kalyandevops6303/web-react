import { FlexternUserAppRole, RecognitionSource } from '../enums/core-enums';
import { Competency } from './competency-types';

export type GiveCommentsForm = {
  milestone: {
    _id: string;
    name: string;
  };
  selectedTalents: Array<{
    talentId: string;
    competencies: string[];
    comment: string;
  }>;
};

export type CommentsTimelineItem = {
  giverDetails: {
    name: string;
    profileImage: string;
    designation: string;
    appRole: FlexternUserAppRole;
  };
  type: RecognitionSource;
  milestoneNumber: number;
  timestamp: number;
  selectedCompetencies: Array<Competency>;
  comment: string;
};

export type CommentsTimeline = Array<CommentsTimelineItem>;

export type QuickActionsStats = {
  teamMembers: number;
  totalRecognitions: number;
};
