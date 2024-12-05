import { create } from 'zustand';
import { legalDocDetails, signDocument, legalDocSignedStatus } from '../actions/legal-actions';

const defaultInitState = {
  isSignLegalDocumentLoading: false,
  isLegalDetailsLoading: false,
  legal: {
    details: {},
    signedStatus: null,
  },
};

export const useLegalStore = create<any>((set) => ({
  ...defaultInitState,
  getLegalDocDetails: async (projectId: string, docType: string) => legalDocDetails(projectId, docType, set),
  signDocument: async (projectId: string, docType: string, onSuccess: () => void) =>
    signDocument(projectId, docType, onSuccess, set),
  getLegalDocStatus: async (projectId: string, docType: string) => legalDocSignedStatus(projectId, docType, set),
}));
