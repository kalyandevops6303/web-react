import { StaticDataState } from "@flexternships/types/static-data-types";
import { fetchAllRoles, fetchAllSkills, fetchAllTools } from "@flexternships/services/static-data-services";

export const fetchStaticData = async (set: any) => {
    set((state: StaticDataState) => ({ ...state, isStaticDataLoading: true }));
    const roles = await fetchAllRoles();
    const skills = await fetchAllSkills();
    const tools = await fetchAllTools();
    set((state: StaticDataState) => ({ ...state, roles, skills, tools, isStaticDataLoading: false }))
}

// export const fetchSkills = async (set: any) => { }
// export const fetchTools = async (set: any) => { }
// export const fetchRoles = async (ste: any) => { }