import { FlexternUserAppRole, RecognitionSource } from '../enums/core-enums';
import { Competency } from './competency-types';

type GiveCommentsBaseForm = {
  milestone: {
    _id: string;
    name: string;
  };
};

export type GiveRecognitionForm = GiveCommentsBaseForm & {
  selectedTalents: Array<{
    talentId: string;
    comment: string;
    competencies: string[];
  }>;
};

export type GiveNotesForm = GiveCommentsBaseForm & {
  selectedTalents: Array<{
    talentId: string;
    comment: string;
    competencies?: string[];
    noteCategory: string;
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
  noteCategory?: string;
  milestoneNumber: number;
  timestamp: number;
  selectedCompetencies: Array<Competency>;
  comment: string;
};

export type CommentsTimeline = Array<CommentsTimelineItem>;

export type QuickActionsStats = {
  teamMembers: number;
  totalRecognitions: number;
  totalNotes: number;
};
