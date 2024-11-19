import { create } from 'zustand';
import {
  FlexternClientAccountDetails,
  FlexternClientCompanyDetails,
  FlexternClientSocialDetails,
  FlexternClientProfileDetails,
  FlexternUserProfileForm,
  FlexternUserProfileStore,
} from '../constraints/types/user-profile-types';
import {
  nextTab,
  populateClientInfoDetails,
  populateClientOrgDetails,
  previousTab,
  updateClientCompanyInfo,
  upsertClientAccountInfo,
  setCurrentTabIndex,
  updateClientSocialInfo,
} from '../actions/user-profile-actions';

const defaultInitState: FlexternUserProfileForm = {
  currentTabIndex: 0,
  isProfileDetailsLoading: false,
  profileDetails: {} as FlexternClientProfileDetails,
};

export const useFlexternUserProfileStore = create<FlexternUserProfileStore>((set, _get) => ({
  ...defaultInitState,
  populateClientInfoDetails: () => populateClientInfoDetails(set),
  populateClientOrgDetails: () => populateClientOrgDetails(set),
  nextTab: () => nextTab(set),
  previousTab: () => previousTab(set),
  upsertClientAccountInfo: async (data: FlexternClientAccountDetails) => upsertClientAccountInfo(data, set),
  updateClientSocialInfo: async (data: FlexternClientSocialDetails) => updateClientSocialInfo(data, set),
  updateClientCompanyInfo: async (data: FlexternClientCompanyDetails) => updateClientCompanyInfo(data, set),
  resetStore: () => set({ ...defaultInitState }),
  setCurrentTabIndex: (index: number) => setCurrentTabIndex(index, set),
}));
