import { create } from "zustand";
import { FlexternClientDetails, FlexternTalentDetails, FlexternUser, FlexternUserStore } from "@flexternships/types/flextern-user-types";
import { populateUserDetails } from "@flexternships/actions/flextern-user-actions";

const defaultInitState: FlexternUser = {
    isUserDetailsLoading: false,
    isProfileDetailsLoading: false,
    userDetails: {} as FlexternClientDetails | FlexternTalentDetails,
    profileDetails: {} as FlexternClientDetails | FlexternTalentDetails
}

export const useFlexternUserStore = create<FlexternUserStore>((set, get) => ({
    ...defaultInitState,
    populateUserDetails: () => populateUserDetails(get, set)
}));
