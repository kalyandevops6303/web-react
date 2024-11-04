
import { create } from "zustand";
import { legalDocDetails, signDocument } from "../actions/legal-actions";

const defaultInitState = {
    isLegalDetailsLoading: false,
    legal: {
        details: {},
        isSignLegalDocumentLoading: false 
    }
}

export const useLegalStore = create<any>((set, get) => ({
    ...defaultInitState,
    // getProjectsList: async (projectsList: any) => projectsList(projectsList, set),
    // getProjectDetails: async (projectId: string) => getProjectDetails(projectId, set),
    getLegalDocDetails: async (projectId: string, docType: string) => legalDocDetails(projectId, docType, set),
    signDocument: async (projectId: string, docType: string) => signDocument(projectId, docType, set)
}));