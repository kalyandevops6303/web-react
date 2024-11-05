import { getLegalDocDetails, signLegalDocument } from "../services/legal-services";
import { showToastMessage } from "../utils/core-utils";
import { ToastType } from "../constraints/enums/core-enums";

export const legalDocDetails = async (projectId: string, docType: string, set: any) => {
    set({ isLegalDetailsLoading: true });
    const data: any = await getLegalDocDetails(projectId, docType);
    set((state: any) => ({
        ...state,
        legal: {
            ...state.legal,
            details: data
        }
    }));
    set({ isLegalDetailsLoading: false });
}

export const signDocument = async (projectId: string, docType: string, set: any) => {
    set({ isSignLegalDocumentLoading: true });
    await signLegalDocument(projectId, docType);
    set({ isSignLegalDocumentLoading: false });
    await legalDocDetails(projectId, docType, set);
    showToastMessage(ToastType.SUCCESS, `The ${docType} has been signed successfully`)
}