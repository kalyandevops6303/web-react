import { create } from 'zustand';
import { getMilestoneFeedbackInfo, submitFeedbackInfo } from '../actions/feedback-actions';

const defaultInitState: any = {
  feedbackForm: null,
  isFeedbackFormLoading: false,
  isSumitFeedbackLoading: false,
  feedbackFormSubmission: null,
};

export const useFeedbackStore = create<any>((set) => ({
  ...defaultInitState,
  getMilestoneFeedbackForm: (projectId: string, feedbackType: string) =>
    getMilestoneFeedbackInfo(projectId, feedbackType, set),
  submitFeedbackForm: (formData: any) => submitFeedbackInfo(formData, set),
  resetStore: () => set({ ...defaultInitState }),
}));
