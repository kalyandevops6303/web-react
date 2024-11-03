import { getLegalDocDetails } from "../services/legal-services";

export const legalDocDetails = async (projectId: string, docType: string, set: any) => {
    set({ isLegalDetailsLoading: true });
    const data:any = await getLegalDocDetails(projectId, docType);
    set((state: any) => ({
        ...state,
        legal: {
            ...state.legal,
            details: data
        }
    }));
    set({ isLegalDetailsLoading: false });
}