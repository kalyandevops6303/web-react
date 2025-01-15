import { RecognitionSource } from '../enums/core-enums';
import { Competency } from './competency-types';

export type GiveRecognitionForm = {
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

export type RecognitionTimelineItem = {
  clientInfo: {
    name: string;
    profileImage: string;
    designation: string;
    company: string;
  };
  type: RecognitionSource;
  milestoneNumber: number;
  timestamp: number;
  selectedCompetencies: Array<Competency>;
  comment: string;
};

export type RecognitionTimeline = Array<RecognitionTimelineItem>;

export type RecognitionStats = {
  teamMembers: number;
  totalRecognitions: number;
};
