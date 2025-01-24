import { isEmpty } from 'lodash';
import { CompetencyState } from '../constraints/types/competency-types';
import { getCompetencies } from '../services/project-management-v2';

export const populateCompetencies = async (
  force: boolean,
  set: (state: Partial<CompetencyState> | ((state: CompetencyState) => CompetencyState)) => void,
  get: () => CompetencyState,
) => {
  const competencies = get().competencies;
  if (!isEmpty(competencies) && !force) return;

  set({ isCompetenciesLoading: true });
  const fetchedCompetencies = await getCompetencies();
  set({ competencies: fetchedCompetencies || [], isCompetenciesLoading: false });
};
