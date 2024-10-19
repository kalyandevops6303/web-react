import { create } from "zustand";
import { FlexternClientDetails, FlexternTalentDetails, FlexternUser, FlexternUserStore } from "@flexternships/types/core-types";
import { populateUserDetails } from "@flexternships/actions/core-actions";

const defaultInitState: FlexternUser = {
    isUserDetailsLoading: false,
    userDetails: {} as FlexternClientDetails | FlexternTalentDetails,
}

export const useFlexternUserStore = create<FlexternUserStore>((set, get) => ({
    ...defaultInitState,
    populateUserDetails: (force: boolean = false) => populateUserDetails(force, get, set)
}));
