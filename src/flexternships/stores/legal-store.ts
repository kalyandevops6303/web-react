
import { create } from "zustand";
import { legalDocDetails, signDocument } from "../actions/legal-actions";

const defaultInitState = {
    isSignLegalDocumentLoading: false,
    isLegalDetailsLoading: false,
    legal: {
        details: {},
    }
}

export const useLegalStore = create<any>((set, get) => ({
    ...defaultInitState,
    getLegalDocDetails: async (projectId: string, docType: string) => legalDocDetails(projectId, docType, set),
    signDocument: async (projectId: string, docType: string) => signDocument(projectId, docType, set)
}));