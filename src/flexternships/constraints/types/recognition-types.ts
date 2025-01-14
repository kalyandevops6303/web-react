import { Competency } from '../enums/miscellaneous-enums';

import { RecognitionSource } from '../enums/core-enums';

export type GiveRecognitionForm = {
  milestone: {
    _id: string;
    name: string;
  };
  selectedTalents: Array<{
    talentId: string;
    competencies: string[];
    message: string;
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
  selectedCompetencies: Array<{
    id: string;
    name: Competency;
  }>;
  comment: string;
};

export type RecognitionTimeline = Array<RecognitionTimelineItem>;

export type RecognitionStats = {
  teamMembers: number;
  totalRecognitions: number;
};
