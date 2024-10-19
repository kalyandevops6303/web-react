import { create } from "zustand";
import { FlexternClientAccountDetails, FlexternClientCompanyDetails, FlexternClientCompanySocialDetails, FlexternClientProfileDetails, FlexternUserProfileForm, FlexternUserProfileStore } from "../constraints/types/user-profile-types";
import { nextTab, populateClientInfoDetails, populateClientOrgDetails, previousTab, updateClientCompanyInfo, upsertClientAccountInfo } from "../actions/user-profile-actions";

const defaultInitState: FlexternUserProfileForm = {
    currentTabIndex: 0,
    isProfileDetailsLoading: false,
    profileDetails: {} as FlexternClientProfileDetails,
}

export const useFlexternUserProfileStore = create<FlexternUserProfileStore>((set, get) => ({
    ...defaultInitState,
    populateClientInfoDetails: () => populateClientInfoDetails(set),
    populateClientOrgDetails: () => populateClientOrgDetails(set),
    nextTab: () => nextTab(set),
    previousTab: () => previousTab(set),
    upsertClientAccountInfo: async (data: FlexternClientAccountDetails) => upsertClientAccountInfo(data, set),
    updateClientCompanyInfo: async (data: FlexternClientCompanyDetails | FlexternClientCompanySocialDetails) => updateClientCompanyInfo(data, set),
}));
