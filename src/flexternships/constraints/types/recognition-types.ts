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
