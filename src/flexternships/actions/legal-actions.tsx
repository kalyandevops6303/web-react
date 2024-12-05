import { getLegalDocDetails, getLegalDocSignedStatus, signLegalDocument } from '../services/legal-services';

export const legalDocDetails = async (projectId: string, docType: string, set: any) => {
  set({ isLegalDetailsLoading: true });
  const data: any = await getLegalDocDetails(projectId, docType);
  set((state: any) => ({
    ...state,
    legal: {
      ...state.legal,
      details: data,
    },
  }));
  set({ isLegalDetailsLoading: false });
};

export const signDocument = async (projectId: string, docType: string, onSucess: () => void, set: any) => {
  set({ isSignLegalDocumentLoading: true });
  await signLegalDocument(projectId, docType);
  set({ isSignLegalDocumentLoading: false });
  await legalDocDetails(projectId, docType, set);
  onSucess && onSucess();
};

export const legalDocSignedStatus = async (projectId: string, docType: string, set: any) => {
  set({ isLegalDetailsLoading: true });
  const data: any = await getLegalDocSignedStatus(projectId, docType);
  set((state: any) => ({
    ...state,
    legal: {
      ...state.legal,
      signedStatus: {
        ...state.legal?.signedStatus,
        [docType]: data,
      },
    },
  }));
  set({ isLegalDetailsLoading: false });
};
