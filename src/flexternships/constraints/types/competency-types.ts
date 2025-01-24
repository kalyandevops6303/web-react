export type Competency = {
  id: string;
  name: string;
  abbreviation: string;
  colorCode: string; // hex code
  createdAt: number;
  updatedAt: number;
};

export type CompetencyState = {
  competencies: Competency[];
  isCompetenciesLoading: boolean;
};

export type CompetencyActions = {
  populateCompetencies: (force?: boolean) => Promise<void>;
  resetStore: () => void;
};

export type CompetencyStore = CompetencyState & CompetencyActions;
