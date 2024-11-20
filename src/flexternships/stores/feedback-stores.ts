import { create } from 'zustand';
import { getFeedbackResponseInfo, getMilestoneFeedbackInfo, submitFeedbackInfo } from '../actions/feedback-actions';

const defaultInitState: any = {
    feedbackForm: null, 
    feedbackResponse: null, 
    feedbackFormSubmission: null,
    isFeedbackFormLoading: false,
    isSumitFeedbackLoading: false, 
    isFeedbackResponseLoading: false
};

export const useFeedbackStore = create<any>((set, get) => ({
    ...defaultInitState,
    getMilestoneFeedbackForm: (projectId: string, feedbackType: string) => getMilestoneFeedbackInfo(projectId, feedbackType, set),
    submitFeedbackForm: (formData: any) => submitFeedbackInfo(formData, set),
    getFeedbackResponse: (receiverId: string, milestoneId: string, feedbackType: string) => getFeedbackResponseInfo(receiverId, milestoneId, feedbackType, set),
    resetStore: () => set({ ...defaultInitState }),
  }));