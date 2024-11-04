
import { create } from "zustand";
import { legalDocDetails } from "../actions/legal-actions";

const defaultInitState = {
    isLegalDetailsLoading: false,
    // projectsList: [] as ProjectDetails[],
    // projectDetails: {} as ProjectDetails,
    legal: {
        details: {}
    }
}

export const useLegalStore = create<any>((set, get) => ({
    ...defaultInitState,
    // getProjectsList: async (projectsList: any) => projectsList(projectsList, set),
    // getProjectDetails: async (projectId: string) => getProjectDetails(projectId, set),
    getLegalDocDetails: async (projectId: string, docType: string) => legalDocDetails(projectId, docType, set)
}));