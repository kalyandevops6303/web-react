import { create } from 'zustand';
import { CompetencyState, CompetencyStore } from '../constraints/types/competency-types';
import { populateCompetencies } from '../actions/competency-actions';

const defaultInitState: CompetencyState = {
  competencies: [],
  isCompetenciesLoading: false,
};

export const useCompetenciesStore = create<CompetencyStore>((set, get) => ({
  ...defaultInitState,
  populateCompetencies: (force: boolean = false) => populateCompetencies(force, set, get),
  resetStore: () => set({ ...defaultInitState }),
}));
