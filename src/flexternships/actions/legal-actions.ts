import { getLegalDocDetails, getLegalDocSignedStatus, signLegalDocument } from '../services/legal-services';
import { showToastMessage } from '../utils/core-utils';
import { ToastType } from '../constraints/enums/core-enums';

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

export const signDocument = async (projectId: string, docType: string, set: any) => {
  set({ isSignLegalDocumentLoading: true });
  await signLegalDocument(projectId, docType);
  set({ isSignLegalDocumentLoading: false });
  await legalDocDetails(projectId, docType, set);
  showToastMessage(ToastType.SUCCESS, `The ${docType} has been signed successfully`);
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
