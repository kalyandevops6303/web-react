import { fetchRoles, fetchSkills, fetchStaticData, fetchTools } from "@flexternships/actions/static-data-actions";
import { StaticDataState, StaticDataStore } from "@flexternships/types/static-data-types";
import { create } from "zustand";

const defaultInitState: StaticDataState = {
    isStaticDataLoading: false,
    skills: [],
    roles: [],
    tools: [],
}
export const useStaticDataStore = create<StaticDataStore>((set, get) => ({
    ...defaultInitState,
    fetchStaticData: async () => fetchStaticData(set),
    fetchSkills: async () => fetchSkills(set),
    fetchTools: async () => fetchTools(set),
    fetchRoles: async () => fetchRoles(set),
}));