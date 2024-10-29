import { create } from 'zustand';
import {
  FlexternProjectDetails,
  FlexternProjectDetailStore,
  TeamMemberDetails,
} from '../constraints/types/project-details-types';
import { populateTeamDetails } from '../actions/project-details-actions';

const defaultInitState: FlexternProjectDetails = {
  teamDetails: [] as Array<TeamMemberDetails>,
};

export const useFlexternProjectDetailsStore = create<FlexternProjectDetailStore>((set, _get) => ({
  ...defaultInitState,
  populateTeamDetails: (projectId: string='') => populateTeamDetails(set, projectId),
  resetStore: () => set({ ...defaultInitState }),
}));
