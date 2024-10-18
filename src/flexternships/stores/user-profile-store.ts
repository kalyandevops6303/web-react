import { create } from "zustand";
import { FlexternClientProfileDetails, FlexternUserProfileForm, FlexternUserProfileStore } from "../constraints/types/user-profile-types";
import { populateUserProfileDetails } from "../actions/user-profile-actions";

const defaultInitState: FlexternUserProfileForm = {
    isProfileDetailsLoading: false,
    profileDetails: {} as FlexternClientProfileDetails,
}

export const useFlexternUserStore = create<FlexternUserProfileStore>((set, get) => ({
    ...defaultInitState,
    populateProfileDetails: () => populateUserProfileDetails(get, set)
}));
