import { getLegalDocDetails, signLegalDocument } from "../services/legal-services";
import { showToastMessage } from "../utils/core-utils";
import { ToastType } from "../constraints/enums/core-enums";

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

export const signDocument = async (projectId: string, docType: string, set: any) => {
    set({ signLegalDocumentLoading: true });
    const data:any = await signLegalDocument(projectId, docType);
    set({ signLegalDocumentLoading: false });
    showToastMessage(ToastType.SUCCESS, "The NDA has been signed successfully")
}